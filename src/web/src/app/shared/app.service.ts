import { Injectable } from '@angular/core';

export class List {
  id: number;

  text: string;

  icon: string;

  sourse: string;
}

const navigation: List[] = [
  { id: 1, text: 'Home', icon: 'product', sourse: '<a href="https://github.com/Petr16/StartUpProject">Репозиторий на GitHub</a>' },
  { id: 2, text: 'Requests', icon: 'money', sourse: '<a href="https://github.com/Petr16/StartUpProject">Репозиторий на GitHub</a>'  },
  { id: 3, text: 'Customers', icon: 'group', sourse: '<a href="https://github.com/Petr16/StartUpProject">Репозиторий на GitHub</a>'  },
  { id: 4, text: 'Contacts', icon: 'card', sourse: '<a href="https://github.com/Petr16/StartUpProject">Репозиторий на GitHub</a>'  },
  { id: 5, text: 'Reports', icon: 'chart', sourse: '<a href="https://github.com/Petr16/StartUpProject">Репозиторий на GitHub</a>'  },
];

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  getNavigationList(): List[] {
    return navigation;
  }

/*   getContent(): string {
    return text;
  } */
}
