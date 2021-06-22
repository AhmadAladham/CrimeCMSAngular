import { Component, OnInit } from '@angular/core';
import { CrimeService } from 'src/app/services/crime.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(public crimeService : CrimeService) { }
 
  ngOnInit(): void {
  }
}
