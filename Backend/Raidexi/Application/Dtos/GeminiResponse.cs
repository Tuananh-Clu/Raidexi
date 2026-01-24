namespace Raidexi.Application.Dtos
{
    public class GeminiResponse
    {
         public GeminiContent measurementInsight { get; set; }
         public GeminiContent productFitNote { get; set; }
         public GeminiContent expectedFit { get; set; }
    }
    public class GeminiContent
    {
        public string content { get; set; }
    }
}
