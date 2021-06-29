import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from './enum/role';
import jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(
    private route: Router,
    private toastr: ToastrService,
    private authService:AuthService 
     ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return = true ? the user can go the path/route
    // return = false ? the user can't go to the path/route
    const expectedRole = route.data.expectedRole;
    if (this.authService.isAuthenticated()) {
      let userRole = this.authService.getRole();
        if (userRole == expectedRole || userRole == Role.Admin) {
              return true;
            } else {
              this.toastr.warning('You do not have access to this page')
              return false;
            }
        }
     else {
      this.route.navigate(['account']);
      this.toastr.warning('Please login')
      return false;
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
