using AutoMapper;
using CustomerManager.BLL.ViewModels;
using CustomerManager.DAL.Entities;


namespace CustomerManager.BLL.Infrastructure
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //CreateMap<Request, RequestVM>();
            //CreateMap<RequestVM, Request>();
            CreateMap<Request, RequestVM>().ReverseMap();

            CreateMap<Customer, CustomerVM>().ReverseMap();

            CreateMap<StatusRequest, StatusRequestVM>().ReverseMap();
        }
    }
}
