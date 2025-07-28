import React, { useState } from 'react';
import { Invoice } from './types/Invoice';
import ExcelUploader from './components/ExcelUploader';
import InvoiceList from './components/InvoiceList';
import { generateInvoicePDF } from './utils/pdfGenerator.tsx';
import { Receipt, Sparkles } from 'lucide-react';

function App() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showUploader, setShowUploader] = useState(true);

  const handleDataLoaded = (newInvoices: Invoice[]) => {
    setInvoices(newInvoices);
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
          <ExcelUploader onDataLoaded={handleDataLoaded} />
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