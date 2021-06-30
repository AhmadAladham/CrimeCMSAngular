import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintsRoutingModule } from './complaints-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComplaintsComponent } from './list-complaints/list-complaints.component';
import { ViewComplaintComponent } from './view-complaint/view-complaint.component';


@NgModule({
  declarations: [
    ListComplaintsComponent,
    ViewComplaintComponent
  ],
  imports: [
    CommonModule,
    ComplaintsRoutingModule,
    SharedModule
  ]
})
export class ComplaintsModule { }
