using System;
using System.Collections.Generic;
using System.Text;
using CustomerManager.DAL.Repositories.Interfaces;

namespace CustomerManager.DAL
{
    public interface IUnitOfWork
    {
        IRequestRepository RequestRepo { get; }
    }
}
