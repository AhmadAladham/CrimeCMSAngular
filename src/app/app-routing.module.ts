import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { Role } from './enum/role';


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
    canActivate: [AuthenticationGuard],
    data: { 
      expectedRole: Role.Admin
    } 
  },
  {
    path: 'client',
    loadChildren: () => import("./client/client.module").then(
      (m) => m.ClientModule
    ),
    canActivate: [AuthenticationGuard],
    data: { 
      expectedRole: Role.User
    } 
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
