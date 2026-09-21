import { defineView } from '@objectstack/spec/ui';

export const SupplierViews = defineView({
  name: 'billing_app_supplier',
  object: 'billing_app_supplier',
  list: {
    type: 'grid',
    label: 'All suppliers',
    columns: ['company_id', 'name', 'supplier_code', 'contact_email', 'is_active', 'notes'],
    sort: [{ field: 'name', order: 'asc' }],
  },
  form: {
    type: 'simple',
    title: 'Supplier details',
    layout: 'vertical',
    sections: [{ label: 'Supplier information', fields: ['company_id', 'name', 'supplier_code', 'contact_email', 'is_active', 'notes'] }],
  },
});
