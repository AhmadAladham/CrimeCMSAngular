import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TupleType } from 'typescript';
import { Role } from './enum/role';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   *
   */
  private readonly adminRoutes:Array<[string,string]> = [
                                          ['admin/stations', 'Stations'],
                                          ['admin/complaints', 'Complaints'],
                                          ['admin/users', 'Website Users'],
                                          ['admin/crimes', 'Crimes'],
                                          ['admin/criminals', 'Criminals'],
                                          ['admin/crimecategories', 'Crime Categories']];
  private readonly userRoutes:Array<[string,string]> = [
                                        ['client/complaints', 'Complaints']];
  userRole:string ='';
  title = 'CrimeCMS';
  isAuthenticated:boolean = false;
  routeLinks:Array<[string,string]> = new Array<[string,string]>();
  constructor(public authService:AuthService, private router:Router) {
    this.isAuthenticated = authService.isAuthenticated();
    this.authService.authRefresh.subscribe(()=>{
      this.isAuthenticated = authService.isAuthenticated();
      if(this.isAuthenticated){
        this.userRole = authService.getRole();
        if(this.userRole == Role.Admin){
          this.routeLinks = this.adminRoutes;
        }
        if(this.userRole == Role.User){
          this.routeLinks = this.userRoutes;
        }
      }  
    });
  }
 
  Logout(){
    this.authService.Logout();
  }
}
