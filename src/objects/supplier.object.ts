import { ObjectSchema, Field } from '@objectstack/spec/data';

export const Supplier = ObjectSchema.create({
  name: 'billing_app_supplier',
  label: 'Supplier',
  pluralLabel: 'Suppliers',
  icon: 'building-2',
  nameField: 'name',
  sharingModel: 'public_read_write',
  searchableFields: ['name', 'supplier_code', 'contact_email', 'notes'],
  fields: {
    company_id: Field.text({ label: 'Company', required: true, defaultValue: 'northstar_services', readonly: true }),
    name: Field.text({ label: 'Supplier name', required: true, maxLength: 200 }),
    supplier_code: Field.text({ label: 'Supplier code', required: true, unique: 'global', maxLength: 50 }),
    contact_email: Field.email({ label: 'Contact email' }),
    is_active: Field.boolean({ label: 'Active', defaultValue: true }),
    notes: Field.textarea({ label: 'Notes' }),
  },
  enable: { apiEnabled: true, searchable: true },
});
