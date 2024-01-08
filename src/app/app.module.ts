import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { DownloadViewPdfComponent } from './download-view-pdf/download-view-pdf.component';
import { CreateCertificateComponent } from './create-certificate/create-certificate.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateCertificateComponent,
    DownloadViewPdfComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap:[AppComponent]
})
export class AppModule { }
