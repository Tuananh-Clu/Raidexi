using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using MongoDB.Driver;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using Raidexi.Domain.Interfaces;
using Raidexi.Infrastructure.Persistence;
using Raidexi.Infrastructure.Security;
using Raidexi.Presentation.Services;
using System;
using System.Xml.Linq;
DotNetEnv.Env.Load();
var builder = WebApplication.CreateBuilder(args);



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
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Raidexi API",
        Version = "v1"
    });
});
var firebaseJson =Environment.GetEnvironmentVariable("FIREBASE_CREDENTIALS_JSON") ?? "";
firebaseJson = firebaseJson.Replace("\\n", "\n");
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
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("https://localhost:3000")
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
app.UseCors("AllowAll");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
