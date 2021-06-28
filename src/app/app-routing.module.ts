import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';


const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import("./account/account.module").then(
      (m) => m.AccountModule
    )
  },
  {
    path: 'admin',
    loadChildren: () => import("./admin/admin.module").then(
      (m) => m.AdminModule
    ),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'client',
    loadChildren: () => import("./client/client.module").then(
      (m) => m.ClientModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
