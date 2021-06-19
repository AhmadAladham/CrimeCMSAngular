import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CrimeService } from 'src/app/services/crime.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['crimeTtile', 'crimeEntryDate', 'crimeDate', 'closeDate', 'isClosed', 'crimeDescription', 'location', 'crimeCategoryName', 'criminalFirstName', 'stationName'];
  constructor(public crimeService:CrimeService) { }

  ngOnInit(): void {
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

}
