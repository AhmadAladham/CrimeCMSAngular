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


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit {
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['crimeTtile', 'crimeDate','isClosed', 'closeDate' ,'location', 'crimeCategoryName', 'stationName'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

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
    public crimeCategoryService : CrimeCategoryService 
    ) 
    {  
      
    }

  ngAfterViewInit(): void {
    this.crimeService.refresh.subscribe(()=>{
      this.getCrimes();
    })
    this.filterForm.valueChanges.subscribe(() => {
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
      this.getCrimes(page, size);
      //this.applyFilter()
  }

  sortCrimes(event:Sort){
    this.paginator.pageIndex = 0;
    var sortType = event.direction;
    var sortingColumn  = event.active;
    if(sortingColumn =='crimeTtile') sortingColumn = 'title'
    this.getCrimes(1,this.crimeService.crimeData.meta.itemsPerPage, sortingColumn, sortType);
  }

  applyFilter() {
    let filterValues:CrimeSearch = this.filterForm.value;
    if(filterValues.dateFrom) filterValues.dateFrom =new Date(this.datePipe.transform(filterValues.dateFrom, 'yyyy-MM-dd')||'1000-01-01');
    if(filterValues.dateTo)filterValues.dateTo =new Date(this.datePipe.transform(filterValues.dateTo, 'yyyy-MM-dd')||'3100-01-01');
    console.log(filterValues)
    this.crimeService.searchCrimes(filterValues);
    
  }

  resetFilter() {
    this.filterForm.reset();
  }
}





