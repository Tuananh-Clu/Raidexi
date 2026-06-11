using Microsoft.AspNetCore.Http;
using MongoDB.Driver;
using Org.BouncyCastle.Asn1.Ocsp;
using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;
using Raidexi.Domain.Interfaces;
using Raidexi.Application.Interfaces;
using Raidexi.Infrastructure.Persistence;
using System.IdentityModel.Tokens.Jwt;
using System.Net;

namespace Raidexi.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPassWordHash _passWordHash;
        private readonly ITokenServices _tokenService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly AppDBContext appDBContext;
        private readonly MongoDbContext dbContext;
        private readonly IMailServicecs emailService;
        public AuthService(IUserRepository userRepository, IPassWordHash passWordHash, ITokenServices tokenService, IHttpContextAccessor httpContextAccessor, AppDBContext context, MongoDbContext dbContext, IMailServicecs mailService)
        {
            _userRepository = userRepository;
            _passWordHash = passWordHash;
            _tokenService = tokenService;
            _httpContextAccessor = httpContextAccessor;
            appDBContext = context;
            this.dbContext = dbContext;
            emailService = mailService;
        }

        public async Task<AuthResult> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null || !_passWordHash.VerifyPassword(user.HashPassword, password))
            {
                return new AuthResult
                {
                    IsSuccess = false,
                    ErrorMessage = "Invalid email or password.",
                    User = null
                };
            }
            var token = _tokenService.CreateToken(user);
            if (token == null)
            {
                return new AuthResult
                {
                    IsSuccess = false,
                    ErrorMessage = "Token generation failed.",
                    User = null
                };
            }
            _httpContextAccessor.HttpContext?.Response.Cookies.Append(user.Role == "Admin" ? "access_token_admin" : "access_token_client", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            });
            return new AuthResult
            {
                IsSuccess = true,
                ErrorMessage = null,
                User = user
            };

        }

        public async Task<AuthResult> RegisterAsync(string email, string password, string fullName, string typeRegister)
        {

            var existingUser = await _userRepository.GetByEmailAsync(email);
            if (existingUser != null)
            {
                return new AuthResult
                {
                    IsSuccess = false,
                    ErrorMessage = "User with this email already exists.",
                    User = null
                };
            }

            var hashedPassword = _passWordHash.HashPassword(password);

            var newUser = new User
            {
                Id = Guid.NewGuid().ToString(),
                Email = email,
                FullName = fullName,
                HashPassword = hashedPassword,
                CreatedAt = DateTime.UtcNow,
                ImageUrl = "",
                Role = typeRegister == "admin" ? "Admin" : "User"
            };
            await _userRepository.AddAsync(newUser);
            var token = _tokenService.CreateToken(newUser);
            _httpContextAccessor.HttpContext?.Response.Cookies.Append(newUser.Role == "Admin" ? "access_token_admin" : "access_token_client", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            });

            return new AuthResult
            {
                IsSuccess = true,
                ErrorMessage = null,
                User = newUser
            };
        }
        public async Task UpdateUserAsync(User user)
        {
            var existingUser = await _userRepository.GetByIdAsync(user.Id);
            if (existingUser == null)
            {
                throw new Exception("User not found.");
            }

            existingUser.Email = user.Email ?? existingUser.Email;
            existingUser.FullName = user.FullName ?? existingUser.FullName;
            existingUser.HashPassword = existingUser.HashPassword;
            existingUser.CreatedAt = user.CreatedAt != default ? user.CreatedAt : existingUser.CreatedAt;
            existingUser.Phone = user.Phone ?? existingUser.Phone;
            existingUser.Address = user.Address ?? existingUser.Address;
            existingUser.ImageUrl = user.ImageUrl ?? existingUser.ImageUrl;

            await _userRepository.UpdateAsync(existingUser);
        }
        public async Task<AuthResult> LoginWithFirebase(string token)
        {
            FirebaseAdmin.Auth.FirebaseToken decodeToken = await FirebaseAdmin.Auth.FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
            if (decodeToken == null)
            {
                return null;
            }
            var id = decodeToken.Uid;
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                user = new User
                {
                    Id = id,
                    Email = decodeToken.Claims["email"]?.ToString(),
                    FullName = decodeToken.Claims["name"]?.ToString(),
                    HashPassword = "",
                    CreatedAt = DateTime.UtcNow,
                    ImageUrl = decodeToken.Claims["picture"]?.ToString(),
                    Role = "User",
                    Phone = "",
                    Address = ""
                };
                await _userRepository.AddAsync(user);
                var tokens = _tokenService.CreateToken(user);
                _httpContextAccessor.HttpContext?.Response.Cookies.Append("access_token_client", tokens, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.UtcNow.AddDays(7)
                });

            }
            else
            {
                var tokens = _tokenService.CreateToken(user);
                _httpContextAccessor.HttpContext?.Response.Cookies.Append("access_token_admin", tokens, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.UtcNow.AddDays(7)
                });
            }
            return new AuthResult
            {
                IsSuccess = true,
                ErrorMessage = null,
                User = user
            };
        }

        public async Task<AuthResult> GetDataUser()
        {
            var token = _httpContextAccessor.HttpContext?.Request.Cookies["access_token_client"]
                ?? _httpContextAccessor.HttpContext?.Request.Cookies["access_token_admin"];
            if (token == null)
            {
                return null;
            }
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var userId = jwt.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            var user = await _userRepository.GetByIdAsync(userId);

            return new AuthResult
            {
                IsSuccess = true,
                ErrorMessage = null,
                User = user
            };
        }
        public async Task LogOut()
        {
            _httpContextAccessor.HttpContext?.Response.Cookies.Delete(
    "access_token_client",
    new CookieOptions
    {
        Secure = true,
        SameSite = SameSiteMode.None
    });
            _httpContextAccessor.HttpContext?.Response.Cookies.Delete(
     "access_token_admin",
     new CookieOptions
     {
         Secure = true,
         SameSite = SameSiteMode.None
     });
            await Task.CompletedTask;
        }
        public async Task SaveMeasure(MeasureData data)
        {
            var id = _httpContextAccessor.HttpContext?.Request.Cookies[$"access_token_client"];
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(id);
            var userId = jwt.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;

            var filter = Builders<SaveMeasureDataDto>.Filter.Eq(u => u.id, userId);
            var existingData = await dbContext.MeasureUserData.Find(filter).FirstOrDefaultAsync();
            if (existingData != null)
            {
                var update = Builders<SaveMeasureDataDto>.Update.Push(u => u.dataMeasure, new MeasureDataList
                {
                    dataMeasure = data,
                    LastUpdate = DateTime.Now
                });
                await dbContext.MeasureUserData.UpdateOneAsync(filter, update);
                return;
            }
            else
            {
                var datas = new SaveMeasureDataDto
                {
                    id = userId,
                    dataMeasure = new MeasureDataList[]
                    {
                        new MeasureDataList
                        {
                            dataMeasure = data,
                            LastUpdate = DateTime.Now
                        }
                    }
                };
                await dbContext.MeasureUserData.InsertOneAsync(datas);
                return;
            }
        }

        public async Task SaveCustomProfile(SaveMeasureCustomDataList data)
        {
            var id = _httpContextAccessor.HttpContext.Request.Cookies[$"access_token_client"];
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(id);
            var userId = jwt.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            var filter = Builders<SaveMeasureDataDto>.Filter.Eq(u => u.id, userId);
            var existingData = await dbContext.MeasureUserData.Find(filter).FirstOrDefaultAsync();
            if (existingData != null)
            {
                var update = Builders<SaveMeasureDataDto>.Update.Push(u => u.dataMeasureCustom, data);
                await dbContext.MeasureUserData.UpdateOneAsync(filter, update);
                return;
            }
            else
            {
                var datas = new SaveMeasureDataDto
                {
                    id = userId,
                    dataMeasureCustom = new SaveMeasureCustomDataList[]
                    {
                        data
                    }
                };
                await dbContext.MeasureUserData.InsertOneAsync(datas);
                return;
            }
        }

        public async Task<List<SaveMeasureCustomDataList>> GetCustomProfileForUser()
        {
            var jwtToken = _httpContextAccessor.HttpContext?.Request.Cookies[$"access_token_client"];
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(jwtToken);
            var userId = jwt.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            var filter = Builders<SaveMeasureDataDto>.Filter.Eq(u => u.id, userId);
            var data = await dbContext.MeasureUserData.Find(filter).FirstOrDefaultAsync();
            return data?.dataMeasureCustom.ToList() ?? new List<SaveMeasureCustomDataList>();
        }

        public async Task UpdateCustomProfile(SaveMeasureCustomDataList data)
        {
            var jwtToken = _httpContextAccessor.HttpContext?.Request.Cookies[$"access_token_client"];
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(jwtToken);
            var userId = jwt.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            var filter = Builders<SaveMeasureDataDto>.Filter.Eq(u => u.id, userId) & Builders<SaveMeasureDataDto>.Filter.ElemMatch(u => u.dataMeasureCustom, c => c.id == data.id);
            var update = Builders<SaveMeasureDataDto>.Update.Set(u => u.dataMeasureCustom[-1], data);
            await dbContext.MeasureUserData.UpdateOneAsync(filter, update);
        }

        async Task IAuthService.SaveMeaure(MeasureData data)
        {

            await SaveMeasure(data);
        }
        public async Task<SaveMeasureDataDto> GetMeasureForUser(string id)
        {
            var filter = Builders<SaveMeasureDataDto>.Filter.Eq(a => a.id, id);
            var data = await dbContext.MeasureUserData.Find(filter).FirstOrDefaultAsync();
            return data;
        }
        public async Task SaveBrandMeasure(DataBrand dataBrandAnalysis)
        {
            var jwtToken = _httpContextAccessor.HttpContext?.Request.Cookies[$"access_token_client"];

            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(jwtToken);
            Console.WriteLine("JWT Token: " + jwtToken);
            string? userId = jwt.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            await _userRepository.SaveBrandMeasure(userId, dataBrandAnalysis);
        }
        public async Task<DataBrandAnalysisResult> GetDataBrandAnalysisAsync()
        {
            var jwtToken = _httpContextAccessor.HttpContext?.Request.Cookies[$"access_token_client"];
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(jwtToken);
            string? userId = jwt.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            var dataBrandAnalysis = await _userRepository.GetBrandAnalysisByIdAsync(userId);
            return dataBrandAnalysis;
        }

        public async Task SendEmailResetPassword(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null)            {
                return;
            }
            var jwtService = new JwtSecurityTokenHandler();      
            var jwtToken = jwtService.CreateJwtSecurityToken(
                subject: new System.Security.Claims.ClaimsIdentity(new[]
                {
                    new System.Security.Claims.Claim("sub", user.Id)
                }),
                expires: DateTime.UtcNow.AddMinutes(15)
            );
            
            var tokenString = jwtService.WriteToken(jwtToken);
            user.ResetPasswordToken = tokenString;
            var resetLink = $"https://raidexi.vercel.app/reset-password?token={tokenString}";
            var mailTemplate=emailService.PasswordResetTemplate(user.FullName, resetLink);
            var sendEmailRequest = new SendMailRequest
            {
                To = user.Email,
                Subject = "Password Reset Request",
                Html = mailTemplate
            };
            await emailService.SendMailAsync(sendEmailRequest);
            await _userRepository.UpdateAsync(user);
            await Task.CompletedTask;
        }
        public async Task<AuthResult> ResetPassword(string email, string newPassword, string token)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null || user.ResetPasswordToken != token)
            {
                return new AuthResult
                {
                    IsSuccess = false,
                    ErrorMessage = "Invalid token or email.",
                    User = null
                };
            }
            user.HashPassword = _passWordHash.HashPassword(newPassword);
            user.ResetPasswordToken = null;
            await _userRepository.UpdateAsync(user);
            return new AuthResult
            {
                IsSuccess = true,
                ErrorMessage = null,
                User = user
            };
        }
    }
}
