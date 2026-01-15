using Raidexi.Domain.Entities;

namespace Raidexi.Application.Dtos
{
    public class SaveMeasureDataDto
    {
    
        public string id { get; set; }
        public MeasureData dataMeasure { get; set; }
        public DateTime LastUpdate { get; set; }
    }
}
