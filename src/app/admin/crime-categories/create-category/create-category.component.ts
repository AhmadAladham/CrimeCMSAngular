import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { crimeCategory } from 'src/app/models/CrimeCategory';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
 
    crimeCategoryName= new FormControl('', [Validators.required]);
   
  constructor(@Inject(MAT_DIALOG_DATA) public data: crimeCategory, 
  private dialog: MatDialogRef<CreateCategoryComponent>) 
  { }

  ngOnInit(): void {
    if (this.data) {
      this.crimeCategoryName.setValue(this.data.crimeCategoryName);
    }
  }

  saveItem() {
    const value  = this.crimeCategoryName.value;
    if (this.data) {
      this.dialog.close({
        ...value
      })
    } else {
      this.dialog.close(value)
    }
  }

}
