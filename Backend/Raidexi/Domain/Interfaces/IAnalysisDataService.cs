using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;

namespace Raidexi.Domain.Interfaces
{
    public interface IAnalysisDataService
    {
        Task<SizeResult> GetSizeFromMeasure(MeasureData measureData, string category,string gender);
        Task<ResultAnalysis> AISuggestSize(uploadDataToAnalysisMeasure uploadDataToAnalysisMeasure);
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
    public class SizeResult
    {
        public string SizeCode { get; set; } = string.Empty;
        public int FitPercent { get; set; }
    }
}
