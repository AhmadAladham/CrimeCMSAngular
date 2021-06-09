import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StationService } from 'src/app/services/station.service';

export interface Station {
  stationName: string;
  phoneNumber: string;
  stationAddress: number;
  totalStaff: string;
}

@Component({
  selector: 'app-list-stations',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  constructor(
    private router : Router,
    public stationService:StationService,
    private toastr:ToastrService
    ) {
     }

  ngOnInit():void {
    this.getAllStations();
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
}
