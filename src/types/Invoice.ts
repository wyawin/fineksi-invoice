export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  client: {
    name: string;
    legalName: string;
    email: string;
    address: string;
    attn: string;
  };
  company: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    email: string;
    phone: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  total: number;
  notes?: string;
  // New fields from Excel structure
  paymentTerms: number;
  language: string;
  grossUp: number;
  withSignature: boolean;
  withTaxCode: boolean;
  grossUpInAdvance: boolean;
  totalAll: number;
  amountWhichShouldInvoice: number;
  discount: number;
  discountAmount: number;
  invoiceAmount: number;
  minCommitment: number;
  usageBankStatement: number;
  freeBankStatement: number;
  usageSLIK: number;
  freeSLIK: number;
  usageIncome: number;
  usageKYC: number;
  usageInvoice: number;
  freeInvoice: number;
  pricingBankStatement: number;
  pricingSLIK: number;
  pricingIncome: number;
  pricingKYC: number;
  pricingInvoice: number;
  totalBankStatement: number;
  totalSLIK: number;
  totalIncome: number;
  totalKYC: number;
  totalInvoice: number;
  grossUpAmount: number;
  bsGUAmount: number;
  slikGUAmount: number;
  incomeGUAmount: number;
  idpGUAmount: number;
  belowMinimum: boolean;
  pefindoGUAmount: number;
  taxRounding: string;
  emailSent: boolean;
  tanggalPelunasan: string;
  showDecimalItem: boolean;
}