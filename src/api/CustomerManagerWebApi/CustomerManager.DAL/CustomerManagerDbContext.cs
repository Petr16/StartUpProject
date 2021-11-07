using Microsoft.EntityFrameworkCore;
using CustomerManager.DAL.Entities;

namespace CustomerManager.DAL
{
    public class CustomerManagerDbContext : DbContext
    {
        public DbSet<Request> Requests { get; set; }

        public CustomerManagerDbContext(DbContextOptions<CustomerManagerDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSnakeCaseNamingConvention();
        }
    }
}
