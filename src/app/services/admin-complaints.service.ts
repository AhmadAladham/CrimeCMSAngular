import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Complaint } from '../models/Complaint';
import { PaginatedData } from '../models/PaginationData';

@Injectable({
  providedIn: 'root'
})
export class AdminComplaintsService {
  complaints:PaginatedData<Complaint> = new PaginatedData<Complaint>();
  refresh = new BehaviorSubject(0);
  constructor(
    private http:HttpClient,
    private router:Router,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService
  ) { }

  getAllComplaints(page: number, size: number, sortingColumn? : string, sortType? : string) {
    this.spinner.show();
    let params = new HttpParams();

    if(sortingColumn) params = params.append('SortingColumn', String(sortingColumn));
    if(sortType) params = params.append('SortType', String(sortType));
    params = params.append('PageNumber', String(page));
     params = params.append('PageSize', String(size));

    this.http.get<any>(environment.apiUrl + 'api/Complaints',{params,  observe: 'response'}).subscribe((result) => {
      if (result.body.isSucceed == true) {
        let xPagination = result.headers.get('x-pagination') || 'a';
        let meta =JSON.parse(xPagination);
        this.complaints.meta.currentPage = meta.CurrentPage;
        this.complaints.meta.itemCount = meta.TotalCount;
        this.complaints.meta.itemsPerPage = meta.PageSize;
        this.complaints.meta.totalItems = meta.TotalCount;
        this.complaints.meta.totalPages = meta.TotalPages;
        this.complaints.items = result.body.data;
        console.log(this.complaints)
      } else {
        this.toastr.error('Could not pull');
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error('Something went wrong.');
    })
  }
}
