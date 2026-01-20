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
        public async Task<List<MappingSize.UniversalSize?>> GetUniversalSizeAsync()
        {
            return await cache.GetOrCreateAsync("analysis_universal_size", async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(24);
                var data = await context.UniversalSize.Find(_ => true).ToListAsync();
                return data;
            });
        }
        public async Task<List<MappingSize.BrandRule?>> BrandRuleAsync()
        {
            return await cache.GetOrCreateAsync("analysis_brand_rule", async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(24);
                var data = await context.BrandRule.Find(_ => true).ToListAsync();
                return data;
            });
        }
        public async Task<List<MappingSize.SizeMapping?>> SizeMappingAsync()
        {
            return await cache.GetOrCreateAsync("analysis_size_mapping", async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(24);
                var data = await context.SizeMapping.Find(_ => true).ToListAsync();
                return data;
            });
        }

        public async Task<List<MappingSize.CategoryRule?>> CategoryRuleAsync()
        {
            return await cache.GetOrCreateAsync("analysis_category_rule", async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(24);
                var data = await context.CategoryRule.Find(_ => true).ToListAsync();
                return data;
            });
        }

    }
}
