import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CUSTOMER_API_URL } from '../app-injection-customer';
import { Customers } from './customers.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    private http: HttpClient, //для выполнения запросов к сервису
    @Inject(CUSTOMER_API_URL) private customerUrl: string, //путь к сервису
    private router: Router
  ) { }


  readonly baseURL = 'http://localhost:5000/api'
  readonly requestsURL = 'http://localhost:5000/api/requests'
  //readonly baseURL = 'http://localhost:58007/api/requests'
  formData: Customers = new Customers();
  list: Customers[];




    ////////////Customers
  refreshListCustomer(): Observable<any[]> {
    console.log(this.customerUrl+'/api/customers');
  return this.http.get<any>(this.customerUrl+'/api/customers')
  }

  getCustomersList():Observable<Customers[]>{
  console.log(this.customerUrl+'/api/customers');
  return this.http.get<Customers[]>(this.customerUrl+'/api/customers');
  }

  createCustomer(newCustomer: Customers): Observable<Customers>{
  console.log(this.customerUrl+'/api/customers  POST '+ newCustomer);
  console.log(newCustomer);
  return this.http.post<Customers>(this.customerUrl+'/api/customers/new', newCustomer);
  }

  deleteteCustomer(deleteKeyCustomer: number): Observable<number>{
  //const body = {id: newRequest.id, name: newRequest.name};
  console.log(this.customerUrl+`/api/customers/${deleteKeyCustomer}  Delete`+ deleteKeyCustomer);
  return this.http.delete<number>(`${this.customerUrl}/api/customers/${deleteKeyCustomer}`);
  }

  editCustomer(editCustomer: Customers): Observable<Customers>{
  //const body = {id: newRequest.id, name: newRequest.name};
  console.log(this.customerUrl+`/api/customers/${editCustomer}  Delete`+ editCustomer);
  return this.http.put<Customers>(`${this.customerUrl}/api/customers/${editCustomer.id}`, editCustomer);
  }
}
