using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;
using Raidexi.Application.Interfaces;
using Raidexi.Presentation.Services.CacheServices;
using System.Text.RegularExpressions;
using Raidexi.Models;
using Microsoft.AspNetCore.Http;

namespace Raidexi.Infrastructure.Services
{
    public class AnalyisService : IAnalysisDataService
    {
        private readonly CacheAnalysisDataService cache;
        private readonly GeminiService geminiServices;

        public AnalyisService(CacheAnalysisDataService cacheAnalysisDataService, GeminiService geminiService)
        {
            cache = cacheAnalysisDataService;
            geminiServices = geminiService;
        }


        private double CalculateRangeFit(float user, int min, int max)
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



        public async Task<SizeResult> GetSizeFromMeasure(
            MeasureData measureData,
            MappingSize.BrandSizeChart brandChart,
            string category,
            string gender,
            string sizeOutputRegion)
        {
            var group = brandChart.charts?.FirstOrDefault(c => 
                string.Equals(c.gender, gender, StringComparison.OrdinalIgnoreCase) &&
                string.Equals(c.productType, category, StringComparison.OrdinalIgnoreCase));

            if (group == null || group.items == null || !group.items.Any())
                return new SizeResult { SizeCode = "No Chart Available", FitPercent = 0 };

            var fieldMap = typeof(MeasureData)
                .GetProperties()
                .Where(p => p.PropertyType == typeof(float))
                .Select(p => new
                {
                    Name  = p.Name,
                    Value = (float)p.GetValue(measureData)!
                })
                .Where(x => x.Value > 0)
                .ToDictionary(x => x.Name, x => (int)Math.Round(x.Value));

            var results = new List<SizeResult>();
            var properties = typeof(MappingSize.SizeChartItem).GetProperties()
                .Where(p => p.PropertyType == typeof(MappingSize.ValueSize))
                .ToList();

            foreach (var sizeItem in group.items)
            {
                double totalFit = 0;
                int matchedFields = 0;

                string label = sizeItem.labels != null && sizeItem.labels.ContainsKey(sizeOutputRegion.ToUpper()) 
                    ? sizeItem.labels[sizeOutputRegion.ToUpper()] 
                    : (sizeItem.labels != null && sizeItem.labels.Any() ? sizeItem.labels.First().Value : "Unknown");


                foreach (var prop in properties)
                {
                    var range = prop.GetValue(sizeItem) as MappingSize.ValueSize;
                    if (range == null) continue;

                    string field = prop.Name;
                    if (!fieldMap.TryGetValue(field, out var userValue))
                    {
                        Console.WriteLine($"  ⚠️ Field '{field}' not in user data");
                        continue;
                    }

                    var fit = CalculateRangeFit(userValue, range.Min, range.Max);
                    totalFit += fit;
                    matchedFields++;
                }

                if (matchedFields == 0) continue;

                var finalFit = totalFit / matchedFields;

                results.Add(new SizeResult
                {
                    SizeCode = label,
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

            return bestResult;
        }

        public async Task<ResultAnalysis> AISuggestSize(
            uploadDataToAnalysisMeasure uploadDataToAnalysisMeasure)
        {
            var apiKey = Environment.GetEnvironmentVariable("GEMINI_API_KEY");
            if (string.IsNullOrEmpty(apiKey))
                throw new InvalidOperationException("Missing GEMINI_API_KEY environment variable");

            var brandProfiles = await cache.GetAllBrandProfilesAsync();
            var brandProfile = brandProfiles.FirstOrDefault(b =>
                b.name.Equals(uploadDataToAnalysisMeasure.brand, StringComparison.OrdinalIgnoreCase));

            var brandRefCode = brandProfile?.refCode ?? "UNIVERSAL";

            var brandChart = await cache.GetBrandSizeChartAsync(brandRefCode) 
                ?? await cache.GetBrandSizeChartAsync("UNIVERSAL");

            if (brandChart == null)
                throw new Exception("Critical: UNIVERSAL size chart is missing from the database.");

            var measureData = uploadDataToAnalysisMeasure.dataMeasure;



            var dataSize = await GetSizeFromMeasure(
                measureData,
                brandChart,
                uploadDataToAnalysisMeasure.userCustom.typeProduct,
                uploadDataToAnalysisMeasure.userCustom.gender,
                uploadDataToAnalysisMeasure.userCustom.sizeOutput
            );

            string fitSuggest = dataSize.FitPercent switch
            {
                >= 90 => "Rất vừa vặn",
                >= 80 => "Vừa vặn",
                >= 70 => "Tạm ổn",
                >= 60 => "Hơi lệch",
                >= 50 => "Không khuyến nghị",
                _     => "Không phù hợp"
            };

            var prompt = geminiServices.CreatePrompt(uploadDataToAnalysisMeasure);
            var GeminiResponse = await geminiServices.GetAIMeasure(prompt);
            var result = new ResultAnalysis
            {
                analysisCode = Guid.NewGuid().ToString(),
                analysisDate = DateTime.UtcNow,
                typeCustom = uploadDataToAnalysisMeasure.userCustom,
                fitSuggest = fitSuggest,
                sizeSuggest = dataSize.SizeCode,
                reliableRate = dataSize.FitPercent,
                fitSuggestFromAI = new GeminiResponse
                {
                    expectedFit        = new GeminiContent { content = GeminiResponse.expectedFit.content },
                    measurementInsight = new GeminiContent { content = GeminiResponse.measurementInsight.content },
                    productFitNote     = new GeminiContent { content = GeminiResponse.productFitNote.content }
                }
            };

            return result;
        }

        public async Task<string> ConvertImageToBase64(string base64String)
        {
            if (string.IsNullOrWhiteSpace(base64String))
            {
                throw new ArgumentException("Image data is required", nameof(base64String));
            }
            if (base64String.Contains(','))
                base64String = base64String.Split(',')[1];

            base64String = Regex.Replace(base64String, @"[^A-Za-z0-9\+/=]", string.Empty);

            int padding = base64String.Length % 4;
            if (padding > 0)
                base64String = base64String.PadRight(base64String.Length + (4 - padding), '=');

            var response = await geminiServices.GetMeasureFromImage(base64String);
            return response;
        }

        public async Task<string> ConvertUploadedFileToAnalysis(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("A file is required.", nameof(file));

            const long maxFileSize = 50 * 1024 * 1024;
            if (file.Length > maxFileSize)
                throw new ArgumentException("Maximum payload is 50MB.", nameof(file));

            var mimeType = string.IsNullOrWhiteSpace(file.ContentType)
                ? "application/octet-stream"
                : file.ContentType.ToLowerInvariant();

            var allowedMimeTypes = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "image/jpeg",
                "image/png",
                "application/pdf"
            };

            if (mimeType is "text/csv" or "application/csv" or "text/plain")
                throw new NotSupportedException("CSV files are not supported for AI size-chart analysis yet.");

            if (!allowedMimeTypes.Contains(mimeType))
                throw new NotSupportedException("Only JPG, PNG, and PDF files are supported.");

            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            return await geminiServices.GetMeasureFromFile(memoryStream.ToArray(), mimeType);
        }



        public async Task<ResultAnalysis> AnalysisPictureToSize(
         SizeAnalysisResponse uploadData,
         MeasureData measureData, CustomizeDataAiSuggest customizeDataAiSuggest)
        {
            double bestScore = -1;
            string bestSize = "";

            var measureDataDict = typeof(MeasureData)
                .GetProperties()
                .Where(p => p.PropertyType == typeof(float))
                .Select(p => new
                {
                    Name  = p.Name,
                    Value = (float)p.GetValue(measureData)!
                })
                .Where(x => x.Value > 0)
                .ToDictionary(x => x.Name, x => (int)Math.Round(x.Value));

            foreach (var s in uploadData.Sizes)
            {
                double totalScore = 0;
                int count = 0;

                if (s.Chest_Min_Cm > 0 && s.Chest_Max_Cm > 0 && measureDataDict.TryGetValue("Chest", out var userChest))
                {
                    totalScore += CalculateRangeFit(userChest, (int)Math.Round(s.Chest_Min_Cm), (int)Math.Round(s.Chest_Max_Cm));
                    count++;
                }
                if (s.Waist_Min_Cm > 0 && s.Waist_Max_Cm > 0 && measureDataDict.TryGetValue("Waist", out var userWaist))
                {
                    totalScore += CalculateRangeFit(userWaist, (int)Math.Round(s.Waist_Min_Cm), (int)Math.Round(s.Waist_Max_Cm));
                    count++;
                }
                if (s.Hip_Min_Cm > 0 && s.Hip_Max_Cm > 0 && measureDataDict.TryGetValue("Hip", out var userHip))
                {
                    totalScore += CalculateRangeFit(userHip, (int)Math.Round(s.Hip_Min_Cm), (int)Math.Round(s.Hip_Max_Cm));
                    count++;
                }
                if (s.Height_Min_Cm > 0 && s.Height_Max_Cm > 0 && measureDataDict.TryGetValue("Height", out var userHeight))
                {
                    totalScore += CalculateRangeFit(userHeight, (int)Math.Round(s.Height_Min_Cm), (int)Math.Round(s.Height_Max_Cm));
                    count++;
                }

                if (count > 0)
                {
                    double score = totalScore / count;
                    if (score > bestScore)
                    {
                        bestScore = score;
                        bestSize = s.Size_Us;
                    }
                }
            }
            var data = new uploadDataToAnalysisMeasure
            {
                brand = "Generic",
                userCustom = new CustomizeDataAiSuggest
                {
                    gender      = customizeDataAiSuggest.gender,
                    typeProduct = customizeDataAiSuggest.typeProduct,
                    sizeOutput  = customizeDataAiSuggest.sizeOutput
                },
                dataMeasure = measureData,
            };
            var prompt = geminiServices.CreatePrompt(data);
            var GeminiResponse = await geminiServices.GetAIMeasure(prompt);
            var result = new ResultAnalysis
            {
                analysisCode = Guid.NewGuid().ToString(),
                analysisDate = DateTime.UtcNow,
                typeCustom   = customizeDataAiSuggest,
                fitSuggest   = bestScore switch
                {
                    >= 90 => "Rất vừa vặn",
                    >= 80 => "Vừa vặn",
                    >= 70 => "Tạm ổn",
                    >= 60 => "Hơi lệch",
                    >= 50 => "Không khuyến nghị",
                    _     => "Không phù hợp"
                },
                sizeSuggest  = bestSize,
                reliableRate = bestScore > 0 ? (int)Math.Round(bestScore) : 0,
                fitSuggestFromAI = new GeminiResponse
                {
                    expectedFit        = new GeminiContent { content = GeminiResponse.expectedFit.content },
                    measurementInsight = new GeminiContent { content = GeminiResponse.measurementInsight.content },
                    productFitNote     = new GeminiContent { content = GeminiResponse.productFitNote.content }
                }
            };
            return result;
        }
    }
}
