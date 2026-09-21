import { defineView } from '@objectstack/spec/ui';

export const InvoiceViews = defineView({
  object: 'billing_app_invoice',
  list: {
    type: 'grid', label: 'Invoices',
    columns: ['company_id', 'invoice_number', 'supplier_id', 'purchase_order_id', 'invoice_date', 'due_date', 'status', 'total'],
    sort: [{ field: 'due_date', order: 'asc' }],
  },
  listViews: {
    open: {
      type: 'grid', label: 'Open invoices',
      columns: ['company_id', 'supplier_id', 'invoice_number', 'purchase_order_id', 'invoice_date', 'due_date', 'status', 'total'],
      filter: [{ field: 'status', operator: 'equals', value: 'open' }],
      sort: [{ field: 'due_date', order: 'asc' }],
    },
    overdue: {
      type: 'grid', label: 'Overdue invoices',
      columns: ['company_id', 'supplier_id', 'invoice_number', 'purchase_order_id', 'invoice_date', 'due_date', 'status', 'total'],
      filter: [
        { field: 'status', operator: 'equals', value: 'open' },
        { field: 'due_date', operator: 'less_than', value: '{today}' },
      ],
      sort: [{ field: 'due_date', order: 'asc' }],
    },
    paid: {
      type: 'grid', label: 'Paid invoices',
      columns: ['company_id', 'supplier_id', 'invoice_number', 'purchase_order_id', 'invoice_date', 'due_date', 'status', 'total'],
      filter: [{ field: 'status', operator: 'equals', value: 'paid' }],
      sort: [{ field: 'due_date', order: 'desc' }],
    },
  },
  form: {
    type: 'simple', title: 'Invoice details', layout: 'vertical',
    sections: [{ label: 'Invoice information', fields: ['company_id', 'invoice_number', 'supplier_id', 'purchase_order_id', 'invoice_date', 'due_date', 'status', 'notes', 'internal_finance_notes', 'total'] }],
    subforms: [{ childObject: 'billing_app_invoice_line', title: 'Invoice lines', addLabel: 'Add line' }],
  },
});
