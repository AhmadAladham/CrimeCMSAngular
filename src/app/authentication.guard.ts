import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from './enum/role';
import jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(private route: Router, private toastr: ToastrService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   // return = true ? the user can go the path/route
    // return = false ? the user can't go to the path/route
    const tokenString = localStorage.getItem('token') || 'invalid token';
    console.log(tokenString);
    let token:any = jwt_decode(tokenString); // decode token    
    let expireDate = token.exp; // get token expiration dateTime
    console.log(token); // show decoded token object in console
    
    if (token) {
      var currentTime = new Date().getTime() / 1000;  
      if(!(currentTime>expireDate)){
        if (state.url.indexOf('Admin') >= 0) {
            if (token.role == Role.Admin) {
              return true;
            } else {
              this.toastr.warning('This page is only for admin')
              return false;
            }
        }
        return true;
      }
      else{
        this.toastr.warning('Please login Again');
        this.route.navigate(['account']);
        return false;
      }
    }
     else {
      this.route.navigate(['account']);
      this.toastr.warning('Un-Authorized')
      return false;
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
