import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrimesRoutingModule } from './crimes-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    CrimesRoutingModule,
    SharedModule
  ]
})
export class CrimesModule { }
