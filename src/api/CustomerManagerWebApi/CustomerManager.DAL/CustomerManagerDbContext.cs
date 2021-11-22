using Microsoft.EntityFrameworkCore;
using CustomerManager.DAL.Entities;

namespace CustomerManager.DAL
{
    public class CustomerManagerDbContext : DbContext
    {
        public DbSet<Request> Requests { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<StatusRequest> StatusRequests { get; set; }

        public CustomerManagerDbContext(DbContextOptions<CustomerManagerDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Username=postgres;Password=123456;Database=CustomerManagerDB;Timeout=30;Enlist=false");
            optionsBuilder.UseSnakeCaseNamingConvention();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("CustomerManagerSchema");
        }
    }
}
