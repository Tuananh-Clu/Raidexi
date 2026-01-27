using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Raidexi.Domain.Entities;

namespace Raidexi.Application.Dtos
{
    public class DataBrandAnalysisResult
    {
        [BsonId]
        public ObjectId id { get; set; }
        public string userId { get; set; }
        public List<DataBrand> DataBrandAnalysis { get; set; }

    }
    public class DataBrand
    {
        public string brand { get; set; }
        public MeasureData dataMeasure { get; set; }
        public ResultAnalysis dataAnalysis { get; set; }

    }
}
