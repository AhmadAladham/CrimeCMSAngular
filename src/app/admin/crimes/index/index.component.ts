import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrimeService } from 'src/app/services/crime.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private router: Router,
    public crimeService: CrimeService,
    private toast: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateComponent,
      {
        height: 'fit-content',
        width: '800px',
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crimeService.createCrime(result);
      }
    });
  }

}
