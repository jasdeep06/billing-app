import { ObjectSchema, Field } from '@objectstack/spec/data';
import { P } from '@objectstack/spec';

const usd = { precision: 2, currencyMode: 'fixed' as const, defaultCurrency: 'USD' };

export const Invoice = ObjectSchema.create({
  name: 'billing_app_invoice',
  label: 'Invoice',
  pluralLabel: 'Invoices',
  icon: 'file-text',
  nameField: 'invoice_number',
  sharingModel: 'public_read_write',
  searchableFields: ['invoice_number', 'notes'],
  fields: {
    company_id: Field.text({ label: 'Company', required: true, defaultValue: 'northstar_services', readonly: true }),
    invoice_number: Field.text({ label: 'Invoice number', required: true, maxLength: 50 }),
    supplier_id: { type: 'lookup', label: 'Supplier', reference: 'billing_app_supplier', required: true },
    purchase_order_id: {
      type: 'lookup', label: 'Related purchase order', reference: 'billing_app_purchase_order',
      required: false, dependsOn: ['supplier_id'],
    },
    invoice_date: Field.date({ label: 'Invoice date', required: true }),
    due_date: Field.date({ label: 'Due date', required: true }),
    status: Field.select({ options: [
      { label: 'Draft', value: 'draft' }, { label: 'Open', value: 'open' },
      { label: 'Paid', value: 'paid' }, { label: 'Cancelled', value: 'cancelled' },
    ], label: 'Status', required: true, defaultValue: 'draft' }),
    notes: Field.textarea({ label: 'Notes' }),
    internal_finance_notes: Field.textarea({ label: 'Internal finance notes', requiredPermissions: ['view_internal_finance_notes'], readonlyWhen: P`record.status in ['paid', 'cancelled']` }),
    total: {
      type: 'summary', label: 'Invoice total', readonly: true,
      summaryOperations: { object: 'billing_app_invoice_line', field: 'amount', function: 'sum' },
      currencyConfig: usd,
    },
  },
  indexes: [{ fields: ['invoice_number'], unique: 'global' }],
  validations: [{
    name: 'due_date_on_or_after_invoice_date', type: 'cross_field',
    condition: P`record.due_date < record.invoice_date`,
    message: 'Due date cannot be before invoice date', severity: 'error', fields: ['invoice_date', 'due_date'],
  }, {
    name: 'paid_cancelled_are_terminal', type: 'script',
    condition: P`previous.status in ['paid', 'cancelled'] && record.status == previous.status`,
    message: 'Paid and Cancelled invoices are read-only', severity: 'error', events: ['update'],
  }],
  enable: { apiEnabled: true, searchable: true },
});
