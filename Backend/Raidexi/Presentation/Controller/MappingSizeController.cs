using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Raidexi.Domain.Entities;
using Raidexi.Domain.Interfaces;
using System.Threading.Tasks;

namespace Raidexi.Presentation.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class MappingSizeController : ControllerBase
    {
        private readonly ISizeMapping _sizeMapping;
        public MappingSizeController(ISizeMapping sizeMapping)
        {
            _sizeMapping = sizeMapping;
        }
        [HttpGet("brand-profiles")]
        public async Task<IActionResult> Getbrandprofiles()
        {
            var brandProfiles = await _sizeMapping.GetAllBrandProfiles();
            return Ok(brandProfiles);

        }
        [HttpPost("AddBrandProfile")]
        public async Task<IActionResult> AddBrandProfile([FromBody] List<MappingSize.BrandProfile> brandProfile)
        {
            await _sizeMapping.AddBrandProfile(brandProfile);
            return Ok(new { isSuccess = true, message = "Brand profile added" });
        }
        [HttpPost("brand-profile-requests")]
        public async Task<IActionResult> AddBrandProfileRequest([FromBody] MappingSize.BrandProfileRequest brandProfileRequest)
        {
            if (string.IsNullOrWhiteSpace(brandProfileRequest.brandName))
            {
                return BadRequest(new { isSuccess = false, message = "Brand name is required" });
            }

            await _sizeMapping.AddBrandProfileRequest(brandProfileRequest);
            return Ok(new { isSuccess = true, message = "Brand profile request submitted" });
        }
        [HttpGet("brand-profile-requests")]
        public async Task<IActionResult> GetBrandProfileRequests()
        {
            var requests = await _sizeMapping.GetBrandProfileRequests();
            return Ok(requests);
        }
        [HttpPost("AddBrandSizeChart")]
        public async Task<IActionResult> AddBrandSizeChart([FromBody] List<MappingSize.BrandSizeChart> brandSizeCharts)
        {
            await _sizeMapping.AddBrandSizeChart(brandSizeCharts);
            return Ok("Success");
        }
        [HttpGet("brand-size-chart/{brandRefCode}")]
        public async Task<IActionResult> GetBrandSizeChart(string brandRefCode)
        {
            var chart = await _sizeMapping.GetBrandSizeChartAsync(brandRefCode);
            if (chart == null) return NotFound();
            return Ok(chart);
        }
        [HttpPost("AddCategoryRule")]
        public async Task<IActionResult> AddCategoryRule([FromBody] List<MappingSize.CategoryRule> categoryRule)
        {
            await _sizeMapping.AddCategoryRule(categoryRule);
            return Ok("Success");
        }

    }
}
