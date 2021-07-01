import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { EditComplaintStatusDTO } from 'src/app/models/EditComplaintDTO';
import { ComplaintSearch } from 'src/app/models/SearchParams';
import { AdminComplaintsService } from 'src/app/services/admin-complaints.service';
import { CrimeCategoryService } from 'src/app/services/crime-category.service';
import { StationService } from 'src/app/services/station.service';
import { ViewComplaintComponent } from '../view-complaint/view-complaint.component';

@Component({
  selector: 'app-list-complaints',
  templateUrl: './list-complaints.component.html',
  styleUrls: ['./list-complaints.component.css']
})
export class ListComplaintsComponent implements OnInit {
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['complainant', 'complaintTitle','complaintDate', 'crimeCategory', 'crimeLocation', 'expectedCrimeTime', 'stationName','complaintStatus', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  sortingColumn:string = 'title';
  sortType:string = 'asc';

  filterForm = new FormGroup({
    dateFrom: new FormControl(),
    dateTo: new FormControl(),
    crimeCategoryId : new FormControl(),
    stationId : new FormControl(),
    complaintStatus : new FormControl(),
    complaintTitle: new FormControl()
  });
  constructor(
    public complaintsService:AdminComplaintsService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public stationService : StationService, 
    public crimeCategoryService : CrimeCategoryService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.complaintsService.refresh.subscribe(()=>{
      this.getComplaints();
    })
    this.filterForm.valueChanges.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.applyFilter();
  })

  this.getAllStations()
  this.getAllCrimeCategories()
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

  getComplaints(page: number = 1, size: number = 10, sortingColum? : string, sortType? : string){
    this.complaintsService.getAllComplaints(page, size,sortingColum, sortType);
  }
  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page +1;
    if(this.filterForm.controls.dateFrom.value ||
      this.filterForm.controls.dateTo.value ||
      this.filterForm.controls.crimeCategoryId.value||
      this.filterForm.controls.stationId.value||
      this.filterForm.controls.complaintTitle.value || 
      this.filterForm.controls.complaintStatus.value){
     this.applyFilter(page, size);
   }
   else{
     this.getComplaints(page, size, this.sortingColumn, this.sortType);
    }
  }

  applyFilter(pageNumber:number = 1, pageSize:number = 10) {
    
    let filterValues:ComplaintSearch = this.filterForm.value;
    filterValues.sortType = this.sortType;
    filterValues.sortingColumn = this.sortingColumn ;
    filterValues.pageNumber = pageNumber;
    filterValues.pageSize = pageSize;
    if(filterValues.dateFrom) filterValues.dateFrom = new Date(this.datePipe.transform(filterValues.dateFrom, 'yyyy-MM-dd')||'1000-01-01');
    if(filterValues.dateTo)filterValues.dateTo = new Date(this.datePipe.transform(filterValues.dateTo, 'yyyy-MM-dd')||'3100-01-01');
        this.complaintsService.searchComplaints(filterValues);
  }

  resetFilter() {
    this.filterForm.reset();
  }

  sortComplaints(event:Sort){
    console.log(event)
    this.paginator.pageIndex = 0;
    this.sortType = event.direction;
    this.sortingColumn = event.active;
    if(this.sortingColumn =='complaintTitle') this.sortingColumn = 'title';

    if(this.filterForm.controls.dateFrom.value ||
      this.filterForm.controls.dateTo.value ||
      this.filterForm.controls.crimeCategoryId.value||
      this.filterForm.controls.stationId.value||
      this.filterForm.controls.complaintTitle.value || 
      this.filterForm.controls.complaintStatus.value){
        this.applyFilter(1, this.complaintsService.complaintsData.meta.itemsPerPage);
      }
      else{ 
        this.getComplaints(1,this.complaintsService.complaintsData.meta.itemsPerPage, this.sortingColumn, this.sortType);
      }
  }

  openDialog(complaintId:number) {
    let criminalDescription = this.complaintsService.complaintsData.items?.find(c=>c.complaintId == complaintId)?.criminalDescription;
    let complaintDescription = this.complaintsService.complaintsData.items?.find(c=>c.complaintId == complaintId)?.complaintDescription;
    let complaintStatus = this.complaintsService.complaintsData.items?.find(c=>c.complaintId == complaintId)?.complaintStatus;
     const dialogRef = this.dialog.open(ViewComplaintComponent,
        {
          height: '60vh',
          width: '60vw',
          data:{
             criminalDescription: criminalDescription,
             complaintDescription: complaintDescription,
             complaintStatus: complaintStatus,
             complaintId:complaintId
            }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log(result)
            this.editComplaintStatus(result);
          }
        });  
  }
  editComplaintStatus(newComplaintStatus:EditComplaintStatusDTO){
    this.complaintsService.editComplaintStatus(newComplaintStatus);
  }
}
