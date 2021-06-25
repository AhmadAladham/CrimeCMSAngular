import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ServiceResult } from '../models/ServiceResult';
import { UserRole } from '../models/UserRole';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  userRoles : UserRole[] = []
  refresh = new BehaviorSubject(0)
  constructor(
    private http:HttpClient,
    private toastr: ToastrService,
    private route: Router,
    private spinner:NgxSpinnerService
  ) { }

  getAllUserRoles() {
    return this.http.get<ServiceResult>('https://localhost:5001/api/UserRoles', {
    });
  }
}


