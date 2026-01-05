
using BCrypt.Net;
using Raidexi.Domain.Interfaces;

namespace Raidexi.Infrastructure.Security
{
    public class PasswordHasher : IPassWordHash
    {
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
           
        }

        public bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword);
        }
    }
}
