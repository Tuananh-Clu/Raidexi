namespace Raidexi.Domain.Interfaces
{
    public interface IPassWordHash
    {
        string HashPassword(string password);
        bool VerifyPassword(string hashedPassword, string providedPassword);
    }
}
