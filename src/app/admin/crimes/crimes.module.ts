import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrimesRoutingModule } from './crimes-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    CrimesRoutingModule,
    SharedModule
  ]
})
export class CrimesModule { }
