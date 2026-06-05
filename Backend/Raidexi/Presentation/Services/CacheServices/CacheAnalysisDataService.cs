using Microsoft.Extensions.Caching.Memory;
using MongoDB.Driver;
using Raidexi.Domain.Entities;
using Raidexi.Domain.Interfaces.InterfacesForCache;
using Raidexi.Infrastructure.Persistence;

namespace Raidexi.Presentation.Services.CacheServices
{
    public class CacheAnalysisDataService:ICacheAnalysisData
    {
        private readonly IMemoryCache cache;
        private readonly MongoDbContext context;
        public CacheAnalysisDataService(IMemoryCache _cache,MongoDbContext dbContext)
        {
            cache = _cache;
            context = dbContext;
        }
        public async Task<List<MappingSize.CategoryRule>> CategoryRuleAsync()
        {
            return await cache.GetOrCreateAsync("analysis_category_rule", async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(24);
                var data = await context.CategoryRule.Find(_ => true).ToListAsync();
                return data;
            });
        }

        public async Task<MappingSize.BrandSizeChart> GetBrandSizeChartAsync(string brandRefCode)
        {
            return await cache.GetOrCreateAsync($"analysis_brand_size_chart_{brandRefCode}", async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(24);
                var data = await context.BrandSizeChart.Find(x => x.brandRefCode == brandRefCode).FirstOrDefaultAsync();
                return data;
            });
        }

        public async Task<List<MappingSize.BrandProfile>> GetAllBrandProfilesAsync()
        {
            return await cache.GetOrCreateAsync("analysis_brand_profile", async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(24);
                var data = await context.BrandProfile.Find(_ => true).ToListAsync();
                return data;
            });
        }
    }
}
