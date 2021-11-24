import { Component, Input, OnInit } from '@angular/core';
import { Requests } from 'src/app/shared/requests.model';
import { RequestsService } from 'src/app/shared/requests.service';
import {
  DxSelectBoxModule,
  DxTextAreaModule,
  DxDateBoxModule,
  DxFormModule,
} from 'devextreme-angular';


@Component({
  selector: 'app-requests-form',
  templateUrl: './requests-form.component.html',
  styleUrls: ['./requests-form.component.css']
})
export class RequestsFormComponent implements OnInit {

  positions: string[];

  states: string[];

  requestForm: Requests;
  /* requestFormDTO: RequestsFormDTO */
  urlImage: any;

  constructor(public service:RequestsService) { 
    this.requestForm = this.service.getData();
    
    this.urlImage = 'http://localhost:5000/Resources/Images/'+ this.requestForm.fileUrl;

    console.log("requestForm: URL"+this.requestForm.fileUrl);
  
  }


  ngOnInit(): void {
    
  }

}
