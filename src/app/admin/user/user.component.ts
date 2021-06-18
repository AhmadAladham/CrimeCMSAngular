import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['userId', 'email', 'firstName', 'lastName', 'roleName', 'phoneNumber', 'dateOfBirth', 'gender', 'emailIsConfirmed'];
  constructor
  (
    public userService:UserServiceService
  ) { }

  ngOnInit(): void {
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

  }
