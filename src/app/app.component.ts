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
          this.routeLinks.push(['admin/stations', 'Stations'])
          this.routeLinks.push(['admin/complaints', 'Complaints'])
          this.routeLinks.push(['admin/users', 'Website Users'])
          this.routeLinks.push(['admin/crimes', 'Crimes'])
          this.routeLinks.push(['admin/criminals', 'Criminals'])
          this.routeLinks.push(['admin/crimecategories', 'Crime Categories'])
        }
        if(this.userRole == Role.User){
          this.routeLinks.push(['client/complaints', 'Complaints'])
          this.routeLinks.push(['client/profile', 'Profile'])
        }
      }  
    });
  }
 
  Logout(){
    this.authService.Logout();
  }
}
