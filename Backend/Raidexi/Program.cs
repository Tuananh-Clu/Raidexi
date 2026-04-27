using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using MongoDB.Driver;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using Raidexi.Application.Dtos;
using Raidexi.Domain.Interfaces;
using Raidexi.Infrastructure.Persistence;
using Raidexi.Infrastructure.Security;
using Raidexi.Infrastructure.Services;
using Raidexi.Application.Interfaces;
using System;
using System.Text;
using System.Text.Json;
using System.Threading.RateLimiting;
using System.Xml.Linq;

var envPath = Path.Combine(Directory.GetCurrentDirectory(), ".env");
DotNetEnv.Env.Load(envPath);

var builder = WebApplication.CreateBuilder(args);

// ─── Rate Limiter ──────────────────────────────────────────────────────────────
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.OnRejected = (context, _) =>
    {
        var http = context.HttpContext;
        var ip   = http.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        var path = http.Request.Path;
        return ValueTask.CompletedTask;
    };
    options.AddPolicy("anon05", ctx =>
    {
        var userid= ctx.User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;
        if (!string.IsNullOrEmpty(userid))
        {
            return RateLimitPartition.GetFixedWindowLimiter(userid,
                _ => new FixedWindowRateLimiterOptions
                {
                    PermitLimit = 5,
                    Window      = TimeSpan.FromHours(24)
                });
        }   
        var ip = ctx.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        return RateLimitPartition.GetFixedWindowLimiter(ip,
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window      = TimeSpan.FromHours(24)
            });
    });
});

// ─── Core services ─────────────────────────────────────────────────────────────
builder.Services.AddMemoryCache();
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDBContext>(options =>
    options.UseNpgsql(Environment.GetEnvironmentVariable("DEFAULT_CONNECTION")));

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPassWordHash, PasswordHasher>();
builder.Services.AddScoped<ITokenServices, TokenGenerate>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IMailServicecs, MailService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<ISizeMapping, MappingSizeRepo>();
builder.Services.AddScoped<Raidexi.Presentation.Services.CacheServices.CacheAnalysisDataService>();
builder.Services.AddScoped<AnalyisService>();
builder.Services.AddScoped<IAnalysisDataService, AnalyisService>();
builder.Services.AddScoped<GeminiService>();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title   = "Raidexi API",
        Version = "v1"
    });
});
var privateKey = Environment.GetEnvironmentVariable("FIREBASE_PRIVATE_KEY")
    ?.Replace("\\n", "\n");

var credentialJson = $@"{{
  ""type"": ""service_account"",
  ""project_id"": ""{Environment.GetEnvironmentVariable("FIREBASE_PROJECT_ID")}"",
  ""private_key_id"": ""{Environment.GetEnvironmentVariable("FIREBASE_PRIVATE_KEY_ID")}"",
  ""private_key"": ""{privateKey}"",
  ""client_email"": ""{Environment.GetEnvironmentVariable("FIREBASE_CLIENT_EMAIL")}"",
  ""client_id"": ""{Environment.GetEnvironmentVariable("FIREBASE_CLIENT_ID")}""
}}";
FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromJson(credentialJson)
});
// ─── CORS ──────────────────────────────────────────────────────────────────────
var corsOrigins = (Environment.GetEnvironmentVariable("CORS_ORIGINS")
        ?? "http://localhost:3000,https://localhost:3000")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowConfiguredOrigins", policy =>
        policy.WithOrigins(corsOrigins)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials());
});

// ─── MongoDB ───────────────────────────────────────────────────────────────────
var mongoUrl          = Environment.GetEnvironmentVariable("MongoUrl");
var mongoDatabaseName = Environment.GetEnvironmentVariable("Databasename");

builder.Services.AddSingleton<IMongoClient>(_ => new MongoClient(mongoUrl));
builder.Services.AddSingleton<IMongoDatabase>(sp =>
    sp.GetRequiredService<IMongoClient>().GetDatabase(mongoDatabaseName));
builder.Services.AddSingleton<MongoDbContext>();

// ─── Build & migrate ───────────────────────────────────────────────────────────
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDBContext>();
    db.Database.Migrate();
}

// ─── Middleware ────────────────────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Raidexi API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseRateLimiter();
app.UseCors("AllowConfiguredOrigins");

var enableHttpsRedirection =
    bool.TryParse(Environment.GetEnvironmentVariable("ENABLE_HTTPS_REDIRECTION"), out var useHttps)
    && useHttps;

if (enableHttpsRedirection)
    app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();
app.Run();
