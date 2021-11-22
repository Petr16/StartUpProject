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
    /* this.requestFormDTO = {
      НомерЗаявки: this.requestForm.id,
      НазваниеЗаявки: this.requestForm.name
    } */
    this.urlImage = 'https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/f941b0c3-76cd-420b-8f84-8203f62954ee/220x330';
    
    console.log("requestForm: "+this.requestForm);
    console.log(this.requestForm);
  }


  ngOnInit(): void {
    
  }

}
