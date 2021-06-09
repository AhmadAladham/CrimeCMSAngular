import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationsRoutingModule } from './stations-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateStationComponent } from './create-station/create-station.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateStationComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    StationsRoutingModule,
    SharedModule
  ]
})
export class StationsModule { }
