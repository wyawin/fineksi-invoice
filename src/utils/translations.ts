export interface Translations {
  invoice: string;
  billTo: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  billingPeriod: string;
  paymentTerms: string;
  serviceDetails: string;
  serviceType: string;
  usage: string;
  free: string;
  rate: string;
  amount: string;
  subtotal: string;
  discount: string;
  tax: string;
  taxRounding: string;
  totalAmount: string;
  totalAmountGrossUp: string;
  paymentInformation: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  taxObjectCode: string;
  billingCode: string;
  signature: string;
  client: string;
  thankYou: string;
  paymentDue: string;
  paymentDue2: string;
  invoiceAmount: string;
  grossUpAmount: string;
  totalAll: string;
  services: {
    bankStatement: string;
    freeBankStatement: string;
    creditHistory: string;
    freeCreditHistory: string;
    income: string;
    freeIncome: string;
    idp: string;
    freeIdp: string;
    minimumCommitment: string;
  };
}

export const translations: Record<string, Translations> = {
  en: {
    invoice: 'INVOICE',
    billTo: 'Bill To',
    invoiceNumber: 'Invoice Number',
    date: 'Date',
    dueDate: 'Due Date',
    billingPeriod: 'Billing Period',
    paymentTerms: 'Payment Terms',
    serviceDetails: 'Service Details',
    serviceType: 'Description',
    usage: 'Qty',
    free: 'Free',
    rate: 'Price',
    amount: 'Amount',
    subtotal: 'Subtotal',
    discount: 'Discount',
    tax: 'Tax',
    taxRounding: 'Tax Rounding',
    totalAmount: 'Total Amount',
    totalAmountGrossUp: 'Total Gross-Up',
    paymentInformation: 'Payment Information',
    bankName: 'Bank Name',
    accountNumber: 'Account Number',
    accountName: 'Account Name',
    taxObjectCode: 'Kode Objek Pajak',
    billingCode: 'Kode Billing',
    signature: 'Signature',
    client: 'Client',
    thankYou: 'Thank you for trusting us!',
    paymentDue: 'Payment is due within',
    paymentDue2: 'days. Please include the invoice number on your payment.',
    invoiceAmount: 'Invoice Amount',
    grossUpAmount: 'GrossUp Amount',
    totalAll: 'Total All',
    services: {
      bankStatement: 'Bank Statement Analysis Usage',
      freeBankStatement: 'Free Bank Statement Analysis Usage',
      creditHistory: 'Credit History Usage',
      freeCreditHistory: 'Free Credit History Usage',
      income: 'Income Verification Usage',
      freeIncome: 'Free Income Verification Usage',
      idp: 'Intelligent Document Processing Usage',
      freeIdp: 'Free Intelligent Document Processing Usage',
      minimumCommitment: 'Minimum Commitment Usage'
    }
  },
  id: {
    invoice: 'FAKTUR',
    billTo: 'Ditagihkan Kepada',
    invoiceNumber: 'Nomor Faktur',
    date: 'Tanggal',
    dueDate: 'Jatuh Tempo',
    billingPeriod: 'Periode Tagihan',
    paymentTerms: 'Syarat Pembayaran',
    serviceDetails: 'Detail Layanan',
    serviceType: 'Deskripsi',
    usage: 'Qty',
    free: 'Gratis',
    rate: 'Harga',
    amount: 'Jumlah',
    subtotal: 'Subtotal',
    discount: 'Diskon',
    tax: 'Pajak',
    taxRounding: 'Pembulatan Pajak',
    totalAmount: 'Total Jumlah',
    totalAmountGrossUp: 'Total Gross-Up',
    paymentInformation: 'Informasi Pembayaran',
    bankName: 'Nama Bank',
    accountNumber: 'Nomor Rekening',
    accountName: 'Nama Rekening',
    taxObjectCode: 'Kode Objek Pajak',
    billingCode: 'Kode Billing',
    signature: 'Tanda Tangan',
    client: 'Klien',
    thankYou: 'Terima kasih telah mempercayai kami!',
    paymentDue: 'Pembayaran jatuh tempo dalam',
    paymentDue2: 'hari. Harap sertakan nomor faktur pada pembayaran Anda.',
    invoiceAmount: 'Jumlah Faktur',
    grossUpAmount: 'Jumlah GrossUp',
    totalAll: 'Total Semua',
    services: {
      bankStatement: 'Penggunaan Analisa Rekening Koran',
      freeBankStatement: 'Gratis Penggunaan Analisa Rekening Koran',
      creditHistory: 'Penggunaan Analisa Sejarah Pinjaman',
      freeCreditHistory: 'Gratis Penggunaan Analisa Sejarah Pinjaman',
      income: 'Penggunaan Verifikasi Pendapatan',
      freeIncome: 'Gratis Penggunaan Verifikasi Pendapatan',
      idp: 'Penggunaan Intelligent Document Processing',
      freeIdp: 'Gratis Penggunaan Intelligent Document Processing',
      minimumCommitment: 'Minimum Komitmen Penggunaan'
    }
  },
};

export const getTranslation = (language: string): Translations => {
  return translations[language] || translations.English;
};