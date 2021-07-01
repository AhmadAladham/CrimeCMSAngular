import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditComplaintStatusDTO } from 'src/app/models/EditComplaintDTO';

@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.component.html',
  styleUrls: ['./view-complaint.component.css']
})
export class ViewComplaintComponent implements OnInit {
  complaintStatus = new FormControl(this.data.complaintStatus);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<ViewComplaintComponent>
  ) { }

  ngOnInit(): void {
  }

  saveItem() {
    let newComplaintStatus:EditComplaintStatusDTO = new EditComplaintStatusDTO();
    newComplaintStatus.complaintId = this.data.complaintId;
    newComplaintStatus.complaintStatus = this.complaintStatus.value;
    if (this.data) {
      this.dialog.close({
        ...newComplaintStatus
      })
    } else {
      this.dialog.close(newComplaintStatus)
    }
  }
}
