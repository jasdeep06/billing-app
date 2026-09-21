import { defineView } from '@objectstack/spec/ui';

export const PurchaseOrderViews = defineView({
  object: 'billing_app_purchase_order',
  list: {
    type: 'grid', label: 'Purchase orders',
    columns: ['company_id', 'po_number', 'supplier_id', 'order_date', 'expected_total', 'status'],
    sort: [{ field: 'order_date', order: 'desc' }],
  },
  form: {
    type: 'simple', title: 'Purchase order details', layout: 'vertical',
    sections: [{ label: 'Purchase order information', fields: ['company_id', 'po_number', 'supplier_id', 'order_date', 'expected_total', 'status'] }],
  },
});
