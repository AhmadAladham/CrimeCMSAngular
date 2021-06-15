import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrimeCategoryService } from 'src/app/services/crime-category.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private router: Router,
    public crimeCategoryService:CrimeCategoryService,
    private toast: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateCategoryComponent,
      {
        height: '200px',
        width: '400px',
      });

    dialogRef.afterClosed().subscribe(result => {
     //console.log(`Dialog result: ${JSON.stringify(result)}`);
      if (result) {
        this.crimeCategoryService.createCategory(result);
      }
    });
  }

}
