using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CustomerManager.BLL.Services;
using CustomerManager.DAL;
using CustomerManager.BLL.ViewModels;
using System.Threading;
using DevExtreme.AspNet.Data.ResponseModel;
using DevExtreme.AspNet.Mvc;
using DevExtreme.AspNet.Data;

namespace CustomerManager.API.Controllers
{
    [Route("api/customers")]
    [ApiController]
    public class CustomerController : ControllerBase
    {


        private readonly CustomerService _customerService;

        public CustomerController(CustomerService customerService)
        {
            _customerService = customerService;
        }





        [HttpGet]
        public async Task<ActionResult<LoadResult>> Get(DataSourceLoadOptions loadOptions, CancellationToken cancellationToken)
        {
            return await DataSourceLoader.LoadAsync(_customerService.GetAll(), loadOptions, cancellationToken);
        }

        // GET: api/Customers/5
        [HttpGet("{id}", Name = "GetCustomer")]
        public async Task<ActionResult<CustomerVM>> Get(int id)
        {
            CustomerVM customer = await _customerService.Get(id);
            if (customer == null)
                return NotFound();

            return customer;
        }

        // POST: api/Customers
        [HttpPost("New")]
        public async Task<ActionResult<CustomerVM>> Post(CustomerVM customer)
        {
            CustomerVM createdCustomer = await _customerService.Create(customer);
            return CreatedAtAction(nameof(Get), new { id = createdCustomer.Id }, createdCustomer);
        }

        // PUT: api/Customers/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, CustomerVM customer)
        {
            if (id != customer.Id)
                return BadRequest();

            try
            {
                await _customerService.Update(customer);
                return NoContent();
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _customerService.Delete(id);
                return NoContent();
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
        }
    }
}
