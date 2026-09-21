import { defineDataset } from '@objectstack/spec/ui';

export const InvoiceMetrics = defineDataset({
  name: 'billing_app_invoice_metrics',
  label: 'Invoice metrics',
  description: 'Live invoice counts and USD value measures for Invoice Review.',
  object: 'billing_app_invoice',
  include: ['supplier_id', 'purchase_order_id'],
  dimensions: [
    { name: 'company', label: 'Company', field: 'company_id', type: 'string' },
    { name: 'status', label: 'Status', field: 'status', type: 'string' },
    { name: 'supplier', label: 'Supplier', field: 'supplier_id.name', type: 'string' },
  ],
  measures: [
    { name: 'invoice_count', label: 'Invoice count', aggregate: 'count' },
    { name: 'invoice_value', label: 'Invoice value', aggregate: 'sum', field: 'total', currency: 'USD', format: '0,0.00' },
  ],
});
