using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CustomerManager.DAL.Repositories.Interfaces;

namespace CustomerManager.DAL
{
    public interface IUnitOfWork
    {
        IRequestRepository RequestRepo { get; }

        Task<int> SaveAsync();
    }
}
