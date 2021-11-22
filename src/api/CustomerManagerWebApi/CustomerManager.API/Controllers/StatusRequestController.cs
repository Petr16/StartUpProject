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
    [Route("api/status-requests")]
    [ApiController]
    public class StatusRequestController : ControllerBase
    {
        private readonly StatusRequestService _statusRequestService;

        public StatusRequestController(StatusRequestService statusRequestService)
        {
            _statusRequestService = statusRequestService;
        }





        [HttpGet]
        public async Task<ActionResult<LoadResult>> Get(DataSourceLoadOptions loadOptions, CancellationToken cancellationToken)
        {
            return await DataSourceLoader.LoadAsync(_statusRequestService.GetAll(), loadOptions, cancellationToken);
        }

        // GET: api/Customers/5
        [HttpGet("{id}", Name = "GetStatusRequest")]
        public async Task<ActionResult<StatusRequestVM>> Get(int id)
        {
            StatusRequestVM statusRequest = await _statusRequestService.Get(id);
            if (statusRequest == null)
                return NotFound();

            return statusRequest;
        }

        // POST: api/Customers
        [HttpPost("New")]
        public async Task<ActionResult<StatusRequestVM>> Post(StatusRequestVM statusRequest)
        {
            StatusRequestVM createdStatusRequest = await _statusRequestService.Create(statusRequest);
            return CreatedAtAction(nameof(Get), new { id = createdStatusRequest.Id }, createdStatusRequest);
        }

        // PUT: api/Customers/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, StatusRequestVM statusRequest)
        {
            if (id != statusRequest.Id)
                return BadRequest();

            try
            {
                await _statusRequestService.Update(statusRequest);
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
                await _statusRequestService.Delete(id);
                return NoContent();
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
        }
    }
}
