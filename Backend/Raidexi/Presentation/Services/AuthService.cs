using Microsoft.AspNetCore.Http;
using MongoDB.Driver;
using Org.BouncyCastle.Asn1.Ocsp;
using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;
using Raidexi.Domain.Interfaces;
using Raidexi.Infrastructure.Persistence;
using System.IdentityModel.Tokens.Jwt;
using System.Net;

namespace Raidexi.Presentation.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPassWordHash _passWordHash;
        private readonly ITokenServices _tokenService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly AppDBContext appDBContext;
        private readonly MongoDbContext dbContext;
        public AuthService(IUserRepository userRepository, IPassWordHash passWordHash, ITokenServices tokenService, IHttpContextAccessor httpContextAccessor, AppDBContext context, MongoDbContext dbContext)    
        {
            _userRepository = userRepository;
            _passWordHash = passWordHash;
            _tokenService = tokenService;
            _httpContextAccessor = httpContextAccessor;
            appDBContext = context;
            this.dbContext = dbContext;
        }

        public async Task<AuthResult> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null || !_passWordHash.VerifyPassword(user.HashPassword,password))
            {
                return new AuthResult
                {
                    IsSuccess = false,
                    ErrorMessage = "Invalid email or password.",
                    User = null
                };
            }
            var token = _tokenService.CreateToken(user);
            if (token == null) {
                return new AuthResult
                {
                    IsSuccess = false,
                    ErrorMessage = "Token generation failed.",
                    User = null
                };
            }
            _httpContextAccessor.HttpContext?.Response.Cookies.Append("access_token_client", token, new CookieOptions
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

        public async Task<AuthResult> RegisterAsync(string email, string password, string fullName)
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
                CreatedAt = DateTime.UtcNow
            };
            await _userRepository.AddAsync(newUser);
            var token = _tokenService.CreateToken(newUser);
            _httpContextAccessor.HttpContext?.Response.Cookies.Append("access_token_client", token, new CookieOptions
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
                    CreatedAt = DateTime.UtcNow
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
                var tokens=_tokenService.CreateToken(user);
                _httpContextAccessor.HttpContext?.Response.Cookies.Append("access_token_client", tokens, new CookieOptions
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
            var token = _httpContextAccessor.HttpContext?.Request.Cookies[$"access_token_client"];
            if(token==null)
            {
                return null;
            }
            var jwt =new JwtSecurityTokenHandler().ReadJwtToken(token);
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
            _httpContextAccessor.HttpContext?.Response.Cookies.Delete("access_token_client");
            await Task.CompletedTask;
        }
        public async Task SaveMeasure(MeasureData data)
        {
            var id = _httpContextAccessor.HttpContext?.Request.Cookies[$"access_token_client"];
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(id);
            var userId = jwt.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;

            var filter= Builders<SaveMeasureDataDto>.Filter.Eq(u => u.id, userId);
            var existingData = await dbContext.MeasureUserData.Find(filter).FirstOrDefaultAsync();
            if (existingData != null)
            {
                var update = Builders<SaveMeasureDataDto>.Update
                    .Set(u => u.dataMeasure, data)
                    .Set(u => u.LastUpdate, DateTime.Now);
                await dbContext.MeasureUserData.UpdateOneAsync(filter, update);
                return;
            }
            else
            {
                var datas = new SaveMeasureDataDto
                {
                    id = userId,
                    dataMeasure = data,
                    LastUpdate = DateTime.Now
                };
                await dbContext.MeasureUserData.InsertOneAsync(datas);
                return;
            }
        }
        async Task IAuthService.SaveMeaure(MeasureData data)
        {
            await SaveMeasure(data);
        }
        public async Task<MeasureData> GetMeasureForUser(string id)
        {
            var rar = _httpContextAccessor.HttpContext.Request.Cookies[$"access_token_client"];
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(rar);
            var filter = Builders<SaveMeasureDataDto>.Filter.Eq(a => a.id , id);
            var data=await dbContext.MeasureUserData.Find(filter).FirstOrDefaultAsync();
            return data.dataMeasure;

        }
       public async Task SaveBrandMeasure(DataBrandAnalysis dataBrandAnalysis)
        {
            var jwtToken = _httpContextAccessor.HttpContext?.Request.Cookies[$"access_token_client"];
            
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(jwtToken);
            Console.WriteLine("JWT Token: " + jwtToken);
            string? userId = jwt.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            await _userRepository.SaveBrandMeasure(userId,dataBrandAnalysis);
        }
    }
}
