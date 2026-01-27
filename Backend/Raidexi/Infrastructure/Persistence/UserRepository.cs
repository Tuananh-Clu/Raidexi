using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
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
        public async Task SaveBrandMeasure(string userId, DataBrand dataBrandAnalysis)
        {
            var filter = Builders<DataBrandAnalysisResult>.Filter.Eq("userId", userId);
            var existingData = await _mongoContext.DataBrandAnalysis.Find(filter).FirstOrDefaultAsync();
            if (existingData != null)
            {
                var update = Builders<DataBrandAnalysisResult>.Update.Set("DataBrandAnalysis",   dataBrandAnalysis );
                await _mongoContext.DataBrandAnalysis.UpdateOneAsync(filter, update);
            }
            else
            {
                var newData = new DataBrandAnalysisResult
                {
                    userId = userId,
                    DataBrandAnalysis = new List<DataBrand> { dataBrandAnalysis }
                };
                await _mongoContext.DataBrandAnalysis.InsertOneAsync(newData);
            }
        }

        public async Task<DataBrandAnalysisResult> GetBrandAnalysisByIdAsync(string id)
        {
            var filter = Builders<DataBrandAnalysisResult>.Filter.Eq("userId", id);
            var result = await _mongoContext.DataBrandAnalysis.Find(filter).FirstOrDefaultAsync();
            return result;
        }

    }
}
