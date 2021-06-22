import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ServiceResult } from '../models/ServiceResult';

@Injectable({
  providedIn: 'root'
})
export class CriminalsService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  getCriminalByNationalNumber(nationalNumber:string) {
    return this.http.get(environment.apiUrl + 'api/Criminals/NationalNumber/' + nationalNumber,{});
}
}