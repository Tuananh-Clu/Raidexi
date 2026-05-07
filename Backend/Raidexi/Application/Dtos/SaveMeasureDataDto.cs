using Raidexi.Domain.Entities;

namespace Raidexi.Application.Dtos
{
    public class MeasureDataList
    {
        public MeasureData dataMeasure { get; set; } = null!;
        public DateTime LastUpdate { get; set; }

    }
    public class SaveMeasureCustomDataList
    {
        public string id { get; set; }
        public string name { get; set; }
        public string color { get; set; }
        public MeasureData? dataMeasure { get; set; } = null;

    }
    public class SaveMeasureDataDto
    {

        public string id { get; set; }
        public MeasureDataList[] dataMeasure { get; set; } = Array.Empty<MeasureDataList>();
        public SaveMeasureCustomDataList[] dataMeasureCustom { get; set; } = Array.Empty<SaveMeasureCustomDataList>();
    }
}
