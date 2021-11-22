import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CUSTOMER_API_URL } from '../app-injection-customer';
import { StatusRequests } from './status-requests.model';

@Injectable({
  providedIn: 'root'
})
export class StatusRequestsService {

  constructor(
    private http: HttpClient, //для выполнения запросов к сервису
    @Inject(CUSTOMER_API_URL) private customerUrl: string, //путь к сервису
    private router: Router
  ) { }

  readonly baseURL = 'http://localhost:5000/api'
  readonly requestsURL = 'http://localhost:5000/api/requests'
  //readonly baseURL = 'http://localhost:58007/api/requests'
  formData: StatusRequests = new StatusRequests();
  list: StatusRequests[];

    ////////////Customers
    refreshListStatusRequest(): Observable<any[]> {
      console.log(this.customerUrl+'/api/status-requests');
    return this.http.get<any>(this.customerUrl+'/api/status-requests')
    }
  
    getStatusRequestsList():Observable<StatusRequests[]>{
    console.log(this.customerUrl+'/api/status-requests');
    return this.http.get<StatusRequests[]>(this.customerUrl+'/api/status-requests');
    }
  
    createStatusRequest(newStatusRequest: StatusRequests): Observable<StatusRequests>{
    console.log(this.customerUrl+'/api/status-requests  POST '+ newStatusRequest);
    console.log(newStatusRequest);
    return this.http.post<StatusRequests>(this.customerUrl+'/api/status-requests/new', newStatusRequest);
    }
  
    deleteteStatusRequest(deleteKeyStatusRequest: number): Observable<number>{
    //const body = {id: newRequest.id, name: newRequest.name};
    console.log(this.customerUrl+`/api/status-requests/${deleteKeyStatusRequest}  Delete`+ deleteKeyStatusRequest);
    return this.http.delete<number>(`${this.customerUrl}/api/status-requests/${deleteKeyStatusRequest}`);
    }
  
    editStatusRequest(editStatusRequest: StatusRequests): Observable<StatusRequests>{
    //const body = {id: newRequest.id, name: newRequest.name};
    console.log(this.customerUrl+`/api/status-requests/${editStatusRequest}  Delete`+ editStatusRequest);
    return this.http.put<StatusRequests>(`${this.customerUrl}/api/status-requests/${editStatusRequest.id}`, editStatusRequest);
    }
}
