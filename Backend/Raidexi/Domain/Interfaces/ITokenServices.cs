using Raidexi.Domain.Entities;

namespace Raidexi.Domain.Interfaces
{
    public interface ITokenServices
    {
        string CreateToken(User user);
    }
}
