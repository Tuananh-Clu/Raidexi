
using System.Text.Json.Serialization;

namespace Raidexi.Models
{
    public class SizeAnalysisResponse
    {
        [JsonPropertyName("sizes")]
        public List<SizeItem> Sizes { get; set; } = new();
    }

    public class SizeItem
    {
        [JsonPropertyName("size_us")]
        public string SizeUs { get; set; } = string.Empty;

        [JsonPropertyName("size_uk")]
        public int SizeUk { get; set; }

        [JsonPropertyName("size_eu")]
        public int SizeEu { get; set; }

        [JsonPropertyName("chest_cm")]
        public string ChestCm { get; set; } = string.Empty;

        [JsonPropertyName("waist_cm")]
        public string WaistCm { get; set; } = string.Empty;

        [JsonPropertyName("hip_cm")]
        public string HipCm { get; set; } = string.Empty;

        [JsonPropertyName("height_cm")]
        public string HeightCm { get; set; } = string.Empty;

        [JsonPropertyName("weight_kg")]
        public string WeightKg { get; set; } = string.Empty;
    }
}