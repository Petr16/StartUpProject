import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/shared/requests.service';

@Component({
  selector: 'app-requests-form',
  templateUrl: './requests-form.component.html',
  styleUrls: ['./requests-form.component.css']
})
export class RequestsFormComponent implements OnInit {

  constructor(public service:RequestsService) { }

  ngOnInit(): void {
  }

}
