import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceResult } from '../models/ServiceResult';
import { User } from '../models/user';


export interface UserData {
  
  items: User[] | undefined;
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links : {
    first: string;
    previous: string;
    next: string;
    last: string;
  } 
};

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  refresh = new BehaviorSubject(0);
 
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private route: Router
  ) 
  { 
  }

  getAllUsers(page: number, size: number, sortingColum? : string, sortType? : string) {
    // this.spinner.show();
    let params = new HttpParams();

    params = params.append('SortingColumn', String(sortingColum));
    params = params.append('SortType', String(sortType));
    params = params.append('PageNumber', String(page));
    params = params.append('PageSize', String(size));

    return this.http.get<ServiceResult>(environment.apiUrl + 'api/Users', {params} )
  };
}
