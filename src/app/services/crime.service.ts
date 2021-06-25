import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  imageUrl : any
  crimeData:CrimeData = new CrimeData();
  selectedCrime : Crime = new Crime() ; 
  refresh = new BehaviorSubject(0);
  message: string = 'You are not logged in..';
  dataSource:MatTableDataSource<Crime> = new MatTableDataSource<Crime>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: Router
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

  getCrimeById(id: number) {
    this.spinner.show();
    return this.http.get<ServiceResult>(environment.apiUrl + 'api/Crimes/' + id).subscribe((result) => {
      if (result.isSucceed == true) {
        this.selectedCrime = result.data;
        this.route.navigate(['admin/crimes/view']);
      } else {
        this.toastr.warning('Could not find the crime');
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error('Something went wrong, Please login again.');
      this.route.navigate(['account']);
    });
  }

  deleteCrime(id:number) {
    this.spinner.show();
    this.http.delete<ServiceResult>(environment.apiUrl + 'api/Crimes/' + id).subscribe((result) => {
      if (result.isSucceed == true) {
        this.toastr.success('Crime Deleted Successfuly!!');
        this.crimeData.items = this.crimeData.items?.filter(crime => crime.crimeId != id);
      } else {
        this.toastr.error('Could not delete the item');
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error('Something went wrong.');
    })
  }

  updateCrime(crime: Crime) {
     this.spinner.show();
    this.http.put<ServiceResult>(environment.apiUrl + 'api/stations', crime ).subscribe((result) => {
      if (result.isSucceed == true) {
        this.toastr.success('Crime Updated Successfuly');
        this.crimeData.items = this.crimeData.items?.filter(c => c.crimeId != crime.crimeId);
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
