using Raidexi.Domain.Entities;

namespace Raidexi.Domain.Interfaces.InterfacesForCache
{
    public interface ICacheAnalysisData
    {
        Task<List<MappingSize.UniversalSize>> GetUniversalSizeAsync();
        Task<List<MappingSize.BrandRule>> BrandRuleAsync();
        Task<List<MappingSize.SizeMapping>> SizeMappingAsync();
        Task<List<MappingSize.CategoryRule>> CategoryRuleAsync();
    }
}
