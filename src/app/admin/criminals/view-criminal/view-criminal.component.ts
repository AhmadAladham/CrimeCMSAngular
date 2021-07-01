import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, merge } from 'rxjs';
import { Crime } from 'src/app/models/Crimes';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { CriminalsService } from 'src/app/services/criminals.service';
import { AfterViewInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

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

  public exportHtmlToPDF(){
    let data = document.getElementById('htmltable')!;
      
      html2canvas(data).then(canvas => {
          
          let docWidth = 208;
          let docHeight = canvas.height * docWidth / canvas.width;
          
          const contentDataURL = canvas.toDataURL('image/png')
          let doc = new jsPDF('p', 'mm', 'a4');
          let position = 0;
          doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)
          
          doc.save('exportedPdf.pdf');
      });
  }
}
