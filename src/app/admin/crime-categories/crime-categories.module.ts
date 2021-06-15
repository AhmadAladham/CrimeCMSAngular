import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrimeCategoriesRoutingModule } from './crime-categories-routing.module';
import { CategorieslistComponent } from './categorieslist/categorieslist.component';
import { IndexComponent } from './index/index.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CategorieslistComponent,
    IndexComponent,
    CreateCategoryComponent
  ],
  imports: [
    CommonModule,
    CrimeCategoriesRoutingModule,
    SharedModule
  ]
})
export class CrimeCategoriesModule { }
