import { Component, Input, OnInit } from '@angular/core';

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
  @Input() image?: string | undefined;
  @Input() phoneNumber?: string = 'N/K';
  @Input() dateOfBirth?: Date = new Date();
  @Input() address?: string = 'N/K';

  constructor() { }

  ngOnInit(): void {
  }

}
