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
        public IActionResult Getbrandprofiles()
        {
            var brandProfiles = _sizeMapping.GetAllBrandProfiles().Result;
            return Ok(brandProfiles);

        }
        [HttpPost("AddBrandProfile")]
        public async Task AddBrandProfile([FromBody] List<MappingSize.BrandProfile> brandProfile)
        {
            _sizeMapping.AddBrandProfile(brandProfile);
        }
        [HttpPost("AddSizeMapping")]
        public async Task<IActionResult> AddSizeMapping([FromBody] List<MappingSize.SizeMapping> sizeMapping)
        {
            _sizeMapping.AddSizeMapping(sizeMapping);
            return Ok("Success");
        }
        [HttpPost("AddUniversalSize")]
        public async Task<IActionResult> AddUniversalSize([FromBody] List<MappingSize.UniversalSize> universalSize)
        {
            _sizeMapping.AddUniversalSize(universalSize);
            return Ok("Success");
        }
        [HttpPost("AddCategoryRule")]
        public async Task<IActionResult> AddCategoryRule([FromBody] List<MappingSize.CategoryRule> categoryRule)
        {
            _sizeMapping.AddCategoryRule(categoryRule);
            return Ok("Success");
        }
        [HttpPost("AddBrandRule")]
        public async Task<IActionResult> AddBrandRule([FromBody] List<MappingSize.BrandRule> brandRule)
        {
            _sizeMapping.AddBrandRule(brandRule);
            return Ok("Success");
        }

    }
}
