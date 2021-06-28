import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Complaint } from 'src/app/models/Complaint';
import { ComplaintService } from 'src/app/services/complaint.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-list-complaints',
  templateUrl: './list-complaints.component.html',
  styleUrls: ['./list-complaints.component.css']
})
export class ListComplaintsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  complaints: MatTableDataSource<Complaint> = new MatTableDataSource<Complaint>();
  //'complaintStatus',
  displayedColumns: string[] = ['complaintTitle', 'expectedCrimeDate', 'complaintDate', 'complaintDescription', 'crimeLocation'];
  constructor(
    public complaintService: ComplaintService
  ) { }

  ngOnInit(
  ): void {
    this.getComplaintsByUserId();
    this.complaintService.refresh.subscribe(() => {
      this.complaints = new MatTableDataSource<Complaint>(this.complaintService.complaints);
      this.complaints.sort = this.sort;
      this.complaints.paginator = this.paginator;
    });
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  getComplaintsByUserId() {
    this.complaintService.getComplaintsByUserId()
  }
}
