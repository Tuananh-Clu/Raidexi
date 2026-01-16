using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;

namespace Raidexi.Domain.Interfaces
{
    public interface IAnalysisDataService
    {
        Task<ResultAnalysis> AISuggestSize(uploadDataToAnalysisMeasure uploadDataToAnalysisMeasure);
        Task GetRateReliable();
        Task GetGarmentFit();
    }

    public class ResultAnalysis
    {
        public string analysisCode { get; set; }
        public DateTime analysisDate { get; set; }
        public CustomizeDataAiSuggest typeCustom { get; set; }
        public string fitSuggest { get; set; }
        public string sizeSuggest { get; set; }
        public int reliableRate { get; set; }

    }
}
