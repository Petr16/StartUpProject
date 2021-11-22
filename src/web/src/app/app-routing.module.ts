import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RequestsComponent }   from './requests/requests.component';
import { RequestsFormComponent }   from './requests/requests-form/requests-form.component';
import { CustomersComponent }   from './dict/customers/customers.component';
import { StatusRequestsComponent }   from './dict/status-requests/status-requests.component';



const routes: Routes = [
  
  //{ path: '**', redirectTo: 'api/not-found', pathMatch: 'full'},//если любой маршрут
  { path: '', redirectTo: 'api/about', pathMatch: 'full'},//если любой маршрут
  { path: 'api/home', component: HomeComponent},
  { path: 'api/about', component: AboutComponent},
  { path: 'api/not-found', component: NotFoundComponent},
  { path: 'api/requests', component: RequestsComponent},
  { path: 'api/requests/requests-form', component: RequestsFormComponent},
  { path: 'api/customers', component: CustomersComponent},
  { path: 'api/status-requests', component: StatusRequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
