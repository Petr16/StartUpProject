import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../shared/requests.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(public service: RequestsService) { }
  RequestsList: any[];

  ngOnInit(): void {
    this.refreshRequestsList();
  }

  refreshRequestsList(){
    this.service.getRequestsList().subscribe(data=>{
      this.RequestsList=data;
    })
  }

}
