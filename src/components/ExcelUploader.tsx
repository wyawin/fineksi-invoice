import React, { useCallback } from 'react';
import { Upload, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Invoice } from '../types/Invoice';

interface ExcelUploaderProps {
  onDataLoaded: (invoices: Invoice[], dateOverrides: { invoiceDate: string; billingFromDate: string; billingToDate: string }) => void;
  dateOverrides: {
    invoiceDate: string;
    billingFromDate: string;
    billingToDate: string;
  };
}

const handleTrueFalse = (value: string) => {
  return value.toString() === 'true' ? true : false;
}

const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onDataLoaded, dateOverrides }) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        // Transform Excel data to Invoice format
        const invoices: Invoice[] = jsonData.map((row: any, index: number) => {
          // set Due Date
          const invoiceDate = dateOverrides.invoiceDate;
          const invoiceDateType = new Date(invoiceDate)
          const dueDate = new Date(invoiceDateType.setDate((new Date(invoiceDate)).getDate() +  Number(row['PaymentTerms']))).toISOString().split('T')[0]
          return (
            {
              id: (index + 1).toString(),
              invoiceNumber: row['InvoiceNumber'] || `${String(index + 1).padStart(3, '0')}`,
              date: dateOverrides.invoiceDate || new Date().toISOString().split('T')[0],
              dueDate: dueDate,
              status: (row['Status']?.toLowerCase() || 'draft') as 'draft' | 'sent' | 'paid' | 'overdue',
              client: {
                name: row['Client'] || 'Unknown Client',
                legalName: row['Legal Name'] || row['Client'] || 'Unknown Client',
                email: row['Email Sent'] || 'client@example.com',
                address: row['Address'] || 'Address not provided',
                attn: row['Attn'] || ''
              },
              subtotal: Number(row['Invoice Amount']) || 0,
              taxRate: 11,
              total: Number(row['Total All']) || 0,
              notes: row['Notes'] || '',
              // New fields from Excel structure
              billingFromDate: dateOverrides.billingFromDate,
              billingToDate: dateOverrides.billingToDate,
              paymentTerms: Number(row['PaymentTerms']) || 14,
              language: row['Language'] || 'English',
              grossUp: row['GrossUp'],
              withSignature: Boolean(handleTrueFalse(row['WithSignature'])),
              withTaxCode: Boolean(handleTrueFalse(row['WithTaxCode'])),
              grossUpInAdvance: Boolean(handleTrueFalse(row['GrossUpInAdvance'])),
              showDecimalItem: Boolean(handleTrueFalse(row['Show Decimals Items'])),
              totalAll: Number(row['Total All']) || 0,
              amountWhichShouldInvoice: Number(row['Amount Which Should Invoice']) || 0,
              discount: Number(row['Discount']) || 0,
              discountAmount: Number(row['Discount Amount']) || 0,
              invoiceAmount: Number(row['Invoice Amount']) || 0,
              minCommitment: Number(row['Min Commitment']) || 0,
              usageBankStatement: Number(row['Usage Bank Statement']) || 0,
              freeBankStatement: Number(row['Free Bank Statement']) || 0,
              usageSLIK: Number(row['Usage SLIK']) || 0,
              freeSLIK: Number(row['Free SLIK']) || 0,
              usageIncome: Number(row['Usage Income']) || 0,
              usageKYC: Number(row['Usage KYC']) || 0,
              usageInvoice: Number(row['Usage Invoice']) || 0,
              freeInvoice: Number(row['Free Invoice']) || 0,
              pricingBankStatement: Number(row['Pricing Bank Statement']) || 0,
              pricingSLIK: Number(row['Pricing SLIK']) || 0,
              pricingIncome: Number(row['Pricing Income']) || 0,
              pricingKYC: Number(row['Pricing KYC']) || 0,
              pricingInvoice: Number(row['Pricing Invoice']) || 0,
              totalBankStatement: Number(row['Total Bank Statement']) || 0,
              totalSLIK: Number(row['Total SLIK']) || 0,
              totalIncome: Number(row['Total Income']) || 0,
              totalKYC: Number(row['Total KYC']) || 0,
              totalInvoice: Number(row['Total Invoice']) || 0,
              grossUpAmount: Number(row['GrossUp Amount']) || 0,
              bsGUAmount: Number(row['BS GU Amount']) || 0,
              slikGUAmount: Number(row['SLIK GU Amount']) || 0,
              incomeGUAmount: Number(row['Income GU Amount']) || 0,
              idpGUAmount: Number(row['IDP GU Amount']) || 0,
              belowMinimum: Boolean(handleTrueFalse(row['Below Minimum'])),
              pefindoGUAmount: Number(row['Pefindo GU Amount']) || 0,
              taxRounding: row['taxRounding'],
              emailSent: Boolean(row['Email Sent']),
              tanggalPelunasan: row['Tanggal Pelunsan'] || '',
              customItems: row['Custom Items'] || '',
              customItemsQty: row['Custom Items Qty'] || '',
              customItemsPrice: row['Custom Items Price'] || ''
            }
          )
        }
      );

        onDataLoaded(invoices, dateOverrides);
      } catch (error) {
        console.error('Error parsing file:', error);
        alert('Error parsing file. Please check the format and try again.');
      }
    };
    reader.readAsArrayBuffer(file);
  }, [onDataLoaded, dateOverrides]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="text-center">
        <FileSpreadsheet className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload File</h3>
        <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-150 cursor-pointer">
          <Upload className="w-4 h-4" />
          Choose File
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default ExcelUploader;