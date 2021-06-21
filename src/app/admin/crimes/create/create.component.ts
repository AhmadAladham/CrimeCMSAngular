import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Crime } from 'src/app/models/Crimes';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  formGroup = new FormGroup({
    crimeTtile: new FormControl('', [Validators.required]),
    crimeEntryDate: new FormControl('', [Validators.required]),
    crimeDate: new FormControl('', [Validators.required]),
    closeDate: new FormControl('', [Validators.required]),
    isClosed: new FormControl('', [Validators.required]),
    crimeDescription: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    crimeCategoryName: new FormControl('', [Validators.required]),
    criminalFirstName: new FormControl('', [Validators.required]),
    criminalLastName: new FormControl('', [Validators.required]),
    stationName: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  })
  constructor(@Inject(MAT_DIALOG_DATA)
  public data: Crime, 
  private dialog: MatDialogRef<CreateComponent>
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.formGroup.controls.crimeTtile.setValue(this.data.CrimeTtile);
      this.formGroup.controls.crimeEntryDate.setValue(this.data.CrimeEntryDate);
      this.formGroup.controls.crimeDate.setValue(this.data.CrimeDate);
      this.formGroup.controls.closeDate.setValue(this.data.CloseDate);
      this.formGroup.controls.isClosed.setValue(this.data.IsClosed);
      this.formGroup.controls.crimeDescription.setValue(this.data.CrimeDescription);
      this.formGroup.controls.location.setValue(this.data.Location);
      this.formGroup.controls.crimeCategoryName.setValue(this.data.CrimeCategoryName);
      this.formGroup.controls.criminalFirstName.setValue(this.data.CriminalFirstName);
      this.formGroup.controls.criminalLastName.setValue(this.data.CriminalLastName);
      this.formGroup.controls.stationName.setValue(this.data.StationName);
      this.formGroup.controls.image.setValue(this.data.Image);
    }
  }

  saveItem() {
    const value  = this.formGroup.value;
    if (this.data) {
      this.dialog.close({
        ...value
      })
    } else {
      this.dialog.close(value)
    }
  }
}


