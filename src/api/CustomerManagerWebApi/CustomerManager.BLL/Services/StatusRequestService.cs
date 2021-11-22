using AutoMapper;
using CustomerManager.BLL.ViewModels;
using CustomerManager.DAL;
using CustomerManager.DAL.Entities;
using CustomerManager.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CustomerManager.BLL.Services
{
    public class StatusRequestService
    {
        private readonly IMapper _mapper;


        public StatusRequestService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            UnitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public IUnitOfWork UnitOfWork { get; }

        public IStatusRequestRepository StatusRequestRepo => UnitOfWork.StatusRequestRepo;

        public async Task<List<StatusRequestVM>> GetAll(CancellationToken cancellationToken = default)
        {
            List<StatusRequest> statusRequests = await StatusRequestRepo.GetAllToListAsync(cancellationToken);

            // Пример вызова хранимой функции
            //List<Request> requests1 = await UnitOfWork.RequestRepo.GetRequestsStoredFuncExample(cancellationToken);

            return _mapper.Map<List<StatusRequestVM>>(statusRequests);
        }

        /// <summary>
        /// Новый метод для работы с devextreme
        /// </summary>
        /// <returns></returns>
        public IQueryable<StatusRequestVM> GetAll()
        {
            IQueryable<StatusRequest> statusRequests = StatusRequestRepo.GetAll();
            return _mapper.ProjectTo<StatusRequestVM>(statusRequests);
        }


        public async Task<StatusRequestVM> Get(int id)
        {
            StatusRequest statusRequests = await StatusRequestRepo.GetByIdAsync(id);
            return _mapper.Map<StatusRequestVM>(statusRequests);
        }

        public async Task<StatusRequestVM> Create(StatusRequestVM statusRequestVM)
        {
            StatusRequest newStatusRequest = _mapper.Map<StatusRequest>(statusRequestVM);
            await StatusRequestRepo.AddAsync(newStatusRequest);
            await UnitOfWork.SaveAsync();

            return _mapper.Map<StatusRequestVM>(newStatusRequest);
        }

        public async Task Update(StatusRequestVM statusRequestVM)
        {
            StatusRequest existingstatusRequest = await StatusRequestRepo.GetByIdAsync(statusRequestVM.Id);
            if (existingstatusRequest == null)
                throw new ArgumentException($"Изменения не сохранены, т.к. заявка с ID={statusRequestVM.Id} не найдена.");

            _mapper.Map(statusRequestVM, existingstatusRequest);
            await UnitOfWork.SaveAsync();
        }

        public async Task Delete(int id)
        {
            bool foundAndRemoved = await StatusRequestRepo.RemoveByIdAsync(id);
            if (!foundAndRemoved)
                throw new ArgumentException($"Удаление не выполнено, т.к. заявка с ID={id} не найдена");

            await UnitOfWork.SaveAsync();
        }
    }
}
