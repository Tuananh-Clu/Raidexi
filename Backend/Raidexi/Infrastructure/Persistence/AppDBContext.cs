using Microsoft.EntityFrameworkCore;
using Raidexi.Domain.Entities;

namespace Raidexi.Infrastructure.Persistence
{
    public class AppDBContext(DbContextOptions<AppDBContext> options) : DbContext(options)
    {
       public DbSet<User> Users { get; set; }
    }
}
