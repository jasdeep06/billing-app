import { App } from '@objectstack/spec/ui';

export const InvoiceReviewApp = App.create({
  name: 'invoice_review',
  label: 'Invoice Review',
  description: 'Review invoices and keep supplier details in one place.',
  contextSelectors: [{
    id: 'active_company', label: 'Company', icon: 'building', persist: 'session',
    optionsSource: { endpoint: '/api/v1/apps/billing_app/companies', valueKey: 'company_code', labelKey: 'name' },
  }],
  navigation: [
    { id: 'dashboard', type: 'dashboard', dashboardName: 'invoice_review_dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
    {
      id: 'company_users', type: 'object', objectName: 'billing_app_company_user',
      label: 'Company Users', icon: 'users',
    },
    {
      id: 'suppliers',
      type: 'object',
      objectName: 'billing_app_supplier',
      label: 'Suppliers',
      icon: 'building-2',
    },
    {
      id: 'purchase_orders', type: 'object', objectName: 'billing_app_purchase_order',
      label: 'Purchase Orders', icon: 'clipboard-list',
    },
    {
      id: 'invoices', type: 'object', objectName: 'billing_app_invoice',
      label: 'Invoices', icon: 'file-text',
    },
  ],
});
