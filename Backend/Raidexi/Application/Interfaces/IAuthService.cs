using Microsoft.AspNetCore.Mvc;
using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;

namespace Raidexi.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResult> RegisterAsync(string email, string password, string fullName);
        Task<AuthResult> LoginAsync(string email, string password);
        Task<AuthResult> GetDataUser();
        Task<AuthResult> LoginWithFirebase(string token);
        Task LogOut();
        Task SaveMeaure(MeasureData data);
        Task<MeasureData> GetMeasureForUser(string id);
        Task SaveBrandMeasure( DataBrand resultAnalysis);
        Task<DataBrandAnalysisResult> GetDataBrandAnalysisAsync();

    }
    public class AuthResult
    {
        public bool IsSuccess { get; set; }
        public string? ErrorMessage { get; set; }
        public User? User { get; set; }
    }
}
