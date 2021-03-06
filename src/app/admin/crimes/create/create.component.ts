import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { pipe } from 'rxjs';
import { Crime } from 'src/app/models/Crimes';
import { Criminal } from 'src/app/models/Criminal';
import { CrimeCategoryService } from 'src/app/services/crime-category.service';
import { CriminalsService } from 'src/app/services/criminals.service';
import { StationService } from 'src/app/services/station.service';

const closeDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const isClosed = control.get('isClosed')!.value;
  const closeDate = control.get('closeDate')!.value;
  // return password != passwordConfirm ? { passwordMatch: true } : null;
  return isClosed && !closeDate ? {closeDate:true} : null;
};

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  criminalIsKnown : boolean = false;
  criminal?:Criminal;
  criminalNotFound:boolean = false;
  selectedRadio = "true";

  formGroup = new FormGroup({
    crimeTtile: new FormControl('', [Validators.required]),
    crimeDate: new FormControl('', [Validators.required]),
    closeDate: new FormControl('',),
    isClosed: new FormControl(true, [Validators.required]),
    crimeDescription: new FormControl('', []),
    criminalDescription: new FormControl('', []),
    location: new FormControl('', [Validators.required]),
    crimeCategoryId: new FormControl('', [Validators.required]),
    criminalId: new FormControl('', []),
    criminalNationalId: new FormControl('',Validators.maxLength(10)),
    stationId: new FormControl('', [Validators.required]),
    image: new FormControl('Choose Image', [])
  },{validators:closeDateValidator})

  constructor(@Inject(MAT_DIALOG_DATA)
  public data: Crime, 
  private dialog: MatDialogRef<CreateComponent>,
  public crimeCategoryService:CrimeCategoryService,
  public stationService:StationService,
  public criminalsService:CriminalsService,
  private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.formGroup.controls.criminalNationalId.valueChanges.subscribe(()=>{
      this.CheckNationalNumber();
    });
  this.crimeCategoryService.getAllCategories();
  this.stationService.getAllStations();
    if (this.data) {
      this.formGroup.controls.crimeTtile.setValue(this.data.crimeTtile);
      this.formGroup.controls.crimeDate.setValue(this.datePipe.transform(this.data.crimeDate, 'yyyy-MM-dd'));
      this.formGroup.controls.closeDate.setValue(this.datePipe.transform(this.data.closeDate, 'yyyy-MM-dd'));
      this.formGroup.controls.isClosed.setValue(this.data.isClosed);
      this.formGroup.controls.crimeDescription.setValue(this.data.crimeDescription);
      this.formGroup.controls.criminalDescription.setValue(this.data.criminalDescription);
      this.formGroup.controls.location.setValue(this.data.location);
      this.formGroup.controls.crimeCategoryId.setValue(this.data.crimeCategoryId);
      this.formGroup.controls.stationId.setValue(this.data.stationId);
      this.formGroup.controls.criminalId.setValue(this.data.criminalId);
      this.formGroup.controls.criminalNationalId.setValue(this.data.criminalNationalNumber);
      this.formGroup.controls.image.setValue(this.data.image);
    }
  }

  saveItem() {
    const value : Crime = this.formGroup.value;
    const reader = new FileReader();
    if(this.criminalIsKnown) value.criminalId = this.criminal?.criminalId;
    if(this.formGroup.controls.image.dirty)//cehcking if image was uploaded 
    {
      reader.readAsDataURL(this.formGroup.controls.image.value);
      reader.onload = () => {
        value.image = reader.result
        };
    }
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

  isCloseChange(event:MatRadioChange){
    if(!event.value){
      this.formGroup.controls.closeDate.disable();
      this.formGroup.controls.closeDate.setValue('');
    }
    else this.formGroup.controls.closeDate.enable();
  }
  getCriminalByNationalNumber(nationalNumber:string) {
    this.criminalsService.getCriminalByNationalNumber(nationalNumber).subscribe(
      (results : any)=>{
        this.criminal = results.data;
        if(this.criminal){
          this.criminalIsKnown = true;
          this.criminalNotFound = false;
        }
        else this.criminalNotFound = true;
    }, err=>{
      console.log(err);
    });
  }

  CheckNationalNumber(){
    let nationalNumber:string = this.formGroup.controls.criminalNationalId.value;
    if(nationalNumber){    
    if(nationalNumber.length == 10){
      this.getCriminalByNationalNumber(nationalNumber);
      
    }
    else this.criminalIsKnown = false;
  }
  else this.criminalIsKnown = false;
  }
  notKnownCriminalChange(event:MatSlideToggleChange){
    if(event.checked){
      this.formGroup.controls.criminalNationalId.setValue('');
      this.criminalIsKnown = false;
      this.criminalNotFound = false;
    }
    this.formGroup.controls.criminalNationalId.disabled ? this.formGroup.controls.criminalNationalId.enable() : this.formGroup.controls.criminalNationalId.disable();
  }
}