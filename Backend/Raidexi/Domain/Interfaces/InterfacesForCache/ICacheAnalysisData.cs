using Raidexi.Domain.Entities;

namespace Raidexi.Domain.Interfaces.InterfacesForCache
{
    public interface ICacheAnalysisData
    {
        Task<List<MappingSize.CategoryRule>> CategoryRuleAsync();
        Task<MappingSize.BrandSizeChart> GetBrandSizeChartAsync(string brandRefCode);
        Task<List<MappingSize.BrandProfile>> GetAllBrandProfilesAsync();
    }
}
