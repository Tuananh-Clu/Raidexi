using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;
using Raidexi.Domain.Interfaces;
using Raidexi.Infrastructure.Services;

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
                isSuccess = true,
                message = result.ErrorMessage,
                user = new User
                {
                    Id = result.User.Id,
                    FullName = result.User.FullName,
                    Email = result.User.Email,
                    CreatedAt = result.User.CreatedAt,
                    HashPassword = ""
                }
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
            var dataMeasure = await authService.GetMeasureForUser(result.User.Id);
            if (result == null)
            {
                return Unauthorized(new { message = "Error Fetch Data" });
            }
            return Ok(new
            {
                isSuccess = true,
                message = "Error Fetch Data",
                user = new User
                {
                    Id = result.User.Id,
                    FullName = result.User.FullName,
                    Email = result.User.Email,
                    CreatedAt = result.User.CreatedAt,
                    HashPassword = ""
                },
                measureData = dataMeasure
            });
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
                user = new User
                {
                    Id = result.User.Id,
                    FullName = result.User.FullName,
                    Email = result.User.Email,
                    CreatedAt = result.User.CreatedAt,
                    HashPassword = ""
                }
            });
        }
        [HttpPost("SaveMeasure")]
        public async Task<IActionResult> SaveMeasure([FromBody] MeasureData data)
        {
            await authService.SaveMeasure(data);
            return Ok(new
            {
                message = "Thêm Thành Công",
                isSuccess = true
            });

        }
        [HttpPost("SaveMeasureBrandSize")]
        public async Task<IActionResult> SaveMeasureBrandSize([FromBody] DataBrandAnalysis resultAnalysis)
        {
            await authService.SaveBrandMeasure(resultAnalysis);
            return Ok(new
            {
                message = "Thêm Thành Công",
                isSuccess = true
            });
        }
    }
}
