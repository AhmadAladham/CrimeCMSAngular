import { AfterViewInit, Component, Inject, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
export class ListComplaintsComponent implements OnInit {
  @Input() complaints:Complaint[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  complaintsTable: MatTableDataSource<Complaint> = new MatTableDataSource<Complaint>();
  
  displayedColumns: string[] = ['complaintTitle', 'expectedCrimeDate', 'complaintDate', 'complaintDescription', 'crimeLocation','complaintStatus', 'actions'];
  constructor(
    private complaintService:ComplaintService,
    private toastr:ToastrService
  ) { }
  ngOnInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    console.log(this.complaints)
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.complaintsTable = new MatTableDataSource<Complaint>(this.complaints);
    this.complaintsTable.sort = this.sort;
    this.complaintsTable.paginator = this.paginator;
  }

  deleteComplaint(id:number) {
    if (id) {
      this.complaintService.deleteComplaint(id);
    } else {
      this.toastr.warning('This item cannot be deleted');
    }
  }
}
