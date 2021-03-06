import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { JwtModule, JwtModuleOptions } from "@auth0/angular-jwt";
import { MatTableExporterModule } from 'mat-table-exporter';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HomePageComponent } from './home-page/home-page.component';
const JWT_Module_Options: JwtModuleOptions = {
  config: {
  }
};


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot({positionClass: 'toast-top-center'}),
    FlexLayoutModule,
    NgxSpinnerModule,
    NgbModule,
    NgxMatFileInputModule,
    ComponentsModule,
    JwtModule.forRoot(JWT_Module_Options),
    MatTableExporterModule,
    PdfViewerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DatePipe,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
