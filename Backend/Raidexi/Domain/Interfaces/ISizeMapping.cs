using Raidexi.Domain.Entities;

namespace Raidexi.Domain.Interfaces
{
    public interface ISizeMapping
    {
        Task AddUniversalSize(List<MappingSize.UniversalSize> universalSize);
        Task AddSizeMapping(List<MappingSize.SizeMapping> sizeMapping);
        Task AddCategoryRule(List<MappingSize.CategoryRule> categoryRule);
        Task AddBrandRule(List<MappingSize.BrandRule> brandRule);
            
        Task AddBrandProfile(List<MappingSize.BrandProfile> brandProfile);
        Task<List<MappingSize.BrandProfile>> GetAllBrandProfiles();

    }
}
