import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'stations',
    loadChildren:() => import('./stations/stations.module').then(m=>m.StationsModule) 
  },
  {
    path: 'crimecategories',
    loadChildren:() => import('./crime-categories/crime-categories.module').then(m=>m.CrimeCategoriesModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
