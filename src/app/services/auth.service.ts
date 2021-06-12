import jwt_decode from "jwt-decode";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(
    private router: Router,
  private httpClient: HttpClient
  ) { }


  login(username: string, password: string) {
    // api request login
    // show loader
    // this.spinner.show();
    const user: User = new User();
    user.name = username;
    user.password = password;
    console.log(username, password)
    // this.httpClient.post('localhost:8080/login', {
    //   username,
    //   password
    // }).subscribe((data: any) => {
    //   console.log(data);
    // })
    setTimeout(() => {
      // this.spinner.hide();
      // this.homeService.message = 'Welcome, you are logged in..'
      const response = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6IjIzNDIzNCIsImlhdCI6MTYyMzA5MDkyMiwiZXhwIjoxNjIzMDkyNzIyfQ.ORraZZhVik7YTMVCXqDQ--OvEJ3kcA5wfevX2Nz4FeM",
      };
      const data: any = jwt_decode(response.token);
      localStorage.setItem('user', JSON.stringify({ ...data, role: 'admin' }));
      localStorage.setItem('token', response.token)
      // Go to home page
      //this.router.navigate(['c/home']);
    }, 2000);
  }
}
