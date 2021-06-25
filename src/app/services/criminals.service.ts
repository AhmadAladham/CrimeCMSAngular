import { HttpClient, HttpParams } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CriminalsData } from '../models/PaginationData';
import { ServiceResult } from '../models/ServiceResult';

@Injectable({
  providedIn: 'root'
})
export class CriminalsService {
  criminalsData:CriminalsData = new CriminalsData();
  refresh = new BehaviorSubject(0);

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  getCriminalByNationalNumber(nationalNumber:string) {
    return this.http.get(environment.apiUrl + 'api/Criminals/NationalNumber/' + nationalNumber,{});
}

getAllCriminals(page: number, size: number, sortingColumn? : string, sortType? : string) {
  // this.spinner.show();
  let params = new HttpParams();

  if(sortingColumn) params = params.append('SortingColumn', String(sortingColumn));
  if(sortType) params = params.append('SortType', String(sortType));
  params = params.append('PageNumber', String(page));
   params = params.append('PageSize', String(size));

  this.http.get<any>(environment.apiUrl + 'api/criminals',{params,  observe: 'response'}).subscribe((result) => {
    if (result.body.isSucceed == true) {
      let xPagination = result.headers.get('x-pagination') || 'a';
      let meta =JSON.parse(xPagination);
      this.criminalsData.meta.currentPage = meta.CurrentPage;
      this.criminalsData.meta.itemCount = meta.TotalCount;
      this.criminalsData.meta.itemsPerPage = meta.PageSize;
      this.criminalsData.meta.totalItems = meta.TotalCount;
      this.criminalsData.meta.totalPages = meta.TotalPages;
      this.criminalsData.items = result.body.data;
      //this.refresh.next(new Date().getTime());
    } else {
      this.toastr.error('Could not pull');
    }
  }, err => {
    this.toastr.error('Something went wrong.');
  })
}

}