import React, { useState } from 'react';
import { Invoice } from './types/Invoice';
import ExcelUploader from './components/ExcelUploader';
import InvoiceList from './components/InvoiceList';
import { generateInvoicePDF } from './utils/pdfGenerator.tsx';
import { Receipt, Sparkles, Calendar } from 'lucide-react';

function App() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showUploader, setShowUploader] = useState(true);
  
  // Date states
  const [invoiceDate, setInvoiceDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  
  const [billingFromDate, setBillingFromDate] = useState(() => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split('T')[0];
  });
  
  const [billingToDate, setBillingToDate] = useState(() => {
    const date = new Date();
    date.setDate(0);
    date.setMonth(date.getMonth());
    return date.toISOString().split('T')[0];
  });

  const handleDataLoaded = (newInvoices: Invoice[], dateOverrides: { invoiceDate: string; billingFromDate: string; billingToDate: string }) => {
    // Update invoices with the selected dates
    const updatedInvoices = newInvoices.map(invoice => ({
      ...invoice,
      date: dateOverrides.invoiceDate,
      billingFromDate: dateOverrides.billingFromDate,
      billingToDate: dateOverrides.billingToDate
    }));
    setInvoices(updatedInvoices);
    setShowUploader(false);
  };

  const handleGeneratePDF = (invoice: Invoice) => {
    generateInvoicePDF(invoice).catch(error => {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    });
  };

  const handleSelectInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleBack = () => {
    setSelectedInvoice(null);
  };

  const handleShowUploader = () => {
    setShowUploader(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <Receipt className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Invoice Generator</h1>
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional invoice management system with PDF generation capabilities. 
            Manage your invoices and generate professional PDF documents.
          </p>
        </div>

        {/* Main Content */}
        {showUploader && (
          <>
            {/* Date Selection Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Invoice & Billing Period Settings</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="invoiceDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Date
                  </label>
                  <input
                    type="date"
                    id="invoiceDate"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="billingFromDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Billing Period From
                  </label>
                  <input
                    type="date"
                    id="billingFromDate"
                    value={billingFromDate}
                    onChange={(e) => setBillingFromDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="billingToDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Billing Period To
                  </label>
                  <input
                    type="date"
                    id="billingToDate"
                    value={billingToDate}
                    onChange={(e) => setBillingToDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <ExcelUploader 
              onDataLoaded={handleDataLoaded}
              dateOverrides={{
                invoiceDate,
                billingFromDate,
                billingToDate
              }}
            />
          </>
        )}
        
        {selectedInvoice ? (
          <></>
        ) : (
          <>
            {!showUploader && (
              <div className="mb-4 text-center">
                <button
                  onClick={handleShowUploader}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-150"
                >
                  Upload New Excel File
                </button>
              </div>
            )}
          <InvoiceList
              invoices={invoices}
            onSelectInvoice={handleSelectInvoice}
            onGeneratePDF={handleGeneratePDF}
          />
          </>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Built with modern web technologies • Professional invoice management made simple
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;