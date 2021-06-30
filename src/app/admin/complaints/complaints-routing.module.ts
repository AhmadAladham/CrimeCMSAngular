import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComplaintsComponent } from './list-complaints/list-complaints.component';

const routes: Routes = [
  {
    path:'',
    component:ListComplaintsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintsRoutingModule { }
