import { Component } from '@angular/core';
import { CreateCertificate } from '../models/create-certificate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificateService } from '../services/certificate.service';

@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrl: './create-certificate.component.css'
})
export class CreateCertificateComponent {
  certificateForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private certificateService:CertificateService) {
    this.certificateForm = this.formBuilder.group({
      course: ['', Validators.required],
      issuer: ['', Validators.required],
      recipientName: ['', Validators.required],
      issuanceDate: ['', Validators.required],
      expirationDate: ['']
    });
  }

  onSubmit(): void {
    if (this.certificateForm.invalid) {
      alert("Invalid Data");
      return;
    }

    let data: CreateCertificate = {
      course: this.certificateForm.get("course")!.value,
      issuer: this.certificateForm.get("issuer")!.value,
      recipientName: this.certificateForm.get("recipientName")!.value,
      issuanceDate: this.certificateForm.get("issuanceDate")!.value,
      expirationDate:this.certificateForm.get("expirationDate")?.value
    }
    

    this.certificateService.createCertificate(data).subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = `${data.recipientName} certificate.pdf`;
        // Append the link to the body
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Clean up resources
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      },
      error: (error) => {
        console.error('Error downloading certificate:', error);
      }
    });
  }
}
