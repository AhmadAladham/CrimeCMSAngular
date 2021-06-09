import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, EmptyError } from 'rxjs';
import { environment } from 'src/environments/environment'
import { ServiceResult } from '../models/ServiceResult';
import { Station } from '../models/station';



@Injectable({
  providedIn: 'root'
})
export class StationService {

  stations : Station[] = []
  refresh = new BehaviorSubject(0);

  constructor(
    private http:HttpClient,
    private toastr: ToastrService,
    private route: Router
    ) { }

  getAllStations(){
    return this.http.get('https://localhost:5001/api/Stations', {
      
    });
  }

  deleteStation(id:number) {
    this.http.delete('https://localhost:5001/api/Stations/' + id).subscribe((result: any) => {
      
      if (result.isSucceed == true) {
        this.toastr.success('Station Deleted Successfuly!!');
        this.stations = this.stations.filter(station => station.stationId != id);
      } else {
        this.toastr.error('Could not delete the item');
      }
      // this.spinner.hide();
    }, err => {
      // this.spinner.hide();
      this.toastr.error('Something went wrong.');
    })
  }

  createStation(station: Station) {
    // this.spinner.show();
    this.http.post<ServiceResult>(environment.apiUrl + 'api/stations', station).subscribe((result) => {
      if (result.data == 1) {
        this.toastr.success('Station Created Successfuly');
        this.refresh.next(new Date().getTime());
        // refresh
      } else {
        this.toastr.error('Could not create the item');
      }
      // this.spinner.hide();
    }, err => {
      // this.spinner.hide();
      this.toastr.error('Something went wrong, Please login again.');
    })
  }
  
}
