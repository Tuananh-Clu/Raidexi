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
                    HashPassword = "",
                    ImageUrl = result.User.ImageUrl,
                    Phone = result.User.Phone,
                    Address = result.User.Address,
                    Role = result.User.Role
                }
            });
        }
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var result = await authService.RegisterAsync(registerDto.email, registerDto.password, registerDto.fullName, registerDto.typeLogin ?? "user");
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
            if (result == null)
            {
                return Unauthorized(new { message = "Error Fetch Data" });
            }
            var dataMeasure = await authService.GetMeasureForUser(result.User.Id);
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
                    Phone = result.User.Phone,
                    Address = result.User.Address,
                    ImageUrl = result.User.ImageUrl,
                    HashPassword = "",
                    Role = result.User.Role
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
                    HashPassword = "",
                    Phone = result.User.Phone,
                    Address = result.User.Address,
                    ImageUrl = result.User.ImageUrl,
                    Role = result.User.Role
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
        public async Task<IActionResult> SaveMeasureBrandSize([FromBody] DataBrand resultAnalysis)
        {
            await authService.SaveBrandMeasure(resultAnalysis);
            return Ok(new
            {
                message = "Thêm Thành Công",
                isSuccess = true
            });
        }
        [HttpGet("GetBrandSizeMeasure")]
        public async Task<IActionResult> GetBrandSizeMeasure()
        {
            var result = await authService.GetDataBrandAnalysisAsync();
            return Ok(new
            {
                message = "Lấy Thành Công",
                isSuccess = true,
                data = result
            });
        }
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] User user)
        {
            await authService.UpdateUserAsync(user);
            return Ok(new
            {
                message = "Cập Nhật Thành Công",
                isSuccess = true
            });
        }
        [HttpGet("GetCustomProfileForUser")]
        public async Task<IActionResult> GetCustomProfileForUser()
        {
            var result = await authService.GetCustomProfileForUser();
            return Ok(new
            {
                message = "Lấy Thành Công",
                isSuccess = true,
                data = result
            });
        }
        [HttpPost("SaveCustomProfileForUser")]
        public async Task<IActionResult> SaveCustomProfileForUser([FromBody] SaveMeasureCustomDataList data)
        {
            await authService.SaveCustomProfile(data);
            return Ok(new
            {
                message = "Thêm Thành Công",
                isSuccess = true
            });
        }
        [HttpPut("UpdateCustomProfile")]
        public async Task<IActionResult> UpdateCustomProfile([FromBody] SaveMeasureCustomDataList data)
        {
            await authService.UpdateCustomProfile(data);
            return Ok(new
            {
                message = "Cập Nhật Thành Công",
                isSuccess = true
            });
        }
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] string email)
        {
            await authService.SendEmailResetPassword(email);
            return Ok(new { message = "Password reset successfully." });
        }
    }
}
