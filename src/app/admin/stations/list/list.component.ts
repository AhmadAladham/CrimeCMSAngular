import {MatTableModule} from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Station } from 'src/app/models/station';
import { StationService } from 'src/app/services/station.service';
import { CreateStationComponent } from '../create-station/create-station.component';

@Component({
  selector: 'app-list-stations',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  stationName : any;
  key = 'stationName';
  reverse : boolean = false
  constructor(
    private router : Router,
    public stationService:StationService,
    private toastr:ToastrService,
    private dialog: MatDialog
    ) {
     }

  ngOnInit():void {
    this.stationService.refresh.subscribe(()=>{
      this.getAllStations();
    }
    )
  }
  displayedColumns: string[] = ['stationName', 'stationAddress', 'phoneNumber', 'totalStaff', 'actions'];

  getAllStations(){
    this.stationService.getAllStations().subscribe(
      (results : any)=>{
        this.stationService.stations = results.data;
    }, err=>{
      console.log(err);
    });
  }

  deleteStation(id:number) {
    if (id) {
      this.stationService.deleteStation(id);
    } else {
      this.toastr.warning('This item cannot be deleted');
    }
  }

  updateStation(id : number) {
    const station = this.stationService.stations.find(s=> s.stationId == id)
     this.dialog.open(CreateStationComponent, {
      data: station
    }).afterClosed().subscribe((result) => {
      if (result) {
        result.stationId = station?.stationId
        this.stationService.updateStation(result);
      }
    });
  }

  Search() {
    if(this.stationName == "") {
      this.ngOnInit();
    }else {
      this.stationService.stations = this.stationService.stations.filter(s => {
        return s.stationName?.toLocaleLowerCase().match(this.stationName.toLocaleLowerCase());
      });
    }
  }
  
 
  Sort(key : any) {
    this.key = key;
    this.reverse = !this.reverse
  }
}
