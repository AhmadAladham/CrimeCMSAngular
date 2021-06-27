import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriminalsRoutingModule } from './criminals-routing.module';
import { CriminalCardComponent } from './criminal-card/criminal-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexComponent } from './index/index.component';
import { ViewCriminalComponent } from './view-criminal/view-criminal.component';
import { CreateCriminalComponent } from './create-criminal/create-criminal.component';


@NgModule({
  declarations: [
    CriminalCardComponent,
    IndexComponent,
    ViewCriminalComponent,
    CreateCriminalComponent
  ],
  imports: [
    CommonModule,
    CriminalsRoutingModule,
    SharedModule
  ]
})
export class CriminalsModule { }
