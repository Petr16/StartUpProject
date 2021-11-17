import { Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { AppService } from './shared/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService],
  preserveWhitespaces: true 
})
export class AppComponent {
  title = 'web';

  constructor(/* service: AppService,
              private router: Router */
    ) {}

  /* ngOnInit(): void {
    console.log('app-root');
  } */

}

