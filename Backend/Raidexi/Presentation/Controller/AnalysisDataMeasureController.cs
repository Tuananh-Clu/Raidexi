using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Raidexi.Application.Dtos;
using Raidexi.Presentation.Services;

namespace Raidexi.Presentation.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalysisDataMeasureController : ControllerBase
    {
        private readonly AnalyisService analyisService;
        public AnalysisDataMeasureController(AnalyisService service)
        {
            analyisService = service;
        }
        [EnableRateLimiting("anon05")]
        [HttpPost("AISuggest")]
        public async Task<IActionResult> AISuggestSize([FromBody] uploadDataToAnalysisMeasure uploadDataToAnalysisMeasure)
        {
            var data = await analyisService.AISuggestSize(uploadDataToAnalysisMeasure);
            return Ok(data);

        }
    }
}
