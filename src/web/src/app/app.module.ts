import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestsComponent } from './requests/requests.component';
import { RequestsFormComponent } from './requests/requests-form/requests-form.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxDrawerModule, DxListModule, DxNumberBoxModule, DxPopoverModule, DxPopupModule, DxRadioGroupModule, DxTemplateModule, DxTextAreaModule, DxTextBoxModule, DxToolbarModule, DxValidatorModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CUSTOMER_API_URL } from './app-injection-customer';
import { environment } from 'src/environments/environment';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    RequestsComponent,
    RequestsFormComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    DxDrawerModule,
    DxListModule,
    DxRadioGroupModule,
    DxToolbarModule,
    DxDataGridModule,
    DxButtonModule,
    DxTemplateModule,
    DxPopupModule,
    DxPopoverModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxValidatorModule,
    DxDateBoxModule,
    DxTextAreaModule
  ],
  providers: [{
    provide: CUSTOMER_API_URL,
    useValue: environment.customerApi
  }],
  bootstrap: [AppComponent/* ,HeaderComponent,FooterComponent */] //Набор компонентов, которые загружаются при начальной загрузке этого модуля.
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);