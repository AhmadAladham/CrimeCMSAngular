import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Complaint } from '../models/Complaint';
import { EditComplaintStatusDTO } from '../models/EditComplaintDTO';
import { PaginatedData } from '../models/PaginationData';
import { ComplaintSearch } from '../models/SearchParams';
import { ServiceResult } from '../models/ServiceResult';

@Injectable({
  providedIn: 'root'
})
export class AdminComplaintsService {
  
  complaintsData:PaginatedData<Complaint> = new PaginatedData<Complaint>();
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
        this.complaintsData.meta.currentPage = meta.CurrentPage;
        this.complaintsData.meta.itemCount = meta.TotalCount;
        this.complaintsData.meta.itemsPerPage = meta.PageSize;
        this.complaintsData.meta.totalItems = meta.TotalCount;
        this.complaintsData.meta.totalPages = meta.TotalPages;
        this.complaintsData.items = result.body.data;
        console.log(this.complaintsData)
      } else {
        this.toastr.error('Could not pull');
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error('Something went wrong.');
    })
  }

  editComplaintStatus(editComplaintStatusDTO:EditComplaintStatusDTO) {
    this.spinner.show();
    this.http.put<ServiceResult>(environment.apiUrl + 'api/Complaints/ComplaintStatus',editComplaintStatusDTO).subscribe((result) => {
      if (result.isSucceed == true) {
        this.refresh.next(new Date().getTime());
      } else {
        this.toastr.error('Could not pull');
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error('Something went wrong.');
    })
  }

  searchComplaints(complaint: ComplaintSearch) {
    this.http.post<any>(environment.apiUrl + 'api/Complaints/ComplaintSearch', complaint, { observe: 'response' }).subscribe((result) => {
      if (result.body.isSucceed == true) {
        let xPagination = result.headers.get('x-pagination') || 'a';
        let meta = JSON.parse(xPagination);
        this.complaintsData.meta.currentPage = meta.CurrentPage;
        this.complaintsData.meta.itemCount = meta.TotalCount;
        this.complaintsData.meta.itemsPerPage = meta.PageSize;
        this.complaintsData.meta.totalItems = meta.TotalCount;
        this.complaintsData.meta.totalPages = meta.TotalPages;
        this.complaintsData.items = result.body.data;
      } else {
        this.toastr.error('Could not pull');
      }
    }, err => {
      this.toastr.error('Something went wrong.');
    })
  };
}
