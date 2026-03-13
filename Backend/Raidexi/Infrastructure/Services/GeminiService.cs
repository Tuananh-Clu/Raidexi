using Google.GenAI;
using Raidexi.Application.Dtos;
using Raidexi.Application.Interfaces;
using System.Text.Json;
using System.Text.RegularExpressions;
using Google.GenAI.Types;
namespace Raidexi.Infrastructure.Services
{
    public class GeminiService : IGeminiService
    {
        private static readonly string Model = "gemini-3-flash-preview";
        private string promptTemplate =
        @"
You are an AI that extracts structured data from images.

The image may contain a clothing size chart or measurement table.

Tasks:
1. Detect the table in the image.
2. Identify columns such as size, chest, waist, hip, length, sleeve, etc.
3. Extract all rows of the table.
4. Convert all numeric values to numbers (not text).
5. Return ONLY valid JSON.

JSON format example:
{
  ""sizes"": [
    {
      ""size"": ""S"",
      ""chest"": 90,
      ""waist"": 70,
      ""length"": 65
    },
    {
      ""size"": ""M"",
      ""chest"": 95,
      ""waist"": 75,
      ""length"": 68
    }
  ]
}

Rules:
- Detect columns automatically.
- Ignore unrelated text in the image.
- If a value is missing return null.
- Return ONLY JSON without explanation.
";
        private readonly Client _client;
        private readonly ILogger<GeminiService>? _logger;

        public GeminiService(ILogger<GeminiService>? logger = null)
        {
            _logger = logger;
            var apiKey = System.Environment.GetEnvironmentVariable("GEMINI_API_KEY");
            if (string.IsNullOrEmpty(apiKey))
                throw new InvalidOperationException("Missing GEMINI_API_KEY environment variable");

            _client = new Google.GenAI.Client(apiKey: apiKey);
        }

        public string CreatePrompt(uploadDataToAnalysisMeasure data)
        {
            var prompt = $$"""
SYSTEM ROLE:
Bạn là một API sinh dữ liệu JSON cho hệ thống backend.
Bạn KHÔNG phải chatbot.
Bạn KHÔNG được trò chuyện.
Bạn KHÔNG được giải thích.
Bạn KHÔNG được thêm chữ.

⚠️ QUY TẮC BẮT BUỘC (NẾU VI PHẠM → RESPONSE BỊ LOẠI BỎ):
- CHỈ được trả về JSON hợp lệ
- KHÔNG markdown
- KHÔNG ```json
- KHÔNG text trước hoặc sau JSON
- KHÔNG comment
- KHÔNG xuống dòng thừa ngoài JSON
- KHÔNG dùng dấu nháy đơn
- KHÔNG thêm field mới
- KHÔNG bỏ field
- JSON PHẢI parse được bằng System.Text.Json

--------------------------------------------------

BỐI CẢNH:
Bạn là stylist tư vấn size quần áo dựa trên số đo cơ thể người mặc và đặc điểm sản phẩm của thương hiệu.

LƯU Ý:
- KHÔNG tồn tại chuẩn fit chính thức (Slim / Regular / Relaxed) cho brand
- Fit được trả về là FIT DỰ KIẾN, suy luận từ chênh lệch số đo
- Không khẳng định tuyệt đối

--------------------------------------------------

DỮ LIỆU ĐẦU VÀO:
- Thương hiệu: {{data.brand}}
- Loại sản phẩm: {{data.userCustom.typeProduct}}
- Chiều cao: {{data.dataMeasure.Height}} cm
- Vòng ngực: {{data.dataMeasure.Chest}} cm
- Vai: {{data.dataMeasure.ShoulderWidth}} cm
- Vòng eo: {{data.dataMeasure.Waist}} cm

--------------------------------------------------

JSON OUTPUT FORMAT (BẮT BUỘC ĐÚNG 100%):

{
  "measurementInsight": {
    "content": "string"
  },
  "productFitNote": {
    "content": "string"
  },
  "expectedFit": {
    "content": "string"
  }
}

--------------------------------------------------

measurementInsight:

Chỉ phân tích số đo cơ thể

Tập trung vào chiều cao và vòng ngực

Nêu rõ: với số đo này, khi mặc áo sẽ thể hiện như thế nào (độ đầy ngực, độ dài thân/tay áo)

Không nhắc tới phom dáng, fit, style, thiết kế sản phẩm

Giọng chuyên gia đo form, khách quan

productFitNote:
Chỉ mô tả sản phẩm và cảm giác khi mặc

Nói về độ ôm, độ thoải mái, chuyển động khi mặc

Không phân tích hay suy luận từ số đo cơ thể

Không nhắc chiều cao, vòng ngực hay size

expectedFit:

Chỉ chọn MỘT: Slim / Regular / Relaxed
Fit là cảm nhận dự kiến khi mặc, không phải tiêu chuẩn brand

Mô tả ngắn gọn cảm giác tổng thể khi mặc

--------------------------------------------------

NẾU KHÔNG ĐỦ DỮ LIỆU:
- VẪN PHẢI TRẢ JSON
- Nội dung mang tính trung tính
- KHÔNG ghi "unknown", "cannot determine"

--------------------------------------------------

NHẮC LẠI LẦN CUỐI:
CHỈ TRẢ JSON HỢP LỆ.
KHÔNG TRẢ BẤT KỲ TEXT NÀO KHÁC.
""";

            return prompt;
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
        public async Task<string> GetMeasureFromImage(string base64Image)
        {
            try
            {
            
                var bytes = Convert.FromBase64String(base64Image);
                var content = new Content
                {
                    Parts = new List<Part>
            {
                new Part
                {
                    InlineData = new Blob
                    {
                        MimeType = "image/jpeg",
                        Data = bytes

                    }

                },
                new Part
                {
                    Text = promptTemplate
                }
            }
                };

                _logger?.LogInformation("Processing image with Gemini API");
                var response = await _client.Models.GenerateContentAsync(
                    model: Model,
                    contents: content
                );

                if (response?.Candidates == null || response.Candidates.Count == 0)
                {
                    throw new InvalidOperationException("No candidates returned from Gemini API");
                }
                if (response.Candidates[0]?.Content?.Parts == null || response.Candidates[0].Content.Parts.Count == 0)
                {
                    throw new InvalidOperationException("No content parts in Gemini response");
                }

                return CleanJsonResponse(response.Candidates[0].Content.Parts[0].Text);
            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, "Error processing image with Gemini API");
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