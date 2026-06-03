using Microsoft.AspNetCore.Http;

namespace Raidexi.Application.Dtos
{
    public class UploadChartRequest
    {
        public IFormFile? File { get; set; }
    }
}
