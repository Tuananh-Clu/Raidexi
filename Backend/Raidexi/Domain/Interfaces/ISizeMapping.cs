using Raidexi.Domain.Entities;

namespace Raidexi.Domain.Interfaces
{
    public interface ISizeMapping
    {
        Task AddCategoryRule(List<MappingSize.CategoryRule> categoryRule);
            
        Task AddBrandProfile(List<MappingSize.BrandProfile> brandProfile);
        Task<List<MappingSize.BrandProfile>> GetAllBrandProfiles();
        Task AddBrandSizeChart(List<MappingSize.BrandSizeChart> brandSizeCharts);
        Task<MappingSize.BrandSizeChart> GetBrandSizeChartAsync(string brandRefCode);

        Task AddBrandProfileRequest(MappingSize.BrandProfileRequest brandProfileRequest);
        Task<List<MappingSize.BrandProfileRequest>> GetBrandProfileRequests();
        Task<List<MappingSize.BrandProfileRequest>> GetBrandProfileRequestsByUserId(string userId);
        Task UpdateBrandProfileRequestStatus(string id, MappingSize.BrandProfileRequestStatus status);

        Task AddBrandSizeChartAndBrandProfile(List<MappingSize.BrandSizeChart> brandSizeCharts, List<MappingSize.BrandProfile> brandProfiles);

    }
}
