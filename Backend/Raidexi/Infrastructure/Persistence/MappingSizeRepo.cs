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
        
        public async Task AddCategoryRule(MappingSize.CategoryRule categoryRule)
        {
            await _db.CategoryRule.InsertOneAsync(categoryRule);
        }
        public async Task AddCategoryRule(List<MappingSize.CategoryRule> categoryRules)
        {
            await _db.CategoryRule.InsertManyAsync(categoryRules);
        }
        public async Task AddBrandSizeChart(List<MappingSize.BrandSizeChart> brandSizeCharts)
        {
            await _db.BrandSizeChart.InsertManyAsync(brandSizeCharts);
        }
        public async Task<MappingSize.BrandSizeChart> GetBrandSizeChartAsync(string brandRefCode)
        {
            return await _db.BrandSizeChart.Find(x => x.brandRefCode == brandRefCode).FirstOrDefaultAsync();
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
        public async Task AddBrandProfileRequest(MappingSize.BrandProfileRequest brandProfileRequest)
        {
            brandProfileRequest.createdAt = DateTime.UtcNow;
            brandProfileRequest.status = MappingSize.BrandProfileRequestStatus.PENDING;
            await _db.BrandProfileRequest.InsertOneAsync(brandProfileRequest);
        }
        public async Task<List<MappingSize.BrandProfileRequest>> GetBrandProfileRequests()
        {
            var sort = Builders<MappingSize.BrandProfileRequest>.Sort.Descending(request => request.createdAt);
            return await _db.BrandProfileRequest.Find(_ => true).Sort(sort).ToListAsync();
        }
        public async Task<List<MappingSize.BrandProfileRequest>> GetBrandProfileRequestsByUserId(string userId)
        {
            var filter = Builders<MappingSize.BrandProfileRequest>.Filter.Eq(request => request.userId, userId);
            var sort = Builders<MappingSize.BrandProfileRequest>.Sort.Descending(request => request.createdAt);
            return await _db.BrandProfileRequest.Find(filter).Sort(sort).ToListAsync();
        }
        public async Task UpdateBrandProfileRequestStatus(string id, MappingSize.BrandProfileRequestStatus status)
        {
            var update = Builders<MappingSize.BrandProfileRequest>.Update.Set(x => x.status, status);
            await _db.BrandProfileRequest.UpdateOneAsync(x => x.id == id, update);
        }
        public async Task AddBrandSizeChartAndBrandProfile(List<MappingSize.BrandSizeChart> brandSizeCharts, List<MappingSize.BrandProfile> brandProfiles)
        {
            var tasks = new List<Task>
            {
                _db.BrandSizeChart.InsertManyAsync(brandSizeCharts),
                _db.BrandProfile.InsertManyAsync(brandProfiles)
            };
            await Task.WhenAll(tasks);
        }
    }
}
