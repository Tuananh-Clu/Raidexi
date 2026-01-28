using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Raidexi.Application.Dtos;
using Raidexi.Application.Interfaces;
using Raidexi.Infrastructure.Services;

namespace Raidexi.Presentation.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly MailService _mailService;
        public MailController(MailService mailService)
        {
            _mailService = mailService;
        }
        [HttpPost("send")]
        public async Task<IActionResult> SendMail([FromBody] SendMailRequest sendMailRequest)
        {
            await _mailService.SendMailAsync(sendMailRequest);
            return Ok(new { Message = "Mail sent successfully" });
        }
    }
}
