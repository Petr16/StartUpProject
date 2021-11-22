using CustomerManager.DAL.Entities;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CustomerManager.DAL.Repositories
{
    public interface ICustomerRepository : IGenericRepository<Customer>
    {
    }
}
