using AutoMapper;
using CustomerManager.BLL.Services;
using CustomerManager.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace CustomerManager.BLL.Infrastructure
{
    public static class StartupExtensions
    {
		public static void AddAutoMapper(this IServiceCollection services)
		{
			services.AddAutoMapper(typeof(MappingProfile));
		}

		public static void AddCustomerManagerDbContext(this IServiceCollection services, string connectionString)
		{
			//services.AddDbContext<CustomerManagerDbContext>(options => options.UseNpgsql(connectionString));
			services.AddDbContext<CustomerManagerDbContext>();
		}

		public static void AddCustomerManagerBusinessServices(this IServiceCollection services)
		{
			services.AddScoped<IUnitOfWork, UnitOfWork>();
			services.AddScoped<RequestService>();
		}
	}
}
