using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;
using Raidexi.Domain.Interfaces;
using Raidexi.Presentation.Services.CacheServices;
using System.Drawing;
using System.Reflection;

namespace Raidexi.Presentation.Services
{
    public class AnalyisService : IAnalysisDataService
    {
        private readonly CacheAnalysisDataService cache;

        public AnalyisService(CacheAnalysisDataService cacheAnalysisDataService)
        {
            cache = cacheAnalysisDataService;
        }

        private MeasureData AdjustByGenderSlight(MeasureData raw, string gender)
        {
            return gender.ToLower() switch
            {
                "male" => new MeasureData
                {
                    Chest = (int)(raw.Chest * 1.02),
                    ShoulderWidth = (int)(raw.ShoulderWidth * 1.03),
                    Waist = (int)(raw.Waist * 1.01),
                    Hip = raw.Hip,
                    Height = raw.Height
                },
                "female" => new MeasureData
                {
                    Chest = (int)(raw.Chest * 0.99),
                    ShoulderWidth = (int)(raw.ShoulderWidth * 0.97),
                    Waist = (int)(raw.Waist * 0.97),
                    Hip = (int)(raw.Hip * 1.02),
                    Height = raw.Height
                },
                _ => raw
            };
        }

        private double CalculateRangeFit(int user, int min, int max)
        {
            var range = max - min;
            if (range <= 0) return user == min ? 100 : 0;

            if (user >= min && user <= max)
            {
                var center = (min + max) / 2.0;
                var distanceFromCenter = Math.Abs(user - center);
                var radius = range / 2.0;
                return 100 * (1 - (distanceFromCenter / radius) * 0.2); 
            }

            double distanceOutside;
            if (user < min)
                distanceOutside = min - user;
            else
                distanceOutside = user - max;
            var tolerance = range * 0.15;

            if (distanceOutside <= tolerance)
            {

                var penaltyRatio = distanceOutside / tolerance;
                return 80 * (1 - penaltyRatio * 0.5);
            }

            if (distanceOutside <= range)
            {
                return 40 * (1 - (distanceOutside - tolerance) / range);
            }

            return 0;
        }

        private Dictionary<string, double> GetWeightByCategory(string category)
        {
            return category.ToLower() switch
            {
                "top" => new()
                {
                    ["Chest"] = 0.45,
                    ["ShoulderWidth"] = 0.30,
                    ["Waist"] = 0.15,
                    ["Height"] = 0.10
                },
                "bottom" => new()
                {
                    ["Waist"] = 0.45,
                    ["Hip"] = 0.40,
                    ["Height"] = 0.15
                },
                "dress" => new()
                {
                    ["Chest"] = 0.25,
                    ["Waist"] = 0.25,
                    ["Hip"] = 0.30,
                    ["ShoulderWidth"] = 0.10,
                    ["Height"] = 0.10
                },
                _ => new()
                {
                    ["Chest"] = 0.35,
                    ["Waist"] = 0.30,
                    ["Hip"] = 0.25,
                    ["Height"] = 0.10
                }
            };
        }

        public async Task<SizeResult> GetSizeFromMeasure(
            MeasureData measureData,
            string category,
            string gender)
        {
            var categories = await cache.CategoryRuleAsync();
            var sizes = await cache.GetUniversalSizeAsync();

            var rule = categories.FirstOrDefault(c =>
                c.Category.Equals(category, StringComparison.OrdinalIgnoreCase));

            if (rule == null)
                return new SizeResult
                {
                    SizeCode = "Size Not Found",
                    FitPercent = 0
                };

            var weight = GetWeightByCategory(category);

            var fieldMap = typeof(MeasureData)
                .GetProperties()
                .Where(p => p.PropertyType == typeof(int))
                .Select(p => new
                {
                    Name = p.Name,
                    Value = (int)p.GetValue(measureData)!
                })
                .Where(x => x.Value > 0)
                .ToDictionary(x => x.Name, x => x.Value);

            var results = new List<SizeResult>();
            var filteredSizes = sizes.Where(s => s.Gender == gender).ToList();



            foreach (var size in filteredSizes)
            {
                double totalFit = 0;
                double totalWeight = 0;
                int matchedFields = 0;

                Console.WriteLine($"\n📏 Checking size: {size.Code}");

                foreach (var field in rule.Fields)
                {
                    if (!fieldMap.TryGetValue(field, out var userValue))
                    {
                        Console.WriteLine($"  ⚠️ Field '{field}' not in user data");
                        continue;
                    }

                    if (!weight.TryGetValue(field, out var w))
                    {
                        Console.WriteLine($"  ⚠️ Field '{field}' not in weight config");
                        continue;
                    }

                    var rangeProp = size.GetType().GetProperty(field);
                    var range = rangeProp?.GetValue(size);

                    if (range == null)
                    {
                        Console.WriteLine($"  ⚠️ Field '{field}' not in size data");
                        continue;
                    }

                    var minProp = range.GetType().GetProperty("Min");
                    var maxProp = range.GetType().GetProperty("Max");

                    if (minProp == null || maxProp == null)
                        continue;

                    var min = (int)minProp.GetValue(range)!;
                    var max = (int)maxProp.GetValue(range)!;

                    var fit = CalculateRangeFit(userValue, min, max);

                    totalFit += fit * w;
                    totalWeight += w;
                    matchedFields++;

                    Console.WriteLine($"  ✓ {field}: user={userValue}, range=[{min}-{max}], fit={fit:F1}%, weight={w:F2}");
                }

                var finalFit = totalWeight > 0 ? totalFit / totalWeight : 0;

                if (matchedFields < rule.Fields.Count)
                {
                    var completeness = (double)matchedFields / rule.Fields.Count;
                    finalFit *= completeness;
                }

                results.Add(new SizeResult
                {
                    SizeCode = size.Code ?? "Unknown",
                    FitPercent = (int)Math.Round(finalFit) 
                });
            }

            if (!results.Any())
            {
                return new SizeResult
                {
                    SizeCode = "No Match",
                    FitPercent = 0
                };
            }

            var bestResult = results.OrderByDescending(x => x.FitPercent).First();
            Console.WriteLine($"\n🎯 Best match: {bestResult.SizeCode} with {bestResult.FitPercent}% fit\n");

            return bestResult;
        }

        public async Task<ResultAnalysis> AISuggestSize(
            uploadDataToAnalysisMeasure uploadDataToAnalysisMeasure)
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

  

            dataMeasureAdjusted = AdjustByGenderSlight(
                dataMeasureAdjusted,
                uploadDataToAnalysisMeasure.userCustom.gender
            );

            var dataSize = await GetSizeFromMeasure(
                dataMeasureAdjusted,
                uploadDataToAnalysisMeasure.userCustom.typeProduct,
                uploadDataToAnalysisMeasure.userCustom.gender
            );

            var dataSizeMap = await cache.SizeMappingAsync();
            var sizeMap = dataSizeMap.FirstOrDefault(a => a.Universal == dataSize.SizeCode);

            string fitSuggest = dataSize.FitPercent switch
            {
                >= 90 => "Rất vừa vặn",
                >= 80 => "Vừa vặn",
                >= 70 => "Tạm ổn",
                >= 60 => "Hơi lệch",
                >= 50 => "Không khuyến nghị",
                _ => "Không phù hợp"
            };

            var outputSize = sizeMap?.GetType()
                .GetProperty(uploadDataToAnalysisMeasure.userCustom.sizeOutput.ToUpper())?
                .GetValue(sizeMap)?.ToString();

            var result = new ResultAnalysis
            {
                analysisCode = Guid.NewGuid().ToString(),
                analysisDate = DateTime.UtcNow,
                typeCustom = uploadDataToAnalysisMeasure.userCustom,
                fitSuggest = fitSuggest,
                sizeSuggest = outputSize ?? dataSize.SizeCode,
                reliableRate = dataSize.FitPercent
            };

            Console.WriteLine($"\n✅ Final result: Size={result.sizeSuggest}, " +
                $"Fit={result.reliableRate}% ({result.fitSuggest})\n");

            return result;
        }
    }
}