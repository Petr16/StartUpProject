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
    /// <summary>
    /// Created by "Add>Controller>API controller with read/write actions".
    /// </summary>
    [Route("api/requests")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private readonly RequestService _requestService;

        public RequestsController(RequestService requestService)
        {
            _requestService = requestService;
        }

        //// GET: api/Requests
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<RequestVM>>> Get(CancellationToken canselationToken)
        //{
        //    return await _requestService.GetAll(canselationToken);
        //}

        [HttpGet]
        public async Task<ActionResult<LoadResult>> Get(DataSourceLoadOptions loadOptions, CancellationToken cancellationToken)
        {
            return await DataSourceLoader.LoadAsync(_requestService.GetAll(), loadOptions, cancellationToken);
        }

        // GET: api/Requests/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<ActionResult<RequestVM>> Get(int id)
        {
            RequestVM request = await _requestService.Get(id);
            if (request == null)
                return NotFound();

            return request;
        }

        // POST: api/Requests
        [HttpPost]
        public async Task<ActionResult<RequestVM>> Post(RequestVM request)
        {
            RequestVM createdRequest = await _requestService.Create(request);
            return CreatedAtAction(nameof(Get), new { id = createdRequest.Id }, createdRequest);
        }

        // PUT: api/Requests/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, RequestVM request)
        {
            if (id != request.Id)
                return BadRequest();

            try
            {
                await _requestService.Update(request);
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
                await _requestService.Delete(id);
                return NoContent();
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
        }
    }
}
