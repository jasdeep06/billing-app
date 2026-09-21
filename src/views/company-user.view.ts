import { defineView } from '@objectstack/spec/ui';

export const CompanyUserViews = defineView({
  name: 'billing_app_company_user',
  object: 'billing_app_company_user',
  list: {
    type: 'grid',
    label: 'Company users',
    columns: ['company_id', 'user_id', 'access_level', 'is_active'],
    sort: [{ field: 'company_id', order: 'asc' }],
  },
  form: {
    type: 'simple',
    title: 'Assign user to company',
    layout: 'vertical',
    sections: [{ label: 'Membership', fields: ['company_id', 'user_id', 'access_level', 'is_active'] }],
  },
});
