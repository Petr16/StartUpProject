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
    public class CustomerService
    {
        private readonly IMapper _mapper;


        public CustomerService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            UnitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public IUnitOfWork UnitOfWork { get; }

        public ICustomerRepository CustomerRepo => UnitOfWork.CustomerRepo;

        public async Task<List<CustomerVM>> GetAll(CancellationToken cancellationToken = default)
        {
            List<Customer> customers = await CustomerRepo.GetAllToListAsync(cancellationToken);

            // Пример вызова хранимой функции
            //List<Request> requests1 = await UnitOfWork.RequestRepo.GetRequestsStoredFuncExample(cancellationToken);

            return _mapper.Map<List<CustomerVM>>(customers);
        }

        /// <summary>
        /// Новый метод для работы с devextreme
        /// </summary>
        /// <returns></returns>
        public IQueryable<CustomerVM> GetAll()
        {
            IQueryable<Customer> customers = CustomerRepo.GetAll();
            return _mapper.ProjectTo<CustomerVM>(customers);
        }


        public async Task<CustomerVM> Get(int id)
        {
            Customer customers = await CustomerRepo.GetByIdAsync(id);
            return _mapper.Map<CustomerVM>(customers);
        }

        public async Task<CustomerVM> Create(CustomerVM customersVM)
        {
            Customer newCustomer = _mapper.Map<Customer>(customersVM);
            await CustomerRepo.AddAsync(newCustomer);
            await UnitOfWork.SaveAsync();

            return _mapper.Map<CustomerVM>(newCustomer);
        }

        public async Task Update(CustomerVM customersVM)
        {
            Customer existingCustomer = await CustomerRepo.GetByIdAsync(customersVM.Id);
            if (existingCustomer == null)
                throw new ArgumentException($"Изменения не сохранены, т.к. заявка с ID={customersVM.Id} не найдена.");

            _mapper.Map(customersVM, existingCustomer);
            await UnitOfWork.SaveAsync();
        }

        public async Task Delete(int id)
        {
            bool foundAndRemoved = await CustomerRepo.RemoveByIdAsync(id);
            if (!foundAndRemoved)
                throw new ArgumentException($"Удаление не выполнено, т.к. заявка с ID={id} не найдена");

            await UnitOfWork.SaveAsync();
        }
    }
}

