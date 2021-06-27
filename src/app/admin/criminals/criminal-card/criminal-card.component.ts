import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CriminalsService } from 'src/app/services/criminals.service';
import { CreateCriminalComponent } from '../create-criminal/create-criminal.component';
import { ViewCriminalComponent } from '../view-criminal/view-criminal.component';

@Component({
  selector: 'app-criminal-card',
  templateUrl: './criminal-card.component.html',
  styleUrls: ['./criminal-card.component.css']
})
export class CriminalCardComponent implements OnInit {

  @Input() firstName?: string = 'N/K';
  @Input() lastName?: string = 'N/K';
  @Input() height?: number = 0;
  @Input() weight?: number = 0;
  @Input() crimes?: any[] = [];
  @Input() criminalId?: number | undefined;
  @Input() nationalNumber?: string | undefined;
  @Input() image?: string | undefined | null | ArrayBuffer;
  @Input() phoneNumber?: string = 'N/K';
  @Input() dateOfBirth?: Date = new Date();
  @Input() address?: string = 'N/K';

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    public criminalsService: CriminalsService
  ) { }

  ngOnInit(): void {
  }

  openDialog(criminalId: number | undefined) {
    const dialogRef = this.dialog.open(ViewCriminalComponent,
      {
        data: criminalId,
        height: '700px',
        width: '1000px'
      });
  }

  deleteCriminal(id: number | undefined) {
    if (id) {
      this.criminalsService.deleteCriminal(id)
    } else {
      this.toastr.warning('This item cannot be deleted');
    }
  }

  updateCriminal(id: number | undefined) {
    const criminal = this.criminalsService.criminalsData.items?.find(criminal => criminal.criminalId == id)
    this.dialog.open(CreateCriminalComponent, {
      data: criminal
    }).afterClosed().subscribe((result) => {
      if (result) {
        result.criminalId = criminal?.criminalId
        this.criminalsService.updateCriminal(result)
      }
    });
  }
}
