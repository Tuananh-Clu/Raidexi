using Microsoft.EntityFrameworkCore;
using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;
using Raidexi.Domain.Interfaces;

namespace Raidexi.Infrastructure.Persistence
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDBContext _context;
        private readonly MongoDbContext _mongoContext;

        public UserRepository(AppDBContext context, MongoDbContext mongoContext)
        {
            _context = context;
            _mongoContext = mongoContext;
        }

        public async Task<User> GetByIdAsync(string id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task AddAsync(User user)
        {
            _context.Users.Add(user);           
            await _context.SaveChangesAsync();  
        }

        public async Task UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(string id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id.ToString());
            if (user == null) return;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return 
                await _context.Users.FirstOrDefaultAsync(u => u.FullName == username);
        }
        public async Task SaveBrandMeasure(string userId, ResultAnalysis resultAnalysis)
        {
            await _mongoContext.DataBrandAnalysis.InsertOneAsync(new DataBrandAnalysis
            {
                userId = userId,
                measure = resultAnalysis
            });
        }
    }
}
