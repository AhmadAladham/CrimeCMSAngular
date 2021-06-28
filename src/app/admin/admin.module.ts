import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user/user.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
   
  
    UserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class AdminModule { }
