import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './home/home.component';
import { RequestsComponent }   from './requests/requests.component';
import { RequestsFormComponent }   from './requests/requests-form/requests-form.component';

const routes: Routes = [
  
  { path: '**', component: HomeComponent},//если любой маршрут
  { path: 'home', component: HomeComponent},
  { path: 'requests', component: RequestsComponent},
  { path: 'requests/requests-form', component: RequestsFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //declarations: [ RequestsComponent, RequestsFormComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
