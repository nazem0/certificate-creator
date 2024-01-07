export interface CreateCertificate {
    course: string;
    issuer: string;
    recipientName: string;
    issuanceDate: string;
    expirationDate?: string | null;
}
