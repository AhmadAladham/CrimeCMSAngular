import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Crime } from '../models/Crimes';
import { CrimeSearch } from '../models/CrimeSearch';
import { CrimeData } from '../models/PaginationData';
import { ServiceResult } from '../models/ServiceResult';

@Injectable({
  providedIn: 'root'
})
export class CrimeService {
  crimeData:CrimeData = new CrimeData();
  refresh = new BehaviorSubject(0);
  dataSource:MatTableDataSource<Crime> = new MatTableDataSource<Crime>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  getAllCrimes(page: number, size: number, sortingColumn? : string, sortType? : string) {
    // this.spinner.show();
    let params = new HttpParams();

    if(sortingColumn) params = params.append('SortingColumn', String(sortingColumn));
    if(sortType) params = params.append('SortType', String(sortType));
    params = params.append('PageNumber', String(page));
     params = params.append('PageSize', String(size));

    this.http.get<any>(environment.apiUrl + 'api/Crimes',{params,  observe: 'response'}).subscribe((result) => {
      if (result.body.isSucceed == true) {
        let xPagination = '1';
        xPagination = result.headers.get('x-pagination') || 'a';
        let meta =JSON.parse(xPagination);
        this.crimeData.meta.currentPage = meta.CurrentPage;
        this.crimeData.meta.itemCount = meta.TotalCount;
        this.crimeData.meta.itemsPerPage = meta.PageSize;
        this.crimeData.meta.totalItems = meta.TotalCount;
        this.crimeData.meta.totalPages = meta.TotalPages;
        this.crimeData.items = result.body.data;
      } else {
        this.toastr.error('Could not pull');
      }
    }, err => {
      this.toastr.error('Something went wrong.');
    })
  };
  
  searchCrimes(crimeSearch:CrimeSearch) {
    this.http.post<any>(environment.apiUrl + 'api/Crimes/CrimeSearch', crimeSearch,{observe: 'response'}).subscribe((result) => {
      if (result.body.isSucceed == true) {
        let xPagination = result.headers.get('x-pagination') || 'a';
        let meta = JSON.parse(xPagination);
        this.crimeData.meta.currentPage = meta.CurrentPage;
        this.crimeData.meta.itemCount = meta.TotalCount;
        this.crimeData.meta.itemsPerPage = meta.PageSize;
        this.crimeData.meta.totalItems = meta.TotalCount;
        this.crimeData.meta.totalPages = meta.TotalPages;
        this.crimeData.items = result.body.data;
      } else {
        this.toastr.error('Could not pull');
      }
    }, err => {
      this.toastr.error('Something went wrong.');
    })
  };

  createCrime(crime: Crime) {
     this.spinner.show();
     this.http.post<ServiceResult>(environment.apiUrl + 'api/crimes', crime).subscribe((result) => {
      if (result.isSucceed == true) {
        this.toastr.success('Station Created Successfuly');
        this.refresh.next(new Date().getTime());
        // refresh
      } else {
        this.toastr.error('Could not create the item');
      }
       this.spinner.hide();
    }, err => {
       this.spinner.hide();
      this.toastr.error('Something went wrong, Please login again.');
    })
  }
}
