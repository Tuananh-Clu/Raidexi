using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;
using Raidexi.Domain.Interfaces;
using Raidexi.Presentation.Services.CacheServices;
using System.Drawing;
using System.Reflection;

namespace Raidexi.Presentation.Services
{
    public class AnalyisService:IAnalysisDataService
    {
        private readonly CacheAnalysisDataService cache;
        public AnalyisService(CacheAnalysisDataService cacheAnalysisDataService)
        {
            cache = cacheAnalysisDataService;
        }
        private double CalculateRangeFit(int user, int min, int max)
        {
            var center = (min + max) / 2.0;
            var radius = (max - min) / 2.0;

            if (radius <= 0)
                return 0;

            var distance = Math.Abs(user - center);
            var fit = 100 - (distance / radius) * 100;

            return Math.Max(0, fit);
        }
        private Dictionary<string, double> GetWeightByCategory(string category)
        {
            return category.ToLower() switch
            {
                "top" => new()
                {
                    ["Chest"] = 0.5,
                    ["ShoulderWidth"] = 0.3,
                    ["Waist"] = 0.15,
                    ["Height"] = 0.05
                },
                "bottom" => new()
                {
                    ["Waist"] = 0.5,
                    ["Hip"] = 0.35,
                    ["Height"] = 0.15
                },
                "dress" => new()
                {
                    ["Chest"] = 0.25,
                    ["Waist"] = 0.3,
                    ["Hip"] = 0.3,
                    ["Height"] = 0.15
                },
                _ => new()
                {
                    ["Chest"] = 0.4,
                    ["Waist"] = 0.35,
                    ["Hip"] = 0.25
                }
            };
        }

        public async Task<SizeResult> GetSizeFromMeasure(
        MeasureData measureData,
        string category)
        {
            var categories = await cache.CategoryRuleAsync();
            var sizes = await cache.GetUniversalSizeAsync();

            var rule = categories.FirstOrDefault(c =>
                c.Category.Equals(category, StringComparison.OrdinalIgnoreCase));

            if (rule == null)
                return new SizeResult { SizeCode = "Size Not Found", FitPercent = 0 };

            var weight = GetWeightByCategory(category);

            var fieldMap = typeof(MeasureData)
                .GetProperties()
                .Where(p => p.GetValue(measureData) != null)
                .ToDictionary(
                    p => p.Name,
                    p => (int)p.GetValue(measureData)!
                );

            var results = new List<SizeResult>();

            foreach (var size in sizes)
            {
                double totalFit = 0;

                foreach (var field in rule.Fields)
                {
                    if (!fieldMap.TryGetValue(field, out var userValue))
                        continue;

                    var rangeProp = size.GetType().GetProperty(field);
                    var range = rangeProp?.GetValue(size);
                    if (range == null)
                        continue;

                    var min = (int)range.GetType().GetProperty("Min")!.GetValue(range)!;
                    var max = (int)range.GetType().GetProperty("Max")!.GetValue(range)!;

                    var fit = CalculateRangeFit(userValue, min, max);

                    var w = weight.ContainsKey(field) ? weight[field] : 0.1;
                    totalFit += fit * w;
                }

                results.Add(new SizeResult
                {
                    SizeCode = size.Code ?? "Unknown",
                    FitPercent = (int)Math.Round(totalFit, 2)
                });
            }

            return results
                .OrderByDescending(x => x.FitPercent)
                .First();
        }

        public async Task<ResultAnalysis> AISuggestSize(uploadDataToAnalysisMeasure uploadDataToAnalysisMeasure)
        {
            var brandRules = await cache.BrandRuleAsync();
            var brandRule = brandRules.FirstOrDefault(b =>
                b.Brand.Equals(uploadDataToAnalysisMeasure.brand, StringComparison.OrdinalIgnoreCase));
            if (brandRule == null)
                throw new Exception("Brand rule not found");
            var measureData = uploadDataToAnalysisMeasure.dataMeasure;
            var dataMeasureAdjusted = new MeasureData
            {
                Chest = measureData.Chest + brandRule.Chest,
                Waist = measureData.Waist + brandRule.Waist,
                Hip = measureData.Hip + brandRule.Hip,
                ShoulderWidth = measureData.ShoulderWidth ,
                Height = measureData.Height 
            };
            var dataSize = await GetSizeFromMeasure(dataMeasureAdjusted, uploadDataToAnalysisMeasure.userCustom.typeProduct);
            var result = new ResultAnalysis
            {
                analysisCode = Guid.NewGuid().ToString(),
                analysisDate = DateTime.UtcNow,
                typeCustom = uploadDataToAnalysisMeasure.userCustom,
                fitSuggest = dataSize.FitPercent >= 95 ? "Rất vừa"
           : dataSize.FitPercent >= 90 ? "Vừa"
           : dataSize.FitPercent >= 80 ? "Hơi lệch"
           : "Không khuyến nghị",
                sizeSuggest = dataSize.SizeCode,
                reliableRate = dataSize.FitPercent
            };
            return result;

        }
    }


}
