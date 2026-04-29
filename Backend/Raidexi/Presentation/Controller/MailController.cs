using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Raidexi.Application.Dtos;
using Raidexi.Application.Interfaces;

namespace Raidexi.Presentation.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IMailServicecs _mailService;

        public MailController(IMailServicecs mailService)
        {
            _mailService = mailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMail([FromBody] SendMailRequest sendMailRequest)
        {
            try
            {
                await _mailService.SendMailAsync(sendMailRequest);
                return Ok(new { Message = "Mail sent successfully" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
            catch (AuthenticationException ex)
            {
                return StatusCode(
                    StatusCodes.Status502BadGateway,
                    new { Message = ex.Message, Detail = "Failed to authenticate with the mail server." });
            }
        }
    }
}
