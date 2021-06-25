import { DataSource } from '@angular/cdk/collections';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceResult } from '../models/ServiceResult';
import { User } from '../models/user';
import { UserData } from '../models/PaginationData';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  userData:UserData = new UserData();
  refresh = new BehaviorSubject(0);
  dataSource:MatTableDataSource<User> = new MatTableDataSource<User>();
  
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private route: Router
  ) 
  { 
  }

  getAllUsers(page: number, size: number, sortingColumn? : string, sortType? : string) {
    // this.spinner.show();
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
        //this.refresh.next(new Date().getTime());
      } else {
        this.toastr.error('Could not pull');
      }
    }, err => {
      this.toastr.error('Something went wrong.');
    })
  }
}
