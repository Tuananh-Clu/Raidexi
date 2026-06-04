using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
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
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string id { get; set; }
            public string Gender { get; set; }
            public string Code { get; set; }
            // Core
            public ValueSize Chest { get; set; }
            public ValueSize Waist { get; set; }
            public ValueSize Hip { get; set; }
            public ValueSize ShoulderWidth { get; set; }
            public ValueSize Height { get; set; }
            // Upper body
            public ValueSize Neck { get; set; }
            public ValueSize SleeveLength { get; set; }
            public ValueSize ArmHole { get; set; }
            public ValueSize UpperArm { get; set; }
            // Lower body
            public ValueSize Inseam { get; set; }
            public ValueSize CrotchDepth { get; set; }
            public ValueSize Thigh { get; set; }
            public ValueSize OutseamLength { get; set; }
        }

        public class SizeMapping
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string id { get; set; }
            public string Universal { get; set; }
            public string VN { get; set; }
            public string US { get; set; }
            public string EU { get; set; }
            public string JP { get; set; }
            public string KR { get; set; }
        }

        public class CategoryRule
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string id { get; set; }
            public string Category { get; set; }
            public List<string> Fields { get; set; }
        }

        public class BrandRule
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string id { get; set; }
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
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public enum BrandProfileRequestStatus
        {
            PENDING,
            REVIEWING,
            APPROVED,
            REJECTED
        }
        public class BrandProfile
        {
            public string _id { get; set; }
            public string name { get; set; }
            public string refCode { get; set; }
            public BrandStatus status { get; set; }
            public DateTime lastSync { get; set; }  
            public string metricLabel { get; set; }
            public string metricValue { get; set; }
            public string icon { get; set; }
            public string Category { get; set; }
            public string origin { get; set; }
            public string segment { get; set; }
            public string dataSeason { get; set; }
        }
        public class BrandProfileRequest
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string? id { get; set; }
            public string brandName { get; set; } = string.Empty;
            public string refCode { get; set; } = string.Empty;
            public string category { get; set; } = string.Empty;
            public string origin { get; set; } = string.Empty;
            public string segment { get; set; } = string.Empty;
            public string productType { get; set; } = string.Empty;
            public string sizeSystem { get; set; } = string.Empty;
            public string requesterNote { get; set; } = string.Empty;
            public BrandProfileRequestStatus status { get; set; } = BrandProfileRequestStatus.PENDING;
            public DateTime createdAt { get; set; } = DateTime.UtcNow;
        }
    }
}
