using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;

namespace Raidexi.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsernameAsync(string username);
        Task<User> GetByIdAsync(string id);             
        Task<User> GetByEmailAsync(string email);    
        Task AddAsync(User user);                    
        Task UpdateAsync(User user);                 
        Task DeleteAsync(string id);

        Task SaveBrandMeasure(string? userId, ResultAnalysis resultAnalysis);
    }
}
