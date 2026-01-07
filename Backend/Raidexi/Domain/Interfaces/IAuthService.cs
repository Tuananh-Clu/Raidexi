using Raidexi.Domain.Entities;

namespace Raidexi.Domain.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResult> RegisterAsync(string email, string password, string fullName);
        Task<AuthResult> LoginAsync(string email, string password);
        Task<AuthResult> GetDataUser();
        Task<AuthResult> LoginWithFirebase(string token);
        Task LogOut();

    }
    public class AuthResult
    {
        public bool IsSuccess { get; set; }
        public string? ErrorMessage { get; set; }
        public User? User { get; set; }
    }
}
