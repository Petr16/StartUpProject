import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RequestsComponent }   from './requests/requests.component';
import { RequestsFormComponent }   from './requests/requests-form/requests-form.component';

const routes: Routes = [
  { path: 'api/requests', component: RequestsComponent},
  { path: 'api/requests/requests-form', component: RequestsFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //declarations: [ RequestsComponent, RequestsFormComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
