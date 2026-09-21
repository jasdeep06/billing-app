import { Dashboard } from '@objectstack/spec/ui';

export const InvoiceReviewDashboard = Dashboard.create({
  name: 'invoice_review_dashboard',
  label: 'Invoice Review Dashboard',
  description: 'Live invoice workload and outstanding value.',
  columns: 12,
  gap: 4,
  refreshIntervalSeconds: 60,
  globalFilters: [{ name: 'active_company', field: 'company_id', label: 'Company', type: 'text', scope: 'dashboard' }],
  widgets: [
    { id: 'total_invoices', type: 'metric', title: 'Total invoices', dataset: 'billing_app_invoice_metrics', values: ['invoice_count'], layout: { x: 0, y: 0, w: 3, h: 2 } },
    { id: 'open_invoice_value', type: 'metric', title: 'Open invoice value', dataset: 'billing_app_invoice_metrics', values: ['invoice_value'], filter: { status: 'open' }, layout: { x: 3, y: 0, w: 3, h: 2 } },
    { id: 'overdue_invoices', type: 'metric', title: 'Overdue invoices', dataset: 'billing_app_invoice_metrics', values: ['invoice_count'], filter: { status: 'open', due_date: { $lt: '{today}' } }, layout: { x: 6, y: 0, w: 3, h: 2 } },
    { id: 'invoice_count_by_status', type: 'bar', title: 'Invoice count by status', dataset: 'billing_app_invoice_metrics', dimensions: ['status'], values: ['invoice_count'], layout: { x: 0, y: 2, w: 6, h: 4 } },
    { id: 'open_value_by_supplier', type: 'bar', title: 'Open invoice value by supplier', dataset: 'billing_app_invoice_metrics', dimensions: ['supplier'], values: ['invoice_value'], filter: { status: 'open' }, layout: { x: 6, y: 2, w: 6, h: 4 } },
  ],
});
