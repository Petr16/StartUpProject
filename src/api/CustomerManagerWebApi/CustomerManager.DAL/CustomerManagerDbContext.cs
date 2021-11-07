using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using CustomerManager.DAL.Entities;

namespace CustomerManager.DAL
{
    public class CustomerManagerDbContext : DbContext
    {
        public DbSet<Request> Requests { get; set; }
    }
}
