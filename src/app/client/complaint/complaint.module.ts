import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComplaintRoutingModule } from './complaint-routing.module';
import { ListComplaintsComponent } from './list-complaints/list-complaints.component';
import { CreateComplaintComponent } from './create-complaint/create-complaint.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    ListComplaintsComponent,
    CreateComplaintComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    ComplaintRoutingModule,
    SharedModule
  ]
})
export class ComplaintModule { }
