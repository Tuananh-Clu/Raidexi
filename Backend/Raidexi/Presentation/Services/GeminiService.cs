using Google.GenAI;
using Org.BouncyCastle.Asn1.X509;
using Raidexi.Application.Dtos;
using Raidexi.Domain.Interfaces;
using System.Text.Json;

namespace Raidexi.Presentation.Services
{
    public class GeminiService : IGeminiService
    {
        private static readonly string model = "gemini-3-flash-preview";
        private static readonly Client client = new Client();

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

Thông tin được cung cấp:
- Thương hiệu: {data.brand}
- Loại áo: {data.userCustom.typeProduct}
- Chiều cao: {data.dataMeasure.Height} cm
- Vòng ngực: {data.dataMeasure.Chest} cm
- Vai: {data.dataMeasure.ShoulderWidth} cm (nếu có)
- Vòng eo: {data.dataMeasure.Waist} cm (nếu có)

YÊU CẦU TRẢ VỀ:
Hãy trả về KẾT QUẢ DƯỚI DẠNG JSON, gồm đúng 3 object sau:

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

Mỗi object chỉ có 1 field là "content".  
Không thêm bất kỳ text nào ngoài JSON.
""";
            return promptTemplate;
        }

        public async Task<GeminiResponse> GetAIMeasure(string prompt)
        {
            var response = await client.Models.GenerateContentAsync(
                model: model, contents: prompt);
            var text = response.Candidates[0].Content.Parts[0].Text;
            var result = JsonSerializer.Deserialize<GeminiResponse>(
                text,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive=true
                });
            return result;
        }

    }
}
