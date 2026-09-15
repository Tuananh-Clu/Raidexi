using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using Raidexi.Application.Dtos;
using Raidexi.Domain.Entities;
using Raidexi.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Raidexi.Infrastructure.Persistence
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDBContext _context;
        private readonly MongoDbContext _mongoContext;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(
            AppDBContext context, 
            MongoDbContext mongoContext,
            ILogger<UserRepository> logger)
        {
            _context = context;
            _mongoContext = mongoContext;
            _logger = logger;
        }

        public async Task<User> GetByIdAsync(string id)
        {
            try
            {
                return await _context.Users
                    .AsNoTracking() 
                    .FirstOrDefaultAsync(u => u.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting user by ID: {ex.Message}");
                throw;
            }
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            try
            {
                return await _context.Users
                    .AsNoTracking()
                    .FirstOrDefaultAsync(u => u.Email == email);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting user by email: {ex.Message}");
                throw;
            }
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            try
            {
                return await _context.Users
                    .AsNoTracking() 
                    .FirstOrDefaultAsync(u => u.FullName == username);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting user by username: {ex.Message}");
                throw;
            }
        }

        public async Task AddAsync(User user)
        {
            try
            {
                if (user == null)
                    throw new ArgumentNullException(nameof(user));

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"User {user.Id} added successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error adding user: {ex.Message}");
                throw;
            }
        }

        public async Task UpdateAsync(User user)
        {
            try
            {
                if (user == null)
                    throw new ArgumentNullException(nameof(user));

                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"User {user.Id} updated successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating user: {ex.Message}");
                throw;
            }
        }

        public async Task DeleteAsync(string id)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(id))
                    throw new ArgumentException("User ID cannot be null or empty", nameof(id));

                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Id == id); 
                
                if (user == null)
                {
                    _logger.LogWarning($"User {id} not found for deletion");
                    return;
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"User {id} deleted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting user: {ex.Message}");
                throw;
            }
        }

        public async Task SaveBrandMeasure(string userId, DataBrand dataBrandAnalysis)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userId))
                    throw new ArgumentException("User ID cannot be null or empty", nameof(userId));

                if (dataBrandAnalysis == null)
                    throw new ArgumentNullException(nameof(dataBrandAnalysis));

                var filter = Builders<DataBrandAnalysisResult>.Filter
                    .Eq("userId", userId);

                var update = Builders<DataBrandAnalysisResult>.Update
                    .Push("dataBrandAnalysisList", dataBrandAnalysis); 
                var options = new UpdateOptions { IsUpsert = true };  
                
                var result = await _mongoContext.DataBrandAnalysis
                    .UpdateOneAsync(filter, update, options);

                if (result.UpsertedId != null)
                {
                    _logger.LogInformation($"New brand analysis created for user {userId}");
                }
                else
                {
                    _logger.LogInformation($"Brand analysis updated for user {userId}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error saving brand measure: {ex.Message}");
                throw;
            }
        }

        public async Task<DataBrandAnalysisResult> GetBrandAnalysisByIdAsync(string id)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(id))
                    throw new ArgumentException("User ID cannot be null or empty", nameof(id));

                var filter = Builders<DataBrandAnalysisResult>.Filter
                    .Eq("userId", id);

                var result = await _mongoContext.DataBrandAnalysis
                    .Find(filter)
                    .FirstOrDefaultAsync();

                if (result == null)
                {
                    _logger.LogWarning($"No brand analysis found for user {id}");
                    return null;
                }

                _logger.LogInformation($"Brand analysis retrieved for user {id}");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting brand analysis: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> AddMultipleAsync(IEnumerable<User> users)
        {
            try
            {
                if (users == null || !users.Any())
                    throw new ArgumentException("Users list cannot be null or empty", nameof(users));

                await _context.Users.AddRangeAsync(users);
                int affectedRows = await _context.SaveChangesAsync();
                
                _logger.LogInformation($"{affectedRows} users added successfully");
                return affectedRows > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error adding multiple users: {ex.Message}");
                throw;
            }
        }

        public async Task<List<User>> GetUsersAsync(int pageNumber, int pageSize)
        {
            try
            {
                return await _context.Users
                    .AsNoTracking() 
                    .OrderBy(u => u.Id)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting users: {ex.Message}");
                throw;
            }
        }
    }
}