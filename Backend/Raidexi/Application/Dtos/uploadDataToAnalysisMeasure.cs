using Raidexi.Domain.Entities;

namespace Raidexi.Application.Dtos
{
    public class uploadDataToAnalysisMeasure
    {
        public string  refCode { get; set; }
        public string brand { get; set; }
        public CustomizeDataAiSuggest userCustom { get; set; }
        public MeasureData dataMeasure { get; set; }

    }
}
