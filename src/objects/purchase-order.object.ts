import { ObjectSchema, Field } from '@objectstack/spec/data';

const usd = { precision: 2, currencyMode: 'fixed' as const, defaultCurrency: 'USD' };

export const PurchaseOrder = ObjectSchema.create({
  name: 'billing_app_purchase_order',
  label: 'Purchase Order',
  pluralLabel: 'Purchase Orders',
  icon: 'clipboard-list',
  nameField: 'po_number',
  sharingModel: 'public_read_write',
  searchableFields: ['po_number'],
  fields: {
    company_id: Field.text({ label: 'Company', required: true, defaultValue: 'northstar_services' }),
    po_number: Field.text({ label: 'PO number', required: true, maxLength: 50 }),
    supplier_id: { type: 'lookup', label: 'Supplier', reference: 'billing_app_supplier', required: true },
    order_date: Field.date({ label: 'Order date', required: true }),
    expected_total: Field.currency({ label: 'Expected total', required: true, currencyConfig: usd }),
    status: Field.select({ options: [
      { label: 'Draft', value: 'draft' }, { label: 'Open', value: 'open' }, { label: 'Closed', value: 'closed' },
    ], label: 'Status', required: true, defaultValue: 'draft' }),
  },
  indexes: [{ fields: ['po_number'], unique: 'global' }],
  enable: { apiEnabled: true, searchable: true },
});
