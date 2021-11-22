using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CustomerManager.DAL.Repositories;

namespace CustomerManager.DAL
{
    public interface IUnitOfWork
    {
        IRequestRepository RequestRepo { get; }
        ICustomerRepository CustomerRepo { get; }
        IStatusRequestRepository StatusRequestRepo { get; }

        Task<int> SaveAsync();
    }
}
