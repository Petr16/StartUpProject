using System.Threading.Tasks;
using CustomerManager.DAL.Repositories;

namespace CustomerManager.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly CustomerManagerDbContext _dbContext;

        public IRequestRepository RequestRepo { get; }

        public UnitOfWork(CustomerManagerDbContext dbContext)
        {
            _dbContext = dbContext;
            RequestRepo = new RequestRepository(_dbContext);
        }


        /// <summary>
        /// Saves all changes made in this context to the database.
        /// </summary>
        /// <returns>he task result contains the number of state entries written to the database</returns>
        public Task<int> SaveAsync()
        {
            return _dbContext.SaveChangesAsync();
        }
    }
}
