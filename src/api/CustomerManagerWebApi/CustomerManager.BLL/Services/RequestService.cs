using AutoMapper;
using CustomerManager.BLL.ViewModels;
using CustomerManager.DAL;
using CustomerManager.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CustomerManager.BLL.Services
{
    public class RequestService
    {
        private readonly IMapper _mapper;


        public RequestService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            UnitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public IUnitOfWork UnitOfWork { get; }

        public async Task<List<RequestVM>> GetAll(CancellationToken cancellationToken = default)
        {
            List<Request> requests = await UnitOfWork.RequestRepo.GetAllToListAsync(cancellationToken);

            // Пример вызова хранимой функции
            //List<Request> requests1 = await UnitOfWork.RequestRepo.GetRequestsStoredFuncExample(cancellationToken);

            return _mapper.Map<List<RequestVM>>(requests);
        }

        public async Task<RequestVM> Get(int id)
        {
            Request request = await UnitOfWork.RequestRepo.GetByIdAsync(id);
            return _mapper.Map<RequestVM>(request);
        }

        public async Task<RequestVM> Create(RequestVM requestVM)
        {
            Request newRequest = _mapper.Map<Request>(requestVM);
            await UnitOfWork.RequestRepo.AddAsync(newRequest);
            await UnitOfWork.SaveAsync();

            return _mapper.Map<RequestVM>(newRequest);
        }

        public async Task Update(RequestVM requestVM)
        {
            Request existingRequest = await UnitOfWork.RequestRepo.GetByIdAsync(requestVM.Id);
            if (existingRequest == null)
                throw new ArgumentException($"Изменения не сохранены, т.к. заявка с ID={requestVM.Id} не найдена.");

            _mapper.Map(requestVM, existingRequest);
            await UnitOfWork.SaveAsync();
        }

        public async Task Delete(int id)
        {
            bool foundAndRemoved = await UnitOfWork.RequestRepo.RemoveByIdAsync(id);
            if (!foundAndRemoved)
                throw new ArgumentException($"Удаление не выполнено, т.к. заявка с ID={id} не найдена");

            await UnitOfWork.SaveAsync();
        }
    }
}
