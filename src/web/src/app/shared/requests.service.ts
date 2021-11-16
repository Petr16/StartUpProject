import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Requests } from './requests.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(
    private http: HttpClient
    //@Inject('http://localhost:5000/api/requests') private apiUrl: string
    ) { }

  readonly baseURL = 'http://localhost:5000/api'
  readonly requestsURL = 'http://localhost:5000/api/requests'
  //readonly baseURL = 'http://localhost:58007/api/requests'
  formData: Requests = new Requests();
  list: Requests[];

  refreshList(): Observable<any[]> {
      console.log(this.baseURL+'/requests');
    return this.http.get<any>(this.baseURL+'/requests')
  }

  getRequestsList():Observable<any[]>{
    console.log(this.baseURL+'/requests');
    return this.http.get<any>(this.baseURL+'/requests');
  }
}
