export interface HeaderConfig {
    logo: string; // base64 encoded image or URL
    companyName: string;
    companyAddress: string;
    companyEmail: string;
    signature: string;
    stamp: string;
  }
  
  export interface AppConfig {
    header: HeaderConfig;
  }