import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'account',
    loadChildren:()=>import("./account/account.module").then(
      (m)=>m.AccountModule
    )
  },
  {
    path:'admin',
    loadChildren:()=>import("./admin/admin.module").then(
      (m)=>m.AdminModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
