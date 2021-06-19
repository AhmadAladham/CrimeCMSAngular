import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { CrimeService } from 'src/app/services/crime.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit {
  filterValues = {};
  filterSelectObj : any[] = [];
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['crimeTtile', 'crimeDate','isClosed', 'closeDate' ,'location', 'crimeCategoryName', 'stationName'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),  
  });

  get fromDate() { return this.filterForm.get('fromDate')?.value; }
  get toDate() { return this.filterForm.get('toDate')?.value; }

  constructor(
    public crimeService:CrimeService) 
    {  
      this.crimeService.dataSource.filterPredicate = (data, filter) =>{
        if (this.fromDate && this.toDate) {
          return data.CrimeDate! >= this.fromDate && data.CrimeDate! <= this.toDate;
        }
        console.log(data.CrimeDate)
        return true;
      }
    }

  ngAfterViewInit(): void {
    this.crimeService.refresh.subscribe(()=>{
      this.getCrimes();
    })
  
  }

  getCrimes(page: number = 1, size: number = 10, sortingColum? : string, sortType? : string){
    this.crimeService.getAllCrimes(page, size,sortingColum, sortType);
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page +1;
      this.getCrimes(page, size);
  }

  sortCrimes(event:Sort){
    this.paginator.pageIndex = 0;
    var sortType = event.direction;
    var sortingColumn  = event.active;
    if(sortingColumn =='crimeTtile') sortingColumn = 'title'
    this.getCrimes(1,this.crimeService.crimeData.meta.itemsPerPage, sortingColumn, sortType);
  }

  applyFilter() {
    this.crimeService.dataSource.filter = ''+Math.random();
  }
}





