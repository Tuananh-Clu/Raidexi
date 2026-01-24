using Google.GenAI;
using Microsoft.Extensions.Logging;
using Raidexi.Application.Dtos;
using Raidexi.Domain.Interfaces;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace Raidexi.Presentation.Services
{
    public class GeminiService : IGeminiService
    {
        private static readonly string Model = "gemini-3-flash-preview";
        private readonly Client _client;
        private readonly ILogger<GeminiService>? _logger;

        public GeminiService(ILogger<GeminiService>? logger = null)
        {
            _logger = logger;
            var apiKey = Environment.GetEnvironmentVariable("GEMINI_API_KEY");
            if (string.IsNullOrEmpty(apiKey))
                throw new InvalidOperationException("Missing GEMINI_API_KEY environment variable");

            _client = new Client(apiKey: apiKey);
        }

        public string CreatePrompt(uploadDataToAnalysisMeasure data)
        {
            var promptTemplate = $"""
Bạn là stylist tư vấn size quần áo dựa trên số đo cơ thể và bảng size của thương hiệu.

TỔNG QUAN:
- Hệ thống có dữ liệu số đo cơ thể người mặc và size chart theo thương hiệu.
- Chưa có quy chuẩn chính thức về các loại fit (Slim / Regular / Relaxed) cho từng brand.
- Vì vậy, loại fit được đưa ra là FIT DỰ KIẾN, suy luận từ:
  + Chênh lệch giữa số đo cơ thể và size áo
  + Cảm giác mặc thực tế (ôm, vừa, hay hơi rộng)
- Fit dự kiến KHÔNG được xem là định nghĩa chính thức của thương hiệu.

THÔNG TIN ĐƯỢC CUNG CẤP:
- Thương hiệu: {data.brand}
- Loại áo: {data.userCustom.typeProduct}
- Chiều cao: {data.dataMeasure.Height} cm
- Vòng ngực: {data.dataMeasure.Chest} cm
- Vai: {data.dataMeasure.ShoulderWidth} cm
- Vòng eo: {data.dataMeasure.Waist} cm

YÊU CẦU TRẢ VỀ:
Trả về KẾT QUẢ DƯỚI DẠNG JSON thuần túy (KHÔNG có ```json hoặc markdown), gồm đúng 3 object:

1. measurementInsight  
   - Phân tích các số đo cơ thể quan trọng nhất đối với loại áo này  
   - Đánh giá nhanh mức độ phù hợp tổng thể  
   - Chỉ nói về cơ thể người mặc  
   - KHÔNG nói về phom dáng hay style áo  

2. productFitNote  
   - Mô tả phom dáng đặc trưng của loại áo trong thương hiệu này  
   - Mô tả cảm giác khi mặc ôm hơn hoặc rộng hơn  
   - Chỉ nói về sản phẩm  
   - KHÔNG phân tích số đo cơ thể  

3. expectedFit  
   - Xác định loại fit DỰ KIẾN (Slim / Regular / Relaxed)  
   - Fit được suy luận từ chênh lệch số đo, không phải quy chuẩn cố định của brand  
   - Mô tả ngắn gọn cảm giác khi mặc  

Mỗi object chỉ có 1 field là "content" (kiểu string).



CHỈ TRẢ VỀ JSON, KHÔNG CÓ TEXT KHÁC.
""";
            return promptTemplate;
        }

        public async Task<GeminiResponse> GetAIMeasure(string prompt)
        {
            try
            {
                _logger?.LogInformation("Calling Gemini API with model: {Model}", Model);

                var response = await _client.Models.GenerateContentAsync(
                    model: Model,
                    contents: prompt
                );
                if (response?.Candidates == null || response.Candidates.Count == 0)
                {
                    throw new InvalidOperationException("No candidates returned from Gemini API");
                }

                var candidate = response.Candidates[0];
                if (candidate?.Content?.Parts == null || candidate.Content.Parts.Count == 0)
                {
                    throw new InvalidOperationException("No content parts in response");
                }

                var text = candidate.Content.Parts[0].Text;
                if (string.IsNullOrWhiteSpace(text))
                {
                    throw new InvalidOperationException("Empty response text from Gemini");
                }

                _logger?.LogDebug("Raw Gemini response: {Response}", text);

                text = CleanJsonResponse(text);
                var result = JsonSerializer.Deserialize<GeminiResponse>(
                    text,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true,
                        AllowTrailingCommas = true
                    }
                );

                if (result == null)
                {
                    throw new InvalidOperationException("Failed to deserialize Gemini response");
                }

                _logger?.LogInformation("Successfully parsed Gemini response");
                Console.WriteLine(result);
                return result;
            }
            catch (JsonException ex)
            {
                _logger?.LogError(ex, "JSON parsing error. Response might not be valid JSON");
                throw new InvalidOperationException("Failed to parse AI response as JSON", ex);
            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, "Error calling Gemini API");
                throw;
            }
        }

        private static string CleanJsonResponse(string text)
        {
            text = Regex.Replace(text, @"^```json\s*", "", RegexOptions.Multiline);
            text = Regex.Replace(text, @"\s*```$", "", RegexOptions.Multiline);
            text = text.Trim();

            return text;
        }
    }
}