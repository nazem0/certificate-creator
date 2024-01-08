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
    "studentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "scholarshipAwarded": 0,
    "courseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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
    this.http.post<ApiResponse>(`${this.api}/StudentAdmin/DemoSendAcceptanceLetter`, data).subscribe({
      next: (response) => {
        const byteCharacters = atob(response.result as string);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        this.pdfSrc = window.URL.createObjectURL(blob);
      },
      error: (error) => {
        console.error('Error downloading certificate:', error);
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
    let iframe = document.createElement("iframe")
    iframe.src = this.pdfSrc;
    iframe.height = "800px";
    iframe.width = "100%";
    document.body.append(iframe)
  }
  openOnNewTab(){
    window.open(this.pdfSrc,"_blank")
  }
}
