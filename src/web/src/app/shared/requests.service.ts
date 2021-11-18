import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Requests } from './requests.model'
import { Observable } from 'rxjs';
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

  readonly baseURL = 'http://localhost:5000/api'
  readonly requestsURL = 'http://localhost:5000/api/requests'
  //readonly baseURL = 'http://localhost:58007/api/requests'
  formData: Requests = new Requests();
  list: Requests[];

  refreshList(): Observable<any[]> {
      console.log(this.customerUrl+'/api/requests');
    return this.http.get<any>(this.customerUrl+'/api/requests')
  }

  getRequestsList():Observable<Requests[]>{
    console.log(this.customerUrl+'/api/requests');
    return this.http.get<Requests[]>(this.customerUrl+'/api/requests');
  }
}
