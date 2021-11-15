using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using CustomerManager.BLL.Infrastructure;

namespace CustomerManager.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper();
            services.AddCustomerManagerDbContext(Configuration.GetConnectionString("CustomerManagerDB"));
            services.AddCustomerManagerBusinessServices();
            services.AddControllers();
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //app.UseCors(builder => builder.
            //    WithOrigins("http://localhost:53653")
            //    //.WithMethods("GET", "POST", "PUT", "DELETE"));
            //    .AllowAnyMethod()
            //    .AllowAnyHeader());
            //app.UseCors(builder => builder
            //    .SetIsOriginAllowed(url => url.StartsWith("http://localhost:")) // Томская подсеть
            //    .WithOrigins("http://localhost:53653") // Временно для отладки. УДАЛИТЬ!
            //    .AllowAnyMethod()
            //    .AllowAnyHeader());
            //app.UseCors(builder => builder
            //    .SetIsOriginAllowed(url => url.StartsWith("http://localhost"))
            //    .WithOrigins("http://localhost:53653")
            //    .WithMethods("GET", "POST", "PUT", "PATCH", "DELETE")
            //    .AllowAnyHeader());

            app.UseCors(builder => builder
                .WithOrigins("http://localhost:58007")
                //.WithMethods("GET", "POST", "PUT", "DELETE"));
                //.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();


            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
