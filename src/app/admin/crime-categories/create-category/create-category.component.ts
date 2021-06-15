import { ValueTransformer } from '@angular/compiler/src/util';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrimeCategory } from 'src/app/models/CrimeCategory';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
 
    crimeCategoryName= new FormControl('', [Validators.required]);
   
  constructor(@Inject(MAT_DIALOG_DATA) public data: CrimeCategory, 
  private dialog: MatDialogRef<CreateCategoryComponent>) 
  { }

  ngOnInit(): void {
    if (this.data) {
      this.crimeCategoryName.setValue(this.data.crimeCategoryName);
    }
  }

  saveItem() {
    let crimeCategory  = new CrimeCategory();
    crimeCategory.crimeCategoryName = this.crimeCategoryName.value;
    if (this.data) {
      this.dialog.close({
        ...crimeCategory
      })
    } else {
      this.dialog.close(crimeCategory)
    }
  }

}
