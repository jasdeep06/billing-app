import { defineSeed } from '@objectstack/spec/data';
import { PurchaseOrder } from '../objects/purchase-order.object.js';

export const purchaseOrderSeed = defineSeed(PurchaseOrder, {
  externalId: 'po_number', mode: 'upsert', records: [
    { po_number: 'PO-1001', supplier_id: 'NOS-001', order_date: '2026-01-08', expected_total: 1250.00, status: 'closed' },
    { po_number: 'PO-1002', supplier_id: 'BHL-014', order_date: '2026-02-14', expected_total: 4800.00, status: 'open' },
    { po_number: 'PO-1003', supplier_id: 'CFC-022', order_date: '2026-03-01', expected_total: 675.50, status: 'closed' },
    { po_number: 'PO-1004', supplier_id: 'MIT-031', order_date: '2026-04-19', expected_total: 9200.00, status: 'open' },
    { po_number: 'PO-1005', supplier_id: 'NOS-001', order_date: '2026-06-05', expected_total: 3100.25, status: 'draft' },
    { po_number: 'PO-1006', supplier_id: 'BHL-014', order_date: '2026-07-22', expected_total: 1875.00, status: 'open' },
  ],
});
