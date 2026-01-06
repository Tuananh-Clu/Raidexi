using MongoDB.Driver;
using Raidexi.Domain.Entities;
using Raidexi.Domain.Interfaces;

namespace Raidexi.Infrastructure.Persistence
{
    public class MappingSizeRepo: ISizeMapping
    {
        private readonly MongoDbContext _db;
        
        public MappingSizeRepo(MongoDbContext db)
        {
            _db = db;
        }
        
        public async Task AddUniversalSize(MappingSize.UniversalSize universalSize)
        {
            await _db.UniversalSize.InsertOneAsync(universalSize);
        }
        public async Task AddUniversalSize(List<MappingSize.UniversalSize> universalSizes)
        {
            await _db.UniversalSize.InsertManyAsync(universalSizes);
        }
        public async Task AddSizeMapping(MappingSize.SizeMapping sizeMapping)
        {
            await _db.SizeMapping.InsertOneAsync(sizeMapping);
        }
        public async Task AddSizeMapping(List<MappingSize.SizeMapping> sizeMappings)
        {
            await _db.SizeMapping.InsertManyAsync(sizeMappings);
        }
        public async Task AddCategoryRule(MappingSize.CategoryRule categoryRule)
        {
            await _db.CategoryRule.InsertOneAsync(categoryRule);
        }
        public async Task AddCategoryRule(List<MappingSize.CategoryRule> categoryRules)
        {
            await _db.CategoryRule.InsertManyAsync(categoryRules);
        }
        public async Task AddBrandRule(MappingSize.BrandRule brandRule)
        {
            await _db.BrandRule.InsertOneAsync(brandRule);
        }
        public async Task AddBrandRule(List<MappingSize.BrandRule> brandRules)
        {
            await _db.BrandRule.InsertManyAsync(brandRules);
        }
        public async Task AddBrandProfile(List<MappingSize.BrandProfile> brandProfiles)
        {
            await _db.BrandProfile.InsertManyAsync(brandProfiles);
        }
        public async Task<List<MappingSize.BrandProfile>> GetAllBrandProfiles()
        {
            var brandProfiles = await _db.BrandProfile.Find(_ => true).ToListAsync();
            return brandProfiles;
        }
    }
}
