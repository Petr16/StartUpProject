import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Requests } from './requests.model'
import { Customers } from './customers.model'
import { StatusRequests } from './status-requests.model'
import { catchError, Observable } from 'rxjs';
import { CUSTOMER_API_URL } from '../app-injection-customer';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(
    private http: HttpClient, //для выполнения запросов к сервису
    @Inject(CUSTOMER_API_URL) private customerUrl: string, //путь к сервису
    private router: Router
    ) { }

    //Для переброски в другие компоненты, использую, как хранилище
    private serviceDataRequests: Requests;

    setData(data: Requests){
      this.serviceDataRequests = data;
    }
  
    getData(){
      let temp = this.serviceDataRequests;
      this.clearData();
      return temp;
    }
  
    clearData(){
      this.serviceDataRequests = {
        id: 0,
        name: '',
        customerId: 0,
        startDate: new Date,
        targetExecutionDate: new Date,
        statusRequestId: 0,
        modifyDate: new Date,
        phone: '' ,
        comment: ''

        /*customerName: {
          id: 0,
          customername: ''
        },
        statusRequest: {
          id: 0,
          statusrequestname: ''
        }  */
      };
    }






  readonly baseURL = 'http://localhost:5000/api'
  readonly requestsURL = 'http://localhost:5000/api/requests'
  //readonly baseURL = 'http://localhost:58007/api/requests'
  formData: Requests = new Requests();
  list: Requests[];


  //////////Requests
  refreshList(): Observable<any[]> {
      console.log(this.customerUrl+'/api/requests');
    return this.http.get<any>(this.customerUrl+'/api/requests')
  }

  getRequestsList():Observable<Requests[]>{
    console.log(this.customerUrl+'/api/requests');
    return this.http.get<Requests[]>(this.customerUrl+'/api/requests');
  }

  createRequest(newRequest: Requests): Observable<Requests>{
    console.log(this.customerUrl+'/api/requests  POST '+ newRequest);
    console.log(newRequest);
    return this.http.post<Requests>(this.customerUrl+'/api/requests/new', newRequest);
  }

  deleteteRequest(deleteKeyRequest: number): Observable<number>{
    //const body = {id: newRequest.id, name: newRequest.name};
    console.log(this.customerUrl+`/api/requests/${deleteKeyRequest}  Delete`+ deleteKeyRequest);
    return this.http.delete<number>(`${this.customerUrl}/api/requests/${deleteKeyRequest}`);
  }

  editRequest(editRequest: Requests): Observable<Requests>{
    //const body = {id: newRequest.id, name: newRequest.name};
    console.log(this.customerUrl+`/api/requests/${editRequest}  Delete`+ editRequest);
    return this.http.put<Requests>(`${this.customerUrl}/api/requests/${editRequest.id}`, editRequest);
  }

}
