import { Injectable } from '@angular/core';
import { CreateCertificate } from '../models/create-certificate';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  constructor(private http: HttpClient) { }
  createCertificate(data: CreateCertificate) {
    const queryParams = `?Course=${data.course}&Issuer=${data.issuer}&RecipientName=${data.recipientName}&IssuanceDate=${data.issuanceDate}&ExpirationDate=${data.expirationDate}`;
    return this.http.get(`${environment.apiEndpoint}/Certificate` + queryParams, {
      responseType: 'blob'
    })
  }
}
