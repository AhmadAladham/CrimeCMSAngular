import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Crime } from 'src/app/models/Crimes';
import { CriminalsService } from 'src/app/services/criminals.service';

@Component({
  selector: 'app-view-criminal',
  templateUrl: './view-criminal.component.html',
  styleUrls: ['./view-criminal.component.css'],
 
})
export class ViewCriminalComponent implements OnInit {
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  crimes: MatTableDataSource<Crime> = new MatTableDataSource<Crime>();
  displayedColumns: string[] = ['crimeTtile', 'crimeDate', 'location'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public criminalId: any,
    public criminalsService: CriminalsService,
  ) {
  }
  ngOnInit(): void {
    this.getCriminal(this.criminalId);
    this.criminalsService.crimesRefresh.subscribe(() => {
      this.crimes.data = this.criminalsService.criminal.crimes;
      this.crimes.sort = this.sort;
      setTimeout(() => this.crimes.paginator = this.paginator);
    });
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  getCriminal(criminalId: number) {
    this.criminalsService.getCriminal(criminalId);
  }
}
