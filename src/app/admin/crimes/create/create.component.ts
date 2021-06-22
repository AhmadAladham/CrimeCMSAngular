import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Crime } from 'src/app/models/Crimes';
import { CrimeCategoryService } from 'src/app/services/crime-category.service';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  formGroup = new FormGroup({
    crimeTtile: new FormControl('', [Validators.required]),
    crimeDate: new FormControl('', [Validators.required]),
    closeDate: new FormControl('',),
    isClosed: new FormControl('', [Validators.required]),
    crimeDescription: new FormControl('', [Validators.required]),//
    criminalDescription: new FormControl('', [Validators.required]),//
    location: new FormControl('', [Validators.required]),
    crimeCategoryId: new FormControl('', [Validators.required]),
    criminalNationalId: new FormControl('',),
    stationId: new FormControl('', [Validators.required]),
    image: new FormControl('Choose Image', [Validators.required])//
  })
  constructor(@Inject(MAT_DIALOG_DATA)
  public data: Crime, 
  private dialog: MatDialogRef<CreateComponent>,
  public crimeCategoryService:CrimeCategoryService,
  public stationService:StationService
  ) { }

  ngOnInit(): void {
  this.crimeCategoryService.getAllCategories();
  this.stationService.getAllStations();
    if (this.data) {
      this.formGroup.controls.crimeTtile.setValue(this.data.crimeTtile);
      this.formGroup.controls.crimeEntryDate.setValue(this.data.crimeEntryDate);
      this.formGroup.controls.crimeDate.setValue(this.data.crimeDate);
      this.formGroup.controls.closeDate.setValue(this.data.closeDate);
      this.formGroup.controls.isClosed.setValue(this.data.isClosed);
      this.formGroup.controls.crimeDescription.setValue(this.data.crimeDescription);
      this.formGroup.controls.location.setValue(this.data.location);
      this.formGroup.controls.crimeCategoryName.setValue(this.data.crimeCategoryName);
      this.formGroup.controls.criminalFirstName.setValue(this.data.criminalFirstName);
      this.formGroup.controls.criminalLastName.setValue(this.data.criminalLastName);
      this.formGroup.controls.stationName.setValue(this.data.stationName);
      this.formGroup.controls.image.setValue(this.data.image);
    }
   
  }

  saveItem() {
    const value : Crime = this.formGroup.value;
    const reader = new FileReader();
    reader.readAsDataURL(this.formGroup.controls.image.value);
    reader.onload = () => {
      value.image = reader.result
      };
    if (this.data) {
      this.dialog.close({
        ...value
      })
    } else {
      this.dialog.close(value)
    }
    console.log(value)
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


