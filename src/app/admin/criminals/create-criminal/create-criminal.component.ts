import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Criminal } from 'src/app/models/Criminal';

@Component({
  selector: 'app-create-criminal',
  templateUrl: './create-criminal.component.html',
  styleUrls: ['./create-criminal.component.css']
})
export class CreateCriminalComponent implements OnInit {

  formGroup = new FormGroup({
    criminalNationalNumber: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    criminalFirstName: new FormControl('', [Validators.required]),
    criminalLastName: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required])
  })
  constructor(@Inject(MAT_DIALOG_DATA)
  public data: Criminal,
    private dialog: MatDialogRef<CreateCriminalComponent>,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.formGroup.controls.criminalNationalNumber.setValue(this.data.criminalNationalNumber);
      this.formGroup.controls.dateOfBirth.setValue(this.datePipe.transform(this.data.dateOfBirth, 'yyyy-MM-dd'));
      this.formGroup.controls.criminalFirstName.setValue(this.data.criminalFirstName);
      this.formGroup.controls.criminalLastName.setValue(this.data.criminalLastName);
      this.formGroup.controls.height.setValue(this.data.height);
      this.formGroup.controls.weight.setValue(this.data.weight);
      this.formGroup.controls.image.setValue(this.data.image);
      this.formGroup.controls.phoneNumber.setValue(this.data.phoneNumber);
      this.formGroup.controls.dateOfBirth.setValue(this.datePipe.transform(this.data.dateOfBirth, 'yyyy-MM-dd'));
      this.formGroup.controls.address.setValue(this.data.address);
    }
  }

  saveItem() {
    const value: Criminal = this.formGroup.value;
    console.log(value)
    const reader = new FileReader();
    if (this.formGroup.controls.image.dirty)//cehcking if image was uploaded 
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
}
