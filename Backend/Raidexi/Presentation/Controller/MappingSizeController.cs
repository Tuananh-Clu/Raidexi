using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;
using Raidexi.Domain.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace Raidexi.Presentation.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class MappingSizeController : ControllerBase
    {
        private readonly ISizeMapping _sizeMapping;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MappingSizeController(ISizeMapping sizeMapping, IHttpContextAccessor httpContextAccessor)
        {
            _sizeMapping = sizeMapping;
            _httpContextAccessor = httpContextAccessor;
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

            var token = _httpContextAccessor.HttpContext?.Request.Cookies["access_token_client"]
                ?? _httpContextAccessor.HttpContext?.Request.Cookies["access_token_admin"];
            
            if (!string.IsNullOrEmpty(token))
            {
                var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);
                var userId = jwt.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
                if (!string.IsNullOrEmpty(userId))
                {
                    brandProfileRequest.userId = userId;
                }
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
        [HttpGet("my-brand-profile-requests")]
        public async Task<IActionResult> GetMyBrandProfileRequests()
        {
            var token = _httpContextAccessor.HttpContext?.Request.Cookies["access_token_client"]
                ?? _httpContextAccessor.HttpContext?.Request.Cookies["access_token_admin"];
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized(new { isSuccess = false, message = "Not authenticated" });
            }
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var userId = jwt.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { isSuccess = false, message = "Invalid token" });
            }

            var requests = await _sizeMapping.GetBrandProfileRequestsByUserId(userId);
            return Ok(requests);
        }
        [HttpPut("brand-profile-requests/{id}/status")]
        public async Task<IActionResult> UpdateBrandProfileRequestStatus(string id, [FromBody] MappingSize.BrandProfileRequestStatus status)
        {
            await _sizeMapping.UpdateBrandProfileRequestStatus(id, status);
            return Ok(new { isSuccess = true, message = "Status updated" });
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
        [HttpPost("AddBrandSizeChartAndBrandProfile")]
        public async Task<IActionResult> AddBrandSizeChartAndBrandProfile([FromBody] BrandSizeChartAndBrandProfileRequest request)
        {
            await _sizeMapping.AddBrandSizeChartAndBrandProfile(request.BrandSizeCharts, request.BrandProfiles);
            return Ok("Success");
        }
    }
}
