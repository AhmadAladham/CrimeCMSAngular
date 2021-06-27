import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintRoutingModule } from './complaint-routing.module';
import { ListComplaintsComponent } from './list-complaints/list-complaints.component';


@NgModule({
  declarations: [
    ListComplaintsComponent
  ],
  imports: [
    CommonModule,
    ComplaintRoutingModule
  ]
})
export class ComplaintModule { }
