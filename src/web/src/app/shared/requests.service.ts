import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Requests } from './requests.model'

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:62885/api/requests'
  formData: Requests = new Requests();
}
