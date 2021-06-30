import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PaginationService } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { UserSearch } from 'src/app/models/SearchParams';
import { User } from 'src/app/models/user';
import { UserRoleService } from 'src/app/services/user-role.service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit {
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['email', 'firstName', 'roleName', 'phoneNumber', 'dateOfBirth', 'gender', 'emailIsConfirmed','actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  sortingColumn:string = 'Name';
  sortType:string = 'ASC';

  filterForm = new FormGroup({
    roleId: new FormControl(),
    phoneNumber: new FormControl(),
    firstName : new FormControl(),
  });
  
  constructor
  (
    public userService:UserService,
    public userRoleService:UserRoleService,
    private toastr: ToastrService,
  )
   { 
  }

  ngAfterViewInit(): void {
    this.userService.refresh.subscribe(()=>{
      this.getUsers();
    })
    this.filterForm.valueChanges.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.applyFilter();
  })
  this.getAllUserRoles()
  }

  getAllUserRoles(){
    this.userRoleService.getAllUserRoles().subscribe(
      (results : any)=> {
        this.userRoleService.userRoles= results.data;
      }, err => {
        console.log(err);
      });
  }

  getUsers(page: number = 1, size: number = 10, sortingColum? : string, sortType? : string){
    this.userService.getAllUsers(page, size,sortingColum, sortType);
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page +1;
    if(this.filterForm.controls.phoneNumber.value ||
      this.filterForm.controls.firstName.value ||
      this.filterForm.controls.roleId.value){
     this.applyFilter(page, size);
   }
   else{
     this.getUsers(page, size, this.sortingColumn, this.sortType);
    }
  }

    applyFilter(pageNumber:number = 1, pageSize:number = 10) {
    
      let filterValues:UserSearch = this.filterForm.value;
      filterValues.sortType = this.sortType;
      filterValues.sortingColumn = this.sortingColumn ;
      filterValues.pageNumber = pageNumber;
      filterValues.pageSize = pageSize;
      this.userService.searchUsers(filterValues);
    }

    resetFilter() {
      this.filterForm.reset();
    }

    sortUsers(event:Sort){
      this.paginator.pageIndex = 0;
      this.sortType = event.direction;
      var sortingColumn  = event.active;
      if(sortingColumn =='firstName') sortingColumn = 'Name'

      if(this.filterForm.controls.phoneNumber.value ||
        this.filterForm.controls.firstName.value ||
        this.filterForm.controls.roleId.value
         ){
          this.applyFilter(1, this.userService.userData.meta.itemsPerPage);
        }
        else{
          this.getUsers(1,this.userService.userData.meta.itemsPerPage, this.sortingColumn, this.sortType);
        }
    }

    deleteUser(id:number) {
      if (id) {
        this.userService.deleteUser(id)
      } else {
        this.toastr.warning('This item cannot be deleted');
      }
    }
  }


 
