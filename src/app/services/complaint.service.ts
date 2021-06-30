import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Complaint } from '../models/Complaint';
import { ServiceResult } from '../models/ServiceResult';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  complaints: Complaint[] = [];
  refresh = new BehaviorSubject(0);

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private route: Router,
    private spinner: NgxSpinnerService
  ) { }

  getAllComplaints() {
    return this.http.get(environment.apiUrl + 'api/Complaints', {
    });
  }

  getComplaintsByUserId() {
    this.spinner.show();
    this.http.get<ServiceResult>(environment.apiUrl + 'api/Complaints/User').subscribe((result) => {
      if (result.isSucceed == true) {
        this.complaints = result.data;
        this.refresh.next(new Date().getTime());
      } else {
        this.toastr.error('Could not delete the item');
      }
      this.spinner.hide();
    }, err => {
      this.toastr.error('Something went wrong.');
      this.spinner.hide();
    })
  }

  deleteComplaint(id : number) {
    this.http.delete<ServiceResult>(environment.apiUrl + 'api/Complaints/' + id).subscribe((result :any)=>{
      if(result.isSucceed == true) {
        this.toastr.success('Complaint Deleted Successfuly!!');
        this.complaints = this.complaints.filter(complaint => complaint.complaintId != id);
        this.refresh.next(new Date().getTime());
      } else {
        this.toastr.error('Could Not Delete The Item');
      }
    }, err =>{
      this.toastr.error('Something Went Wrong.');
    })
  }

  createComplaint(complaint: Complaint) {
    this.spinner.show();
    this.http.post<ServiceResult>(environment.apiUrl + 'api/Complaints', complaint).subscribe((result) => {
      if (result.data == 1) {
        this.toastr.success('Complaint Created Successfuly');
        this.getComplaintsByUserId();
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
