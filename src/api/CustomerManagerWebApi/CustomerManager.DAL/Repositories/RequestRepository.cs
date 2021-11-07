using System;
using System.Collections.Generic;
using System.Text;
using CustomerManager.DAL.Entities;
using CustomerManager.DAL.Repositories.Interfaces;

namespace CustomerManager.DAL.Repositories
{
    public class RequestRepository : GenericRepository<Request>, IRequestRepository
    {
        // pass UoW?
        public RequestRepository(CustomerManagerDbContext dbContext) : base(dbContext)
        {
        }

        // try parsing some old fashioned dataset
        // make sure connection is established
    }
}
