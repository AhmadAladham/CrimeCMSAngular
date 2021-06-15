import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrimeCategoryService } from 'src/app/services/crime-category.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';


@Component({
  selector: 'app-categorieslist',
  templateUrl: './categorieslist.component.html',
  styleUrls: ['./categorieslist.component.css']
})
export class CategorieslistComponent implements OnInit {
  categoryName : any;
  key = 'stationName';
  reverse : boolean = false
  constructor(
    private router : Router,
    public crimeCategoryService:CrimeCategoryService,
    private toastr:ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.crimeCategoryService.refresh.subscribe(() => {
      this.getAllCrimeCategories();
    })
  }

  displayedColumns: string[] = ['crimeCategoryId', 'crimeCategoryName'];

  getAllCrimeCategories() {
    this.crimeCategoryService.getAllCategories().subscribe(
      (results : any)=>{
        this.crimeCategoryService.crimeCategories = results.data;
        //console.log(JSON.stringify(this.crimeCategoryService.crimeCategories))
    }, err=>{
      console.log(err);
    });
  }

  deleteCrimeCategory(id:number) {
    if (id) {
      this.crimeCategoryService.deleteCategory(id);
    } else {
      this.toastr.warning('This item cannot be deleted');
    }
  }

  updateCrimeCategory(id : number) {
    const crimeCategory = this.crimeCategoryService.crimeCategories.find(s=> s.crimeCategoryId == id)
     this.dialog.open(CreateCategoryComponent, {
      data: crimeCategory
    }).afterClosed().subscribe((result) => {
      if (result) {
        result.crimeCategoryId = crimeCategory?.crimeCategoryId
        this.crimeCategoryService.updateStation(result);
      }
    });
  }

  Search() {
    if(this.categoryName == "") {
      this.ngOnInit();
    }else {
      this.crimeCategoryService.crimeCategories =  this.crimeCategoryService.crimeCategories.filter(s => {
        return s.crimeCategoryName?.toLocaleLowerCase().match(this.categoryName.toLocaleLowerCase());
      });
    }
  }

  Sort(key : any) {
    this.key = key;
    this.reverse = !this.reverse
  }
}
