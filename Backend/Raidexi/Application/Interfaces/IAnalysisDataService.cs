using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;

namespace Raidexi.Application.Interfaces
{
    public interface IAnalysisDataService
    {
        Task<SizeResult> GetSizeFromMeasure(MeasureData measureData, string category,string gender);
        Task<ResultAnalysis> AISuggestSize(uploadDataToAnalysisMeasure uploadDataToAnalysisMeasure);
    }


}
