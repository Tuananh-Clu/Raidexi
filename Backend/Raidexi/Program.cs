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
if (File.Exists(envPath))
{
    DotNetEnv.Env.Load(envPath);
}

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.OnRejected = (context, i) =>
    {
        var http = context.HttpContext;
        var ip = http.Connection.RemoteIpAddress.ToString();
        var path = http.Request.Path;

        Console.WriteLine($"[RATE-LIMIT] IP={ip} | PATH={path}");

        return ValueTask.CompletedTask;
    };
    options.AddPolicy("anon05", ctx =>
    {
        var ip = ctx.Connection.RemoteIpAddress.ToString();
        return RateLimitPartition.GetFixedWindowLimiter
        (
            ip,
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromHours(24)
            });
    });
});
builder.Services.AddMemoryCache();
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDBContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPassWordHash, PasswordHasher>();
builder.Services.AddScoped<ITokenServices, TokenGenerate>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<ISizeMapping,MappingSizeRepo>();
builder.Services.AddScoped<Raidexi.Presentation.Services.CacheServices.CacheAnalysisDataService>();
builder.Services.AddScoped<AnalyisService>();
builder.Services.AddScoped<IAnalysisDataService, AnalyisService>();
builder.Services.AddScoped< GeminiService>();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Raidexi API",
        Version = "v1"
    });
});

static string ResolveGoogleCredentialJson()
{
    var credentialSources = new[]
    {
        Environment.GetEnvironmentVariable("FIREBASE_CREDENTIALS_JSON"),
        Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS")
    };

    foreach (var source in credentialSources)
    {
        var resolved = NormalizeGoogleCredentialSource(source);
        if (!string.IsNullOrWhiteSpace(resolved))
        {
            return resolved;
        }
    }

    throw new Exception("Missing Firebase credential configuration. Set FIREBASE_CREDENTIALS_JSON or GOOGLE_APPLICATION_CREDENTIALS.");
}

static string? NormalizeGoogleCredentialSource(string? source)
{
    if (string.IsNullOrWhiteSpace(source))
    {
        return null;
    }

    var value = source.Trim();

    if (File.Exists(value))
    {
        value = File.ReadAllText(value);
    }

    if (value.StartsWith("\"") && value.EndsWith("\""))
    {
        try
        {
            value = JsonSerializer.Deserialize<string>(value) ?? value;
        }
        catch (JsonException)
        {
        }
    }

    if (!value.TrimStart().StartsWith("{"))
    {
        try
        {
            var decoded = Encoding.UTF8.GetString(Convert.FromBase64String(value));
            if (decoded.TrimStart().StartsWith("{"))
            {
                value = decoded;
            }
        }
        catch (FormatException)
        {
        }
    }

    value = value
        .Replace("\\r\\n", "\n")
        .Replace("\\n", "\n");

    if (!value.TrimStart().StartsWith("{") && value.Contains("\\\""))
    {
        value = value.Replace("\\\"", "\"");
    }

    return value.Trim();
}


var firebaseJson = ResolveGoogleCredentialJson();
if (string.IsNullOrWhiteSpace(firebaseJson))
{
    throw new Exception("Missing FIREBASE_CREDENTIALS_JSON environment variable");
}

if (FirebaseApp.DefaultInstance == null)
{
    if (string.IsNullOrWhiteSpace(firebaseJson))
    {
        throw new Exception("Missing FIREBASE_CREDENTIALS_JSON environment variable");
    }

    FirebaseApp.Create(new AppOptions
    {
        Credential = GoogleCredential
            .FromJson(firebaseJson)
            .CreateScoped("https://www.googleapis.com/auth/cloud-platform")
    });
}
var corsOrigins = (Environment.GetEnvironmentVariable("CORS_ORIGINS") ?? "http://localhost:3000,https://localhost:3000")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowConfiguredOrigins", policy =>
    {
        policy.WithOrigins(corsOrigins)
              .AllowAnyMethod()
              .AllowAnyHeader()
        .AllowCredentials();
    });
});
var mongourl = Environment.GetEnvironmentVariable("MongoUrl");
var mongoDataBaseName = Environment.GetEnvironmentVariable("Databasename");
builder.Services.AddSingleton<IMongoClient>(sp =>
    {
        return new MongoClient(mongourl);
});
builder.Services.AddSingleton<IMongoDatabase>(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase(mongoDataBaseName);
});
builder.Services.AddSingleton<MongoDbContext>();
var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDBContext>();
    db.Database.Migrate();
}


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

var enableHttpsRedirection = bool.TryParse(Environment.GetEnvironmentVariable("ENABLE_HTTPS_REDIRECTION"), out var useHttpsRedirection)
    && useHttpsRedirection;
if (enableHttpsRedirection)
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
