import jwt_decode from "jwt-decode";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { LoginDTO } from "../models/LoginDTO";
import { environment } from "src/environments/environment";
import { ServiceResult } from "../models/ServiceResult";
import { SharedModule } from "../shared/shared.module";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { RegisterDTO } from "../models/RegisterDTO";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(  
  private router: Router,
  private httpClient: HttpClient,
  private spinner: NgxSpinnerService,
  private toastr: ToastrService,
  public jwtHelper: JwtHelperService
  )
  {

  }


  Login(username: string, password: string) {
    // api request login
    // show loader
    const loginDTO: LoginDTO = new LoginDTO();
    loginDTO.Email = username;
    loginDTO.Password = password;
    this.spinner.show();
    this.httpClient.post<ServiceResult>(environment.apiUrl + 'api/users/signin', loginDTO).subscribe((result) => {
      if(result.status == '200'){
        localStorage.setItem('token', result.data);
      }
      else if(result.status == '401'){
        this.toastr.error('Please try again' ,'Invalid Email or Password');
        
      }
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
    })    
    // setTimeout(() => {
    //   // this.homeService.message = 'Welcome, you are logged in..'
      // const data: any = jwt_decode(result.data);
    //   // const data: any = jwt_decode(response.token);
    //   // Go to home page
    //   this.router.navigate(['c/home']);
    // }, 2000);
  }

  Register(registerDTO:RegisterDTO) {
    this.spinner.show();
    this.httpClient.post<ServiceResult>(environment.apiUrl + 'api/users/register', registerDTO).subscribe((result) => {
      if(result.status == '201'){
        localStorage.setItem('token', result.data);
      }
      else if(result.status == '401'){
        this.toastr.error('Please try again' ,'Invalid Email or Password');
      }
      this.spinner.hide();
    },err=>{
      this.toastr.error('Something went wrong');
      this.spinner.hide();
    })
  }
  public isAuthenticated(): boolean {
    // Check whether the token is expired and return
    // true or false
    const token = localStorage.getItem('token') || undefined;
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getRole(){
    const tokenString = localStorage.getItem('token') || 'invalid token';
    let token:any = jwt_decode(tokenString);
    if(token.Role) return token.Role;
    else return null;
  }
}


