using MongoDB.Driver;
using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;

namespace Raidexi.Infrastructure.Persistence
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase mongoDatabase;

        public MongoDbContext(IMongoDatabase mongoDatabases)
        {
            mongoDatabase = mongoDatabases;
        }
        public IMongoCollection<MappingSize.UniversalSize> UniversalSize => mongoDatabase.GetCollection<MappingSize.UniversalSize>("UniversalSize");
        public IMongoCollection<MappingSize.BrandRule> BrandRule => mongoDatabase.GetCollection<MappingSize.BrandRule>("BrandRUle");
        public IMongoCollection<MappingSize.CategoryRule> CategoryRule => mongoDatabase.GetCollection<MappingSize.CategoryRule>("CategoryRule");
        public IMongoCollection<MappingSize.SizeMapping> SizeMapping => mongoDatabase.GetCollection<MappingSize.SizeMapping>("SizeMapping");
        public IMongoCollection<MappingSize.BrandProfile> BrandProfile => mongoDatabase.GetCollection<MappingSize.BrandProfile>("BrandProfile");
        public IMongoCollection<SaveMeasureDataDto> MeasureUserData => mongoDatabase.GetCollection<SaveMeasureDataDto>("MeasureDataUser");
        public IMongoCollection<DataBrandAnalysisResult> DataBrandAnalysis => mongoDatabase.GetCollection<DataBrandAnalysisResult>("DataBrandAnalysis");

    }
}
