import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, pdf } from '@react-pdf/renderer';
import { Invoice } from '../types/Invoice';
import { HeaderConfig } from '../types/HeaderConfig';
import { getTranslation } from './translations';

const formatCurrency = (amount: any, showDecimalItem: boolean = false) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: showDecimalItem ? 2 : 0, 
    minimumFractionDigits: 0, 
  }).format(amount);
};

const formatDate = (date: any, language: string) => {
  return new Intl.DateTimeFormat(`${language}-US`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 0,
  },
  header: {
    backgroundColor: '#072ba4',
    padding: 12,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center'
  },
  logo: {
    height: 30,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  companyAddress: {
    fontSize: 8,
    color: '#FFFFFF',
    lineHeight: 1.4,
    width: 200
  },
  content: {
    padding: 20
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  invoiceDetailsSection: {
    alignItems: 'flex-end',
  },
  invoiceDetails: {
    fontSize: 11,
    color: '#666666',
    lineHeight: 1.5,
    textAlign: 'right',
  },
  statusBadge: {
    backgroundColor: '#E5E7EB',
    color: '#374151',
    padding: '4 12',
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  billToSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  clientInfo: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.5,
    width: 250,
  },
  table: {
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderBottom: '1 solid #E5E7EB',
  },
  tableHeaderCell: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: '1 solid #F3F4F6',
  },
  tableRowAlt: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#FAFAFA',
    borderBottom: '1 solid #F3F4F6',
  },
  tableCell: {
    fontSize: 9,
    color: '#374151',
    textAlign: 'left',
  },
  tableCellCenter: {
    fontSize: 9,
    color: '#374151',
    textAlign: 'center',
  },
  tableCellRight: {
    fontSize: 9,
    color: '#374151',
    textAlign: 'right',
  },
  summarySection: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 10,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 10,
    color: '#000000',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    borderTop: '1 solid #000000',
    paddingTop: 8,
    marginTop: 8,
  },
  totalRowInAdvance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    borderBottom: '1 solid #000000',
    paddingBottom: 8,
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f51fe',
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f51fe',
  },
  notesSection: {
    marginBottom: 20,
  },
  notesText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.5,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 4,
  },
  paymentInfoSection: {
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 4,
  },
  paymentInformationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  signatureSection: {
    marginBottom: 30,
    padding: 20,
  },
  signatureTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  signatureBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureItem: {
    width: '30%',
  },
  signatureLabel: {
    fontSize: 10,
    color: '#666666',
  },
  signatureLine: {
    borderBottom: '1 solid #000000',
    width: '100%',
    marginBottom: 5,
    marginTop: 100,
  },
  signatureName: {
    fontSize: 9,
    color: '#666666',
    lineHeight: 1.4
  },
  signatureImage: {
    width: 40,
    marginBottom: 10,
    position: 'absolute', 
    left: 40,
    top: 20
  },
  stampImage: {
    width: 100,
    position: 'absolute', 
    left: 10,
    top: 35
  },
  signatureContainer: {
    position: 'relative',
  },
  paymentInfoText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.4,
  },
  paymentInfoTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  footer: {
    backgroundColor: '#F3F4F6',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    alignItems: 'center',
    fontSize: 8,
    color: '#072ba4',
    lineHeight: 1.4,
  },
  thankYou: {
    color: '#1f51fe',
    fontSize: 10,
    fontWeight: 'bold'
  }
});

// PDF Document Component
const InvoicePDF: React.FC<{ invoice: Invoice; headerConfig?: HeaderConfig | null }> = ({ invoice, headerConfig }) => {
  const t = getTranslation(invoice.language);
  let services: any = [];
  if(invoice.belowMinimum) {
    services = [
      { name: t.services.minimumCommitment, usage: 1, pricing: invoice.grossUpAmount, total: Math.round(1 * invoice.grossUpAmount) }
    ]
  } else {
    services = [
      { name: t.services.bankStatement, usage: invoice.usageBankStatement, pricing: invoice.bsGUAmount, total: Math.round(invoice.usageBankStatement * invoice.bsGUAmount) },
      { name: t.services.freeBankStatement, usage: invoice.freeBankStatement * -1, pricing: invoice.bsGUAmount, total: Math.round(invoice.freeBankStatement * invoice.bsGUAmount) },
      { name: t.services.creditHistory, usage: invoice.usageSLIK, pricing: invoice.slikGUAmount, total: Math.round(invoice.usageSLIK * invoice.slikGUAmount) },
      { name: t.services.freeCreditHistory, usage: invoice.freeSLIK * -1, pricing: invoice.slikGUAmount, total: Math.round(invoice.freeSLIK * invoice.slikGUAmount) },
      { name: t.services.income, usage: invoice.usageIncome, pricing: invoice.incomeGUAmount, total: Math.round(invoice.usageIncome * invoice.incomeGUAmount) },
      { name: t.services.idp, usage: invoice.usageInvoice, pricing: invoice.idpGUAmount, total: Math.round(invoice.usageInvoice * invoice.idpGUAmount) },
      { name: t.services.idp, usage: invoice.freeInvoice * -1, pricing: invoice.idpGUAmount, total: Math.round(invoice.freeInvoice * invoice.idpGUAmount) }
    ].filter(service => service.usage > 0);
  }
  

  const totalSummary: any = () => {
    const totalAmount = services.reduce((acc: Number, currentValue: any) => acc + currentValue.total, 0);
    if(invoice.grossUpInAdvance) {
      const divider = 100 - invoice.grossUp;
      const amountGrossUp = Math.round((totalAmount / divider) * 100);
      const taxAmount = amountGrossUp - totalAmount;

      return {
        amountGrossUp: amountGrossUp,
        taxAmount,
        amountNet: totalAmount
      }
    } else {
      let taxAmount = 0;
      if(invoice.taxRounding === "normalRound") {
        taxAmount = Math.round((totalAmount * invoice.grossUp )/100);
      } else {
        taxAmount = Math.floor((totalAmount * invoice.grossUp)/100);
      }
      const amountNet = totalAmount - taxAmount;
      return {
        amountGrossUp: totalAmount,
        taxAmount,
        amountNet
      }
    }
    
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {headerConfig?.logo && (
            <Image
              style={styles.logo}
              src={headerConfig.logo}
            />
          )}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>
              {headerConfig?.companyName}
            </Text>
            <Text style={styles.companyAddress}>
              {headerConfig?.companyAddress}{'\n'}
              {headerConfig?.companyEmail}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.invoiceHeader}>
            <View style={styles.billToSection}>
              <Text style={styles.sectionTitle}>{t.billTo}:</Text>
              <Text style={styles.clientInfo}>
                {invoice.client.legalName}{'\n'}
                {invoice.client.attn}{'\n'}
                {invoice.client.address}
              </Text>
            </View>
            <View style={styles.invoiceDetailsSection}>
              {/* Invoice Header */}
              <Text style={styles.invoiceTitle}>INVOICE</Text>
              <Text style={styles.invoiceDetails}>
                {t.invoiceNumber}: {invoice.invoiceNumber}{'\n'}
                {t.date}: {formatDate(invoice.date, invoice.language)}{'\n'}
                {t.dueDate}: {formatDate(invoice.dueDate, invoice.language)}{'\n'}
                {t.billingPeriod}: {formatDate(invoice.billingFromDate, invoice.language)} - {formatDate(invoice.billingToDate, invoice.language)}
              </Text>
            </View>
          </View>

          {/* Service Details Table */}
          <View style={styles.table}>
            <Text style={styles.sectionTitle}>{t.serviceDetails}</Text>
            
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { width: '45%' }]}>{t.serviceType}</Text>
              <Text style={[styles.tableHeaderCell, { width: '15%' }]}>{t.usage}</Text>
              <Text style={[styles.tableHeaderCell, { width: '17.5%' }]}>{t.rate}</Text>
              <Text style={[styles.tableHeaderCell, { width: '22.5%' }]}>{t.amount}</Text>
            </View>

            {/* Table Rows */}
            {services.map((service: any, index: number) => (
              <View key={index} style={index % 2 === 1 ? styles.tableRowAlt : styles.tableRow}>
                <Text style={[styles.tableCell, { width: '45%' }]}>{service.name}</Text>
                <Text style={[styles.tableCellCenter, { width: '15%' }]}>{service.usage}</Text>
                <Text style={[styles.tableCellRight, { width: '17.5%' }]}>{formatCurrency(service.pricing, invoice.showDecimalItem)}</Text>
                <Text style={[styles.tableCellRight, { width: '22.5%' }]}>{formatCurrency(service.total)}</Text>
              </View>
            ))}
          </View>

          {/* Summary Section */}
          {invoice.grossUpInAdvance ? 
            <View style={styles.summarySection}>
              <View style={styles.totalRowInAdvance}>
                <Text style={styles.totalLabel}>{t.totalAmount}:</Text>
                <Text style={styles.totalValue}>{formatCurrency(totalSummary().amountNet)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t.totalAmountGrossUp}:</Text>
                <Text style={styles.summaryValue}>{formatCurrency(totalSummary().amountGrossUp)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t.tax}:</Text>
                <Text style={styles.summaryValue}>{formatCurrency(totalSummary().taxAmount)}</Text>
              </View>

              
            </View>
            :
            <View style={styles.summarySection}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t.totalAmountGrossUp}:</Text>
                <Text style={styles.summaryValue}>{formatCurrency(totalSummary().amountGrossUp)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t.tax}:</Text>
                <Text style={styles.summaryValue}>{formatCurrency(totalSummary().taxAmount)}</Text>
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>{t.totalAmount}:</Text>
                <Text style={styles.totalValue}>{formatCurrency(totalSummary().amountNet)}</Text>
              </View>
            </View>
          }

          {/* Payment Information */}
          <View style={styles.paymentInfoSection}>
            <Text style={styles.paymentInfoTitle}>{t.paymentInformation}:</Text>
            <View style={styles.paymentInformationContent}>
              <View style={styles.billToSection}>
                <Text style={styles.paymentInfoText}>
                  {t.bankName}: {headerConfig?.bankName}{'\n'}
                  {t.accountNumber}: {headerConfig?.bankAccountNumber}{'\n'}
                  {t.accountName}: {headerConfig?.companyName}
                </Text>
              </View>
              {invoice.withTaxCode ? 
              <View style={styles.invoiceDetailsSection}>
                <Text style={styles.paymentInfoText}>
                  {t.taxObjectCode}: {headerConfig?.taxObjectCode}{'\n'}
                  {t.billingCode}: {headerConfig?.billingCode}
                </Text>
              </View>
              : null}
            </View>
          </View>
        </View>

        {/* Signature Section */}
        {invoice.withSignature ? 
          <View style={styles.signatureSection}>
            <View style={styles.signatureBox}>
              <View style={styles.signatureItem}>
                <Text style={styles.signatureLabel}>{headerConfig?.companyName}</Text>
                <View style={styles.signatureContainer}>
                  <Image
                    style={styles.signatureImage}
                    src={headerConfig?.signature}
                  />
                  <Image
                    style={styles.stampImage}
                    src={headerConfig?.stamp}
                  />
                </View>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureName}>{headerConfig?.signatureName}{'\n'}{invoice.language === "en" ? headerConfig?.signatureRoleEN : headerConfig?.signatureRole}</Text>
              </View>
            </View>
          </View>
          :
          <View style={styles.signatureSection}>
            <View style={styles.signatureBox}>
              <View style={styles.signatureItem}>
                <Text style={styles.signatureLabel}>{headerConfig?.companyName}</Text>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureName}>{headerConfig?.signatureName}{'\n'}{invoice.language === "en" ? headerConfig?.signatureRoleEN : headerConfig?.signatureRole}</Text>
              </View>
            </View>
          </View>
        }

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={{ textAlign: 'center' }}>
            <Text style={styles.thankYou}>{t.thankYou}{'\n'}</Text>
            {t.paymentDue} {invoice.paymentTerms} {t.paymentDue2}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Export function to generate and download PDF
export const generateInvoicePDF = async (invoice: Invoice, headerConfig?: HeaderConfig | null): Promise<void> => {
  try {
    const blob = await pdf(<InvoicePDF invoice={invoice} headerConfig={headerConfig} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice-${invoice.invoiceNumber}-${invoice.client.legalName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Export the PDF component for potential use in other contexts
export { InvoicePDF };