import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Crime } from '../models/Crimes';
import { CrimeData } from '../models/PaginationData';

@Injectable({
  providedIn: 'root'
})
export class CrimeService {
  crimeData:CrimeData = new CrimeData();
  refresh = new BehaviorSubject(0);
  dataSource:MatTableDataSource<Crime> = new MatTableDataSource<Crime>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
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
        //this.refresh.next(new Date().getTime());
      } else {
        this.toastr.error('Could not pull');
      }
    }, err => {
      this.toastr.error('Something went wrong.');
    })
  };
}
