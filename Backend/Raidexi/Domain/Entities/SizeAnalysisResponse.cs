
using System.Text.Json.Serialization;

namespace Raidexi.Models
{
    public class SizeAnalysisResponse
    {
        [JsonPropertyName("sizes")]
        public List<SizeInfo> Sizes { get; set; } = new();
    }

    public class SizeInfo
    {
        public string Size_Us { get; set; }
        public int Size_Uk { get; set; }
        public int Size_Eu { get; set; }
        public float  Chest_Min_Cm { get; set; }
        public float Chest_Max_Cm { get; set; }
        public float Height_Min_Cm { get; set; }
        public float Height_Max_Cm { get; set; }
        public float? Weight_Min_Kg { get; set; }
        public float? Weight_Max_Kg { get; set; }
        public float Waist_Min_Cm { get; set; }
        public float Waist_Max_Cm { get; set; }
        public float Hip_Min_Cm { get; set; }
        public float Hip_Max_Cm { get; set; }
    }
}