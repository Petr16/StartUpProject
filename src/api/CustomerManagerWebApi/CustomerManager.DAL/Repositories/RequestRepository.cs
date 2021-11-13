﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CustomerManager.DAL.Entities;

namespace CustomerManager.DAL.Repositories
{
    public class RequestRepository : GenericRepository<Request>, IRequestRepository
    {

        public RequestRepository(CustomerManagerDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Request>> GetRequestsStoredFuncExample(CancellationToken cancellationToken)
        {
            var requests = new List<Request>();

            using (var transaction = Database.StartTransaction())
            using (var ds = await Database.CustomerManagerUtils.GetRequests(cancellationToken))
            {
                while (await ds.ReadAsync(cancellationToken))
                {
                    requests.Add(new Request
                    {
                        Id = ds.GetInt("id") ?? 0,
                        Name = ds.GetString("name")
                    });
                }
            }

            return requests;
        }
    }
}
