using Raidexi.Domain.Entities;

namespace Raidexi.Application.Dtos
{
    public class MeasureDataList
    {
        public MeasureData dataMeasure { get; set; }
        public DateTime LastUpdate { get; set; }

    }
    public class SaveMeasureDataDto
    {

        public string id { get; set; }
        public MeasureDataList[] dataMeasure { get; set; }
    }
}
