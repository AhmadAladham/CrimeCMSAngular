import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CriminalSearch } from 'src/app/models/SearchParams';
import { CriminalsService } from 'src/app/services/criminals.service';
import { ViewCriminalComponent } from '../view-criminal/view-criminal.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageEvent!: PageEvent;
  sortingColumn:string = 'title';
  sortType:string = 'asc';
  filterForm = new FormGroup({
    heightFrom: new FormControl(),
    heightTo: new FormControl(),
    weightFrom: new FormControl(),
    weightTo: new FormControl(),
    criminalName: new FormControl()
  });
  constructor(
    public criminalsService:CriminalsService,
  ) { }

  ngOnInit(): void {
    this.criminalsService.refresh.subscribe(()=>{
      this.getCriminals();
    })
    this.filterForm.valueChanges.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.applyFilter();
  })
  }

  getCriminals(page: number = 1, size: number = 10, sortingColum? : string, sortType? : string){
    this.criminalsService.getAllCriminals(page, size,sortingColum, sortType);
  }

    onPaginateChange(event: PageEvent) {
      let page = event.pageIndex;
      let size = event.pageSize;
      page = page +1;
  
      if(this.filterForm.controls.heightFrom.value ||
         this.filterForm.controls.heightTo.value ||
         this.filterForm.controls.weightFrom.value||
         this.filterForm.controls.weightTo.value||
         this.filterForm.controls.criminalName.value){
        this.applyFilter(page, size);
      }
      else{
        this.getCriminals(page, size, this.sortingColumn, this.sortType);
      }
    }
    applyFilter(pageNumber:number = 1, pageSize:number = 10) {
      let filterValues:CriminalSearch = this.filterForm.value;
      filterValues.sortType = this.sortType;
      filterValues.sortingColumn = this.sortingColumn ;
      filterValues.pageNumber = pageNumber;
      filterValues.pageSize = pageSize;
      filterValues.heightFrom = this.filterForm.controls.heightFrom.value;
      filterValues.heightTo = this.filterForm.controls.heightTo.value;
      filterValues.weightFrom = this.filterForm.controls.weightFrom.value;
      filterValues.weightTo = this.filterForm.controls.weightTo.value;
      if(this.filterForm.controls.criminalName.value) filterValues.criminalName = this.filterForm.controls.criminalName.value.replace(/\s*/g, "");
      console.log(filterValues);
      this.criminalsService.searchCriminals(filterValues);
    }
    resetFilter() {
      this.filterForm.reset();
    }
   
}
