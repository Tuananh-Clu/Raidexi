using Raidexi.Application.Dtos;
using Raidexi.Domain.Interfaces;

namespace Raidexi.Domain.Entities
{
    public class DataBrandAnalysis
    {
        public string userId { get; set; }
        public string brand { get; set; }
        public MeasureData  dataMeasure { get; set; }
        public ResultAnalysis dataAnalysis { get; set; }
    }
}
