import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { CriminalsService } from 'src/app/services/criminals.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  pageEvent!: PageEvent;
  filterForm = new FormGroup({
    heightFrom: new FormControl(),
    heightTo: new FormControl(),
    weightFrom: new FormControl(),
    weightTo: new FormControl(),
    criminalName: new FormControl()
  });
  constructor(
    public criminalsService:CriminalsService
  ) { }

  ngOnInit(): void {
    this.criminalsService.refresh.subscribe(()=>{
      this.getCriminals();
    })
    console.log(this.criminalsService.criminalsData.items)
  }

  getCriminals(page: number = 1, size: number = 8, sortingColum? : string, sortType? : string){
    this.criminalsService.getAllCriminals(page, size,sortingColum, sortType);
  }
  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page +1;
      this.getCriminals(page, size);
    }
    resetFilter() {
      this.filterForm.reset();
    }
}
