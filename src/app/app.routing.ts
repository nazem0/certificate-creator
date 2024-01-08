import { Routes, RouterModule } from '@angular/router';
import { DownloadViewPdfComponent } from './download-view-pdf/download-view-pdf.component';
import { CreateCertificateComponent } from './create-certificate/create-certificate.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: "", component: CreateCertificateComponent, pathMatch: "full" },
  { path: "pdf", component: DownloadViewPdfComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }