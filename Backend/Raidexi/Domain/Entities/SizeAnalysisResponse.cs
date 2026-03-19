
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
        public int Chest_Min_Cm { get; set; }
        public int Chest_Max_Cm { get; set; }
        public int Height_Min_Cm { get; set; }
        public int Height_Max_Cm { get; set; }
        public int? Weight_Min_Kg { get; set; }
        public int? Weight_Max_Kg { get; set; }
        public int Waist_Min_Cm { get; set; }
        public int Waist_Max_Cm { get; set; }
        public int Hip_Min_Cm { get; set; }
        public int Hip_Max_Cm { get; set; }
    }
}