import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CUSTOMER_API_URL } from '../app-injection-customer';

export class List {
  id: number;

  text: string;

  icon: string;

  sourceUrl: string;
}

const navigation: List[] = [
  { id: 1, text: 'Home', icon: 'product', sourceUrl: '/api/home' },
  { id: 2, text: 'Requests', icon: 'money', sourceUrl: '/api/requests'  },
  { id: 3, text: 'Customers', icon: 'group', sourceUrl: '/api/home'  },
  { id: 4, text: 'Contacts', icon: 'card', sourceUrl: '/api/home'  },
  { id: 5, text: 'Reports', icon: 'chart', sourceUrl: '/api/home'  },
  { id: 7, text: 'About', icon: 'chart', sourceUrl: '/api/about'  },
];

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient, //для выполнения запросов к сервису
    @Inject(CUSTOMER_API_URL) private customerUrl: string, //путь к сервису
    private router: Router
  ) { }

  getNavigationList(): List[] {
    return navigation;
  }

/*   getContent(): string {
    return text;
  } */

  getHome():Observable<any[]>{
    console.log(this.customerUrl+'/api/home');
    return this.http.get<any>(this.customerUrl+'/api/home');
  }
}