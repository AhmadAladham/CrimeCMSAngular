import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationService } from 'ngx-pagination';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit {
  
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['email', 'firstName', 'roleName', 'phoneNumber', 'dateOfBirth', 'gender', 'emailIsConfirmed'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  constructor
  (
    public userService:UserServiceService
  )
   { 
  }

  ngAfterViewInit(): void {
    this.userService.refresh.subscribe(()=>{
      this.getUsers();
    })
    
  }

  getUsers(page: number = 1, size: number = 10, sortingColum? : string, sortType? : string){
    this.userService.getAllUsers(page, size,sortingColum, sortType);
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page +1;
      this.getUsers(page, size);
    }

    sortUsers(event:Sort){
      this.paginator.pageIndex = 0;
      var sortType = event.direction;
      var sortingColumn  = event.active;
      if(sortingColumn =='firstName') sortingColumn = 'name'

      console.log(sortingColumn)
      this.getUsers(1,this.userService.userData.meta.itemsPerPage, sortingColumn, sortType);
    }

  }
