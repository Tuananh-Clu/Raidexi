using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Raidexi.Application.Dtos;
using Raidexi.Domain.Interfaces;
using Raidexi.Presentation.Services;

namespace Raidexi.Presentation.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AuthService authService;
        public UserController(AuthService auth)
        {
            authService = auth;
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var result = await authService.LoginAsync(loginDto.email, loginDto.password);
            if (!result.IsSuccess)
            {
                return Unauthorized(new { message = result.ErrorMessage });
            }
            return Ok(new
            {
                isSuccess =true,
                message = result.ErrorMessage,
                user = result.User
            });
        }
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var result = await authService.RegisterAsync(registerDto.email, registerDto.password, registerDto.fullName);
            if (!result.IsSuccess)
            {
                return BadRequest(new { message = result.ErrorMessage });
            }
            return Ok(new
            {
                isSuccess = true,
                message = result.ErrorMessage,
                user = result.User
            });
                
        }
        [HttpGet("GetUserData")]
        public async Task<IActionResult> GetUserData()
        {
            var result = await authService.GetDataUser();
            return Ok(result);
        }
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await authService.LogOut();
            return Ok(new { message = "Logged out successfully." });
        }
        [HttpPost("LoginWithFirebase")]
        public async Task<IActionResult> LoginWithFirebase([FromQuery] string token)
        {
            var result = await authService.LoginWithFirebase(token);
            if (!result.IsSuccess)
            {
                return Unauthorized(new { message = result.ErrorMessage });
            }
            return Ok(new
            {
                isSuccess = true,
                message = result.ErrorMessage,
                user = result.User
            });
        }
    }
}
