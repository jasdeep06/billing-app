import { ObjectSchema, Field } from '@objectstack/spec/data';

export const Company = ObjectSchema.create({
  name: 'billing_app_company',
  label: 'Company',
  pluralLabel: 'Companies',
  icon: 'building',
  nameField: 'name',
  sharingModel: 'public_read_write',
  fields: {
    name: Field.text({ label: 'Company name', required: true }),
    company_code: Field.text({ label: 'Company code', required: true, unique: 'global' }),
  },
  enable: { apiEnabled: true, searchable: true },
});
