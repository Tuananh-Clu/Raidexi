
using Raidexi.Domain.Entities;
using Raidexi.Models;

namespace Raidexi.Application.Dtos
{
    public class UploadAnalyisForImage
    {
        public MeasureData MeasureData { get; set; }
        public SizeAnalysisResponse SizeAnalysisResponse { get; set; }
        public CustomizeDataAiSuggest CustomizeDataAiSuggest { get; set; }
    }
}