import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrimesRoutingModule } from './crimes-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
// import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    ViewComponent
    // IndexComponent
  ],
  imports: [
    CommonModule,
    CrimesRoutingModule,
    SharedModule
  ]
})
export class CrimesModule { }
