using Raidexi.Domain.Entities;

namespace Raidexi.Application.Dtos
{
    public class ResultAnalysis
    {
        public string analysisCode { get; set; }
        public DateTime analysisDate { get; set; }
        public CustomizeDataAiSuggest typeCustom { get; set; }
        public string fitSuggest { get; set; }
        public string sizeSuggest { get; set; }
        public int reliableRate { get; set; }
        public GeminiResponse fitSuggestFromAI { get; set; }
    }
}
