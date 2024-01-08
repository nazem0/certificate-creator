import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from '../models/api-response';

@Component({
  selector: 'app-download-view-pdf',
  templateUrl: './download-view-pdf.component.html',
  styleUrl: './download-view-pdf.component.css'
})
export class DownloadViewPdfComponent {
  registrationLetterFrom: FormGroup;
  public pdfSrc = "";
  private api = "https://localhost:44343/api"
  public dummy = {
    "studentId": "470E95E9-EC4C-4AF0-AB52-1A5077D7F5C2",
    "scholarshipAwarded": 0,
    "courseId": "2827816E-F794-44A3-8F0F-9960A5AE0012",
    "totaltuitionfees": 0,
    "downpayment": 0,
    "paymentDeadLine": "2024-01-08T12:30:43.020Z",
    "intake": "string",
    "payLink": "string",
    "attendingClass": true,
    "installment": 0
  }
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.registrationLetterFrom = this.formBuilder.group({
      studentId: [this.dummy.studentId],
      scholarshipAwarded: [this.dummy.scholarshipAwarded],
      courseId: [this.dummy.courseId],
      totaltuitionfees: [this.dummy.totaltuitionfees],
      downpayment: [this.dummy.downpayment],
      paymentDeadLine: [this.dummy.paymentDeadLine],
      intake: [this.dummy.intake],
      payLink: [this.dummy.payLink],
      attendingClass: [this.dummy.attendingClass],
      installment: [this.dummy.installment]
    });
  }
  ngOnInit() {
    this.getRegistrationLetter(this.registrationLetterFrom.value);
  }
  public getRegistrationLetter(data: any) {
    this.http.post<ApiResponse>(`${this.api}/StudentAdmin/GetAcceptanceLetter`, data).subscribe({
      next: (response) => {
        if(!response.ok){
          console.error(response);
        }
        else{
          const byteCharacters = atob(response.result as string);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          this.pdfSrc = window.URL.createObjectURL(blob);
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  downloadRegistrationLetter() {
    if(!this.pdfSrc) alert("The PDF File Was Not Received");
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = this.pdfSrc;
    a.download = 'Registration Letter.pdf';
    a.click();
    window.URL.revokeObjectURL(this.pdfSrc);
    a.remove();
  }
  viewRegistrationLetter() {
    if(!this.pdfSrc) alert("The PDF File Was Not Received");
    let container = document.querySelector(".container");
    let iframe = document.createElement("iframe")
    iframe.src = this.pdfSrc;
    iframe.height = "800px";
    iframe.width = "100%";
    container?.append(iframe)
  }
  openOnNewTab(){
    window.open(this.pdfSrc)
  }
}
