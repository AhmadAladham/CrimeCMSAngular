import { HttpClient, HttpParams } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Injectable, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Crime } from '../models/Crimes';
import { Criminal } from '../models/Criminal';
import { CriminalsData } from '../models/PaginationData';
import { CriminalSearch } from '../models/SearchParams';
import { ServiceResult } from '../models/ServiceResult';

@Injectable({
  providedIn: 'root'
})
export class CriminalsService {
  criminalsData: CriminalsData = new CriminalsData();
  refresh = new BehaviorSubject(0);
  crimesRefresh = new BehaviorSubject(0);
  criminal: Criminal = new Criminal();
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  getCriminal(criminalId: number) {
    this.spinner.show();
    this.http.get<ServiceResult>('https://localhost:5001/api/Criminals/' + criminalId).subscribe((result) => {
      if (result.isSucceed == true) {
        this.criminal = result.data;
        this.crimesRefresh.next(new Date().getTime());
      } else {
        this.toastr.error('Could not delete the item');
      }
      this.spinner.hide();
    }, err => {
      this.toastr.error('Something went wrong.');
      this.spinner.hide();
    })
  }

  getCriminalByNationalNumber(nationalNumber: string) {
    return this.http.get(environment.apiUrl + 'api/Criminals/NationalNumber/' + nationalNumber, {});
  }

  getAllCriminals(page: number, size: number, sortingColumn?: string, sortType?: string) {
    this.spinner.show();
    let params = new HttpParams();

    if (sortingColumn) params = params.append('SortingColumn', String(sortingColumn));
    if (sortType) params = params.append('SortType', String(sortType));
    params = params.append('PageNumber', String(page));
    params = params.append('PageSize', String(size));

    this.http.get<any>(environment.apiUrl + 'api/Criminals', { params, observe: 'response' }).subscribe((result) => {
      if (result.body.isSucceed == true) {
        let xPagination = result.headers.get('x-pagination') || 'a';
        let meta = JSON.parse(xPagination);
        this.criminalsData.meta.currentPage = meta.CurrentPage;
        this.criminalsData.meta.itemCount = meta.TotalCount;
        this.criminalsData.meta.itemsPerPage = meta.PageSize;
        this.criminalsData.meta.totalItems = meta.TotalCount;
        this.criminalsData.meta.totalPages = meta.TotalPages;
        this.criminalsData.items = result.body.data;
      } else {
        this.toastr.error('Could not pull');
      }
      this.spinner.hide();
    }, err => {
      this.toastr.error('Something went wrong.');
      this.spinner.hide();
    })
  }

  searchCriminals(criminalSearch: CriminalSearch) {
    this.spinner.show();
    console.log(criminalSearch);
    this.http.post<any>(environment.apiUrl + 'api/Criminals/CriminalSearch', criminalSearch, { observe: 'response' }).subscribe((result) => {
      if (result.body.isSucceed == true) {
        let xPagination = result.headers.get('x-pagination') || 'a';
        let meta = JSON.parse(xPagination);
        this.criminalsData.meta.currentPage = meta.CurrentPage;
        this.criminalsData.meta.itemCount = meta.TotalCount;
        this.criminalsData.meta.itemsPerPage = meta.PageSize;
        this.criminalsData.meta.totalItems = meta.TotalCount;
        this.criminalsData.meta.totalPages = meta.TotalPages;
        this.criminalsData.items = result.body.data;
        this.spinner.hide();
      } else {
        this.toastr.error('Could not pull');
        this.spinner.hide();
      }
    }, err => {
      this.toastr.error('Something went wrong.');
      this.spinner.hide();
    })
  }

  createCriminal(criminal: Criminal) {
    this.spinner.show();
    console.log(criminal)
    this.http.post<ServiceResult>(environment.apiUrl + 'api/criminals', criminal).subscribe((result) => {
      if (result.isSucceed == true) {
        this.toastr.success('Crimianl Created Successfuly');
        this.refresh.next(new Date().getTime());
      } else {
        this.toastr.error('Could not create the item');
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error('Something went wrong, Please login again.');
    })
  }

  deleteCriminal(id: number) {
    this.spinner.show();
    this.http.delete<ServiceResult>(environment.apiUrl + 'api/Criminals/' + id).subscribe((result) => {
      if (result.isSucceed == true) {
        this.toastr.success('Criminal Deleted Successfuly!!');
        this.criminalsData.items = this.criminalsData.items?.filter(criminal => criminal.criminalId != id);
      } else {
        this.toastr.error('Could not delete the item');
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error('Something went wrong.');
    })
  }


  updateCriminal(criminal: Criminal) {
    console.log(criminal)
    this.spinner.show();
    this.http.put<ServiceResult>(environment.apiUrl + 'api/criminals', criminal).subscribe((result) => {
      if (result.isSucceed == true) {
        this.toastr.success('Criminal Updated Successfuly');
        this.criminalsData.items = this.criminalsData.items?.filter(c => c.criminalId != criminal.criminalId);
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




}