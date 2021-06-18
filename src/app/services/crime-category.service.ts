import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrimeCategory } from '../models/CrimeCategory';
import { ServiceResult } from '../models/ServiceResult';

@Injectable({
  providedIn: 'root'
})
export class CrimeCategoryService {
 crimeCategories : CrimeCategory[] = []
 refresh = new BehaviorSubject(0)
  constructor(
    private http:HttpClient,
    private toastr: ToastrService,
    private route: Router,
    private spinner:NgxSpinnerService
  ) { }

  getAllCategories() {
    return this.http.get('https://localhost:5001/api/CrimeCategories', {
    });
  }

  deleteCategory(id : number) {
    this.http.delete<ServiceResult>('https://localhost:5001/api/CrimeCategories/' + id).subscribe((result :any)=>{
      if(result.isSucceed == true) {
        this.toastr.success('Station Deleted Successfuly!!');
        this.crimeCategories = this.crimeCategories.filter(category => category.crimeCategoryId != id);
      } else {
        this.toastr.error('Could not delete the item');
      }
    }, err =>{
      this.toastr.error('Something went wrong.');
    })
  }

  createCategory(crimeCategory : CrimeCategory) {
    this.http.post<ServiceResult>(environment.apiUrl + 'api/CrimeCategories', crimeCategory).subscribe((result) => {
      if (result.data == 1) {
        this.toastr.success('Crime Category Created Successfuly');
        this.refresh.next(new Date().getTime());
        // refresh
      } else {
        this.toastr.error('Could not create the item');
      }
      // this.spinner.hide();
    }, err => {
      // this.spinner.hide();
      this.toastr.error('Something went wrong, Please login again.');
    })
  }


  updateCategory(crimeCategory: CrimeCategory) {
    console.log(crimeCategory)
    this.spinner.show();
    this.http.put<ServiceResult>(environment.apiUrl + 'api/crimecategories', crimeCategory ).subscribe((result) => {
      if (result.data == 1) {
        this.toastr.success('Crime Category Updated Successfuly');
        this.crimeCategories = this.crimeCategories.filter(s => s.crimeCategoryId != crimeCategory.crimeCategoryId);
        this.refresh.next(new Date().getTime());
        // refresh
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
