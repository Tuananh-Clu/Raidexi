
using Raidexi.Domain.Entities;
namespace Raidexi.Application.Dtos
{
    public class BrandSizeChartAndBrandProfileRequest
    {
        public List<MappingSize.BrandSizeChart> BrandSizeCharts { get; set; }
        public List<MappingSize.BrandProfile> BrandProfiles { get; set; }
    }
}