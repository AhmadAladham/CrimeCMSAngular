import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { complaintStatus } from 'src/app/enum/complainStatus';
import { Complaint } from 'src/app/models/Complaint';
import { ComplaintService } from 'src/app/services/complaint.service';
import { CrimeCategoryService } from 'src/app/services/crime-category.service';
import { StationService } from 'src/app/services/station.service';
import { CreateComplaintComponent } from '../create-complaint/create-complaint.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  allComplaints!:Array<Complaint>;
  pendingComplaints:Complaint[] = [];
  solvedComplaints:Complaint[] = [];
  dataIsLoaded : boolean = false;
  constructor(
    private complaintService: ComplaintService,
    private toastr:ToastrService,
    public stationService : StationService, 
    public crimeCategoryService : CrimeCategoryService,
    public dialog: MatDialog ) { 
    
  }

  ngOnInit(): void {
     //get stations and categories for the drop down lists
     this.getAllStations();
     this.getAllCrimeCategories(); 
     this.complaintService.getComplaintsByUserId();
     this.complaintService.refresh.subscribe(()=>{
        this.allComplaints = this.complaintService.complaints;
        this.pendingComplaints = this.complaintService.complaints.filter(c=>{
          return c.complaintStatus == complaintStatus.Pending;
        });
        this.solvedComplaints = this.complaintService.complaints.filter(c=>{
          return c.complaintStatus == complaintStatus.Solved;
        })
        this.dataIsLoaded = true;
     });

  }
  getAllStations(){
    this.stationService.getAllStations().subscribe(
      (results : any)=>{
        this.stationService.stations = results.data;
    }, err=>{
      console.log(err);
    });
  }

  getAllCrimeCategories() {
    this.crimeCategoryService.getAllCategories().subscribe(
      (results : any)=>{
        this.crimeCategoryService.crimeCategories = results.data;
    }, err=>{
      console.log(err);
    });
  }

  getComplaintsByUserId() {
    this.complaintService.getComplaintsByUserId();
  }

  

  openDialog() {
    const dialogRef = this.dialog.open(CreateComplaintComponent,
      {
        height: '80vh',
        width: '80vw',
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.complaintService.createComplaint(result);
      }
    });
  }
}
