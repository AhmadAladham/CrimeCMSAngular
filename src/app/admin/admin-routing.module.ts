import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'stations',
    loadChildren:() => import('./stations/stations.module').then(m=>m.StationsModule) 
  },
  {
    path: 'crimecategories',
    loadChildren:() => import('./crime-categories/crime-categories.module').then(m=>m.CrimeCategoriesModule)
  },
  {
    path: 'users',
    component:UserComponent
  },
  {
    path: 'crimes',
    loadChildren:() => import('./crimes/crimes.module').then(m=>m.CrimesModule)
  },
  {
    path: 'criminals',
    loadChildren:() => import('./criminals/criminals.module').then(m=>m.CriminalsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
