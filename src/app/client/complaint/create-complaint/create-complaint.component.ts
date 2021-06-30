import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Complaint } from 'src/app/models/Complaint';
import { CrimeCategoryService } from 'src/app/services/crime-category.service';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-create-complaint',
  templateUrl: './create-complaint.component.html',
  styleUrls: ['./create-complaint.component.css']
})
export class CreateComplaintComponent implements OnInit {
  formGroup = new FormGroup({
    complaintTitle: new FormControl('', [Validators.required]),
    expectedCrimeDate: new FormControl('',),
    complaintStatus: new FormControl(0, [Validators.required]),
    criminalDescription: new FormControl('', []),
    complaintDescription: new FormControl('', []),
    crimeLocation: new FormControl('', [Validators.required]),
    crimeCategoryId: new FormControl('', [Validators.required]),
    stationId: new FormControl('', [Validators.required]),
  })

  constructor(@Inject(MAT_DIALOG_DATA)
  public data: Complaint, 
  private dialog: MatDialogRef<CreateComplaintComponent>,
  public crimeCategoryService:CrimeCategoryService,
  public stationService:StationService,
  private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.crimeCategoryService.getAllCategories();
    this.stationService.getAllStations();
  }

  saveItem() {
    const value  = this.formGroup.value;
    console.log(value);
    if (this.data) {
      this.dialog.close({
        ...value
      })
    } else {
      this.dialog.close(value)
    }
  }

  getAllCrimeCategories() {
    this.crimeCategoryService.getAllCategories().subscribe(
      (results : any)=>{
        this.crimeCategoryService.crimeCategories = results.data;
    }, err=>{
      console.log(err);
    });
  }

  getAllStations(){
    this.stationService.getAllStations().subscribe(
      (results : any)=>{
        this.stationService.stations = results.data;
    }, err=>{
      console.log(err);
    });
  }

}
