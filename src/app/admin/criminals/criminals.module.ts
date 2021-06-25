import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriminalsRoutingModule } from './criminals-routing.module';
import { CriminalCardComponent } from './criminal-card/criminal-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    CriminalCardComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    CriminalsRoutingModule,
    SharedModule
  ]
})
export class CriminalsModule { }
