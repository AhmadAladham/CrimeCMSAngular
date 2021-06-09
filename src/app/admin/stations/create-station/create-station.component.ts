import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Station } from 'src/app/models/station';

@Component({
  selector: 'app-create-station',
  templateUrl: './create-station.component.html',
  styleUrls: ['./create-station.component.css']
})

export class CreateStationComponent implements OnInit {
  formGroup = new FormGroup({
    stationName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    stationAddress: new FormControl('', [Validators.required]),
    totalStaff: new FormControl('', [Validators.required]),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: Station, private dialog: MatDialogRef<CreateStationComponent>) { }

  ngOnInit(): void {
    if (this.data) {
      this.formGroup.controls.stationName.setValue(this.data.stationName);
      this.formGroup.controls.phoneNumber.setValue(this.data.phoneNumber);
      this.formGroup.controls.stationAddress.setValue(this.data.stationAdress);
      this.formGroup.controls.totalStaff.setValue(this.data.totalStaff);
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
