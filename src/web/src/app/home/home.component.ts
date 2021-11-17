import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(/* public service: AppService */) { }

/*   homeData: any []; */

  ngOnInit(): void {
    //this.refreshHome();
  }

  /* refreshHome(){
    console.log('refreshHome()');
    this.service.getHome().subscribe(data=>{  //без подписки не будет перехода к контроллеру
      this.homeData=data;
  })
} */

}
