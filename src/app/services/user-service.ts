import { DataSource } from '@angular/cdk/collections';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceResult } from '../models/ServiceResult';
import { User, UserInfo, UserPassowrd } from '../models/user';
import { UserSearch } from '../models/SearchParams';
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from "jwt-decode";
import { PaginatedData } from '../models/PaginationData';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  userData:PaginatedData<User> = new PaginatedData<User>();
  refresh = new BehaviorSubject(0);
  dataSource:MatTableDataSource<User> = new MatTableDataSource<User>();
  
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private route: Router,
    private spinner : NgxSpinnerService,
    public jwtHelper: JwtHelperService
  ) 
  { 
  }

  getAllUsers(page: number, size: number, sortingColumn? : string, sortType? : string) {
    this.spinner.show();
    let params = new HttpParams();

    if(sortingColumn) params = params.append('SortingColumn', String(sortingColumn));
    if(sortType) params = params.append('SortType', String(sortType));
    params = params.append('PageNumber', String(page));
     params = params.append('PageSize', String(size));

    this.http.get<any>(environment.apiUrl + 'api/users',{params,  observe: 'response'}).subscribe((result) => {
      if (result.body.isSucceed == true) {
        let xPagination = '1';
        xPagination = result.headers.get('x-pagination') || 'a';
        let meta =JSON.parse(xPagination);
        this.userData.meta.currentPage = meta.CurrentPage;
        this.userData.meta.itemCount = meta.TotalCount;
        this.userData.meta.itemsPerPage = meta.PageSize;
        this.userData.meta.totalItems = meta.TotalCount;
        this.userData.meta.totalPages = meta.TotalPages;
        this.userData.items = result.body.data;
      } else {
        this.toastr.error('Could not pull');
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error('Something went wrong.');
    })
  }

  searchUsers(userSearch:UserSearch) {
    console.log(userSearch);
    this.http.post<any>(environment.apiUrl + 'api/Users/UserSearch', userSearch,{observe: 'response'}).subscribe((result) => {
      if (result.body.isSucceed == true) {
        let xPagination = result.headers.get('x-pagination') || 'a';
        let meta = JSON.parse(xPagination);
        this.userData.meta.currentPage = meta.CurrentPage;
        this.userData.meta.itemCount = meta.TotalCount;
        this.userData.meta.itemsPerPage = meta.PageSize;
        this.userData.meta.totalItems = meta.TotalCount;
        this.userData.meta.totalPages = meta.TotalPages;
        this.userData.items = result.body.data;
      } else {
        this.toastr.error('Could not pull');
      }
    }, err => {
      this.toastr.error('Something went wrong.');
    })
  };

  deleteUser(id:number) {
    this.spinner.show();
    this.http.delete<ServiceResult>(environment.apiUrl + 'api/Users/' + id).subscribe((result) => {
      if (result.isSucceed == true) {
        this.toastr.success('User Deleted Successfuly!!');
        this.userData.items = this.userData.items?.filter(user => user.UserId != id);
      } else {
        this.toastr.error('Could not delete the item');
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error('Something went wrong.');
    })
  }

  public getCurrentUser(){
    const tokenString = localStorage.getItem('token') || 'invalid token';
    let token:User = jwt_decode(tokenString);
    return token
  }


  updateUser(user: User) {
    this.spinner.show();
    this.http.put<ServiceResult>(environment.apiUrl + 'api/users/edit', user ).subscribe((result) => {
      if (result.isSucceed == true) {
        this.toastr.success('Save Info Successfuly');
        this.userData.items = this.userData.items?.filter(u => u.UserId != user.UserId);
        this.refresh.next(new Date().getTime());
      } else {
        this.toastr.error('Could not update the item');
      }
       this.spinner.hide();
    }, err => {
       this.spinner.hide();
      this.toastr.error('Something went wrong, Please login again.');
    })
  }

  changePassword(userPassowrd : UserPassowrd) {
    this.spinner.show();
    console.log(userPassowrd)
    this.http.post<ServiceResult>(environment.apiUrl + 'api/Users/ChangePassword' ,userPassowrd).subscribe((result) => {
      if (result.isSucceed == true) {
        this.toastr.success('Password Changed Successfuly!!');
        this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.route.navigate(['client/profile']));
      } else {
       
        this.toastr.error('Password Entered Does not Match Old Password');
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error('Something went wrong.');
    })
  }
}
