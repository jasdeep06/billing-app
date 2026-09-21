import { ObjectSchema, Field } from '@objectstack/spec/data';
import { P } from '@objectstack/spec';

const usd = { precision: 2, currencyMode: 'fixed' as const, defaultCurrency: 'USD' };

export const InvoiceLine = ObjectSchema.create({
  name: 'billing_app_invoice_line',
  label: 'Invoice line',
  pluralLabel: 'Invoice lines',
  icon: 'list',
  nameField: 'description',
  sharingModel: 'controlled_by_parent',
  fields: {
    invoice_id: { type: 'master_detail', label: 'Invoice', reference: 'billing_app_invoice', required: true, deleteBehavior: 'cascade', inlineEdit: true },
    description: Field.text({ label: 'Description', required: true, maxLength: 250 }),
    quantity: Field.number({ label: 'Quantity', required: true, min: 1, precision: 0 }),
    unit_price: Field.currency({ label: 'Unit price', required: true, currencyConfig: usd, min: 0 }),
    amount: Field.currency({ label: 'Line amount', currencyConfig: usd, readonly: true }),
  },
  validations: [{
    name: 'positive_whole_quantity', type: 'script', condition: P`record.quantity <= 0 || record.quantity != int(record.quantity)`,
    message: 'Quantity must be a positive whole number', severity: 'error', events: ['insert', 'update'],
  }, {
    name: 'non_negative_unit_price', type: 'script', condition: P`record.unit_price < 0`,
    message: 'Unit price cannot be negative', severity: 'error', events: ['insert', 'update'],
  }],
  enable: { apiEnabled: true, searchable: false },
});
