import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Station } from 'src/app/models/station';
import { StationService } from 'src/app/services/station.service';
import { CreateStationComponent } from '../create-station/create-station.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private router: Router,
    public stationService: StationService,
    private toast: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateStationComponent,
      {
        height: '400px',
        width: '600px',
      });

    dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog result: ${JSON.stringify(result)}`);
      if (result) {
        this.stationService.createStation(result);
      }
    });
  }

}
