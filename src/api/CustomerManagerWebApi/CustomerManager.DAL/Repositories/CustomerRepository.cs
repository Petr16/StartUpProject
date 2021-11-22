using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CustomerManager.DAL.Entities;

namespace CustomerManager.DAL.Repositories
{
    public class CustomerRepository : GenericRepository<Customer>, ICustomerRepository
    {
        public CustomerRepository(CustomerManagerDbContext dbContext) : base(dbContext)
        {
        }
    }
}
