
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Raidexi.Application.Dtos;
using Raidexi.Infrastructure.Services;

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
        [HttpPost("GetDataFromImage")]
        public async Task<IActionResult> GetDataFromImage([FromBody] string base64Image)
        {
            if (string.IsNullOrWhiteSpace(base64Image))
            {
                return BadRequest("Image data is required.");
            }

            try
            {
                var data = await analyisService.ConvertImageToBase64(base64Image);
                return Ok(data);
            }
            catch (FormatException)
            {
                return BadRequest("Invalid base64 image data.");
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("UploadChart")]
        [RequestSizeLimit(50 * 1024 * 1024)]
        [RequestFormLimits(MultipartBodyLengthLimit = 50 * 1024 * 1024)]
        public async Task<IActionResult> UploadChart([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("A file is required.");
            }

            try
            {
                var data = await analyisService.ConvertUploadedFileToAnalysis(file);
                return Ok(data);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (NotSupportedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("AnalyseImage")]
        public async Task<IActionResult> AnalyseImage([FromBody] UploadAnalyisForImage uploadAnalyisForImage)
        {
            var data = await analyisService.AnalysisPictureToSize(uploadAnalyisForImage.SizeAnalysisResponse, uploadAnalyisForImage.MeasureData, uploadAnalyisForImage.CustomizeDataAiSuggest);
            return Ok(data);

        }

    }
}
