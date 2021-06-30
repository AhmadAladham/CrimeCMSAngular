import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { AdminComplaintsService } from 'src/app/services/admin-complaints.service';
import { ViewComplaintComponent } from '../view-complaint/view-complaint.component';

@Component({
  selector: 'app-list-complaints',
  templateUrl: './list-complaints.component.html',
  styleUrls: ['./list-complaints.component.css']
})
export class ListComplaintsComponent implements OnInit {
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['complainant', 'complaintDate', 'crimeCategory', 'crimeLocation', 'expectedCrimeTime', 'stationName', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  sortingColumn:string = 'Name';
  sortType:string = 'ASC';

  filterForm = new FormGroup({
    roleId: new FormControl(),
    phoneNumber: new FormControl(),
    firstName : new FormControl(),
  });
  constructor(
    public complaintsService:AdminComplaintsService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.complaintsService.refresh.subscribe(()=>{
      this.getComplaints();
    })
    this.filterForm.valueChanges.subscribe(() => {
      this.paginator.pageIndex = 0;
      // this.applyFilter();
  })
  }
  getComplaints(page: number = 1, size: number = 10, sortingColum? : string, sortType? : string){
    this.complaintsService.getAllComplaints(page, size,sortingColum, sortType);
  }
  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page +1;
  //   if(this.filterForm.controls.phoneNumber.value ||
  //     this.filterForm.controls.firstName.value ||
  //     this.filterForm.controls.roleId.value){
  //    this.applyFilter(page, size);
  //  }
  //  else{
     this.getComplaints(page, size, this.sortingColumn, this.sortType);
    // }
  }
  openDialog(complainantId:number) {
    let criminalDescription = this.complaintsService.complaints.items?.find(c=>c.complaintId == complainantId)?.criminalDescription;
    let complaintDescription = this.complaintsService.complaints.items?.find(c=>c.complaintId == complainantId)?.complaintDescription;
      this.dialog.open(ViewComplaintComponent,
        {
          height: '80vh',
          width: '80vw',
          data:{
             criminalDescription: criminalDescription,
             complaintDescription: complaintDescription
            }
        });
    
  }
}
