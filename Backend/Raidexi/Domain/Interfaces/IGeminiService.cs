using Raidexi.Application.Dtos;

namespace Raidexi.Domain.Interfaces
{
    public interface IGeminiService
    {
        string CreatePrompt(uploadDataToAnalysisMeasure uploadDataToAnalysisMeasure);
        Task<GeminiResponse> GetAIMeasure(string prompt);
    }
}
