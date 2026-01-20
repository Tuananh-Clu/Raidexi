using System.Text.Json.Serialization;

namespace Raidexi.Domain.Entities
{
    public class MappingSize
    {
        public class ValueSize
        {
            public int Min { get; set; }
            public int Max { get; set; }
        }
        public class UniversalSize
        {
            public string Code { get; set; }
            public ValueSize Chest { get; set; }
            public ValueSize Waist { get; set; }
            public ValueSize Hip { get; set; }
        }

        public class SizeMapping
        {
            public string Universal { get; set; }
            public string VN { get; set; }
            public string US { get; set; }
            public string EU { get; set; }
            public string JP { get; set; }
            public string KR { get; set; }
        }

        public class CategoryRule
        {
            public string Category { get; set; }
            public List<string> Fields { get; set; }
        }

        public class BrandRule
        {
            public string Brand { get; set; }
            public int Chest { get; set; }
            public int Waist { get; set; }
            public int Hip { get; set; }
        }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public enum BrandStatus
        {
            OPTIMIZED,
            PENDING,
            RECALIBRATE
        }
        public class BrandProfile
        {
            public string id { get; set; }
            public string name { get; set; }
            public string refCode { get; set; }
            public BrandStatus status { get; set; }
            public DateTime lastSync { get; set; }  
            public string metricLabel { get; set; }
            public string metricValue { get; set; }
            public string icon { get; set; }
            public string Category { get; set; }
        }

    }
}
