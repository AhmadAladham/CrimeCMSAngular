import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Complaint } from 'src/app/models/Complaint';
import { ComplaintService } from 'src/app/services/complaint.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CreateComplaintComponent } from '../create-complaint/create-complaint.component';
import { StationService } from 'src/app/services/station.service';
import { CrimeCategoryService } from 'src/app/services/crime-category.service';
@Component({
  selector: 'app-list-complaints',
  templateUrl: './list-complaints.component.html',
  styleUrls: ['./list-complaints.component.css']
})
export class ListComplaintsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  complaints: MatTableDataSource<Complaint> = new MatTableDataSource<Complaint>();
  //'complaintStatus',
  displayedColumns: string[] = ['complaintTitle', 'expectedCrimeDate', 'complaintDate', 'complaintDescription', 'crimeLocation', 'actions'];
  constructor(
    public complaintService: ComplaintService,
    private toastr:ToastrService,
    public stationService : StationService, 
    public crimeCategoryService : CrimeCategoryService,
    public dialog: MatDialog 
  ) { }
  ngAfterViewInit(): void {
    this.getComplaintsByUserId();
    this.complaintService.refresh.subscribe(() => {
    
      switch(status) {
        case '0' :{
          this.complaintService.complaints = this.complaintService.complaints.filter(c => {
            return c.complaintStatus = 0;
          });
          break; 
        }
             
        case '1' :
          this.complaintService.complaints = this.complaintService.complaints.filter(c => {
            return c.complaintStatus = 1;
          });
        break;  
        case '2' :
          this.complaintService.complaints = this.complaintService.complaints.filter(c => {
            return c.complaintStatus = 2;
          });
          break;      
      }
      this.complaints = new MatTableDataSource<Complaint>(this.complaintService.complaints);
      this.complaints.sort = this.sort;
      this.complaints.paginator = this.paginator;
    });
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
   this.getAllStations()
   this.getAllCrimeCategories()
  }

  ngOnInit(
  ): void {
    
    
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

  deleteComplaint(id:number) {
    if (id) {
      this.complaintService.deleteComplaint(id);
    } else {
      this.toastr.warning('This item cannot be deleted');
    }
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
