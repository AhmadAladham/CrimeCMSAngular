import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { CrimeService } from 'src/app/services/crime.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { CrimeSearch } from 'src/app/models/CrimeSearch';
import { DatePipe } from '@angular/common';
import { Station } from 'src/app/models/station';
import { CrimeCategory } from 'src/app/models/CrimeCategory';
import { StationService } from 'src/app/services/station.service';
import { CrimeCategoryService } from 'src/app/services/crime-category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit {
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['crimeTtile', 'crimeDate','isClosed', 'closeDate' ,'location', 'crimeCategoryName', 'stationName','actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  sortingColumn:string = 'title';
  sortType:string = 'asc';


  filterForm = new FormGroup({
    dateFrom: new FormControl(),
    dateTo: new FormControl(),
    crimeCategoryId : new FormControl(),
    stationId : new FormControl(),
    crimeTtile: new FormControl()
  });

  constructor(
    public crimeService:CrimeService,
    private datePipe: DatePipe,
    public stationService : StationService, 
    public crimeCategoryService : CrimeCategoryService,
    private router: Router,
    private toast: ToastrService,
    public dialog: MatDialog 
    ) 
    {  
      
    }

  ngAfterViewInit(): void {
    this.crimeService.refresh.subscribe(()=>{
      this.getCrimes();
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

  getCrimes(page: number = 1, size: number = 10, sortingColum? : string, sortType? : string){
    this.crimeService.getAllCrimes(page, size,sortingColum, sortType);
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page +1;

    if(this.filterForm.controls.dateFrom.value ||
       this.filterForm.controls.dateTo.value ||
       this.filterForm.controls.crimeCategoryId.value||
       this.filterForm.controls.stationId.value||
       this.filterForm.controls.crimeTtile.value){
      this.applyFilter(page, size);
    }
    else{
      this.getCrimes(page, size, this.sortingColumn, this.sortType);
    }
  }

  sortCrimes(event:Sort){
    this.paginator.pageIndex = 0;
    this.sortType = event.direction;
    this.sortingColumn = event.active;
    if(this.sortingColumn =='crimeTtile') this.sortingColumn = 'title';

    if(this.filterForm.controls.dateFrom.value ||
      this.filterForm.controls.dateTo.value ||
      this.filterForm.controls.crimeCategoryId.value||
      this.filterForm.controls.stationId.value||
      this.filterForm.controls.crimeTtile.value){
        this.applyFilter(1, this.crimeService.crimeData.meta.itemsPerPage);
        console.log(1)
      }
      else{
        
        this.getCrimes(1,this.crimeService.crimeData.meta.itemsPerPage, this.sortingColumn, this.sortType);
      }
  }

  applyFilter(pageNumber:number = 1, pageSize:number = 10) {
    
    let filterValues:CrimeSearch = this.filterForm.value;
    filterValues.sortType = this.sortType;
    filterValues.sortingColumn = this.sortingColumn ;
    filterValues.pageNumber = pageNumber;
    filterValues.pageSize = pageSize;
    if(filterValues.dateFrom) filterValues.dateFrom = new Date(this.datePipe.transform(filterValues.dateFrom, 'yyyy-MM-dd')||'1000-01-01');
    if(filterValues.dateTo)filterValues.dateTo = new Date(this.datePipe.transform(filterValues.dateTo, 'yyyy-MM-dd')||'3100-01-01');
    console.log(filterValues);
    this.crimeService.searchCrimes(filterValues);
  }

  resetFilter() {
    this.filterForm.reset();
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateComponent,
      {
        height: 'fit-content',
        width: '800px',
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crimeService.createCrime(result);
      }
    });
  }
}





