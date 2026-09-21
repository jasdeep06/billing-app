import { ObjectSchema, Field } from '@objectstack/spec/data';

/** Per-company user membership and role assignment. */
export const CompanyUser = ObjectSchema.create({
  name: 'billing_app_company_user',
  label: 'Company user',
  pluralLabel: 'Company users',
  icon: 'users',
  nameField: 'user_id',
  sharingModel: 'private',
  fields: {
    company_id: Field.lookup('billing_app_company', { label: 'Company', required: true }),
    user_id: Field.user({ label: 'User', required: true }),
    access_level: Field.select({
      label: 'Access level', required: true,
      options: [
        { label: 'Submitter', value: 'submitter' },
        { label: 'Finance Analyst', value: 'finance_analyst' },
        { label: 'Approver', value: 'approver' },
        { label: 'Auditor', value: 'auditor' },
        { label: 'Company Administrator', value: 'company_administrator' },
      ],
    }),
    is_active: Field.boolean({ label: 'Active', defaultValue: true }),
  },
  enable: { apiEnabled: true, searchable: true },
});
