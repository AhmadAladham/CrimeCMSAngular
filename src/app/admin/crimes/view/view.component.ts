import { Component, OnInit } from '@angular/core';
import { CrimeService } from 'src/app/services/crime.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(public crimeService : CrimeService) { } 
  ngOnInit(): void {
  }
  
  public exportHtmlToPDF(){
    let data = document.getElementById('htmltable')!;
      
      html2canvas(data).then(canvas => {
          
          let docWidth =210
          let docHeight = canvas.height * docWidth/ document.getElementById('htmltable')!.offsetHeight;
          docHeight += docHeight * 0.07
          const contentDataURL = canvas.toDataURL('image/png')
          let doc = new jsPDF('p', 'mm', 'a4');
          let position = 0;
          doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)
          doc.save('CrimeInfoPDF.pdf');
      });
  }
}
