import { NgModule, AfterViewInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';  
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule}  from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    Ng2SearchPipeModule,
    OrderModule,
    NgbPaginationModule,
     NgbAlertModule,
     MatRadioModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatPaginatorModule,
     MatSortModule,
     MatSelectModule,
     MatSlideToggleModule,
     MatButtonModule,
     MatToolbarModule,
     NgxMatFileInputModule,
     MatCardModule,
     FlexLayoutModule
  ],
  exports:[
    CommonModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    Ng2SearchPipeModule,
    OrderModule,
    NgbPaginationModule,
     NgbAlertModule,
     MatRadioModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatPaginatorModule,
     MatSortModule,
     MatSelectModule,
     MatSlideToggleModule,
     MatButtonModule,
     MatToolbarModule,
     NgxMatFileInputModule,
     MatCardModule,
     FlexLayoutModule
  ]
})
export class SharedModule { 
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );

  }
}
