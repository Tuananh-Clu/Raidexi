using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;

namespace Raidexi.Application.Interfaces
{
    public interface IAnalysisDataService
    {
        Task<SizeResult> GetSizeFromMeasure(MeasureData measureData, MappingSize.BrandSizeChart brandChart, string category, string gender, string sizeOutputRegion);
        Task<ResultAnalysis> AISuggestSize(uploadDataToAnalysisMeasure uploadDataToAnalysisMeasure);
    }


}
