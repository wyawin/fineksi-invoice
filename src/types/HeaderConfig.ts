export interface HeaderConfig {
    logo: string; // base64 encoded image or URL
    companyName: string;
    companyAddress: string;
    companyEmail: string;
    signature: string;
    stamp: string;
    bankName: string;
    bankAccountNumber: string;
    taxObjectCode: string;
    billingCode: string;
    signatureName: string;
    signatureRole: string;
    signatureRoleEN: string;
  }
  
  export interface AppConfig {
    header: HeaderConfig;
  }