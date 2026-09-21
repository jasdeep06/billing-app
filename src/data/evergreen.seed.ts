import { defineSeed } from '@objectstack/spec/data';
import { Supplier } from '../objects/supplier.object.js';
import { PurchaseOrder } from '../objects/purchase-order.object.js';
import { Invoice } from '../objects/invoice.object.js';

export const evergreenSupplierSeed = defineSeed(Supplier, { externalId: 'supplier_code', mode: 'upsert', records: [
  { name: 'Evergreen Components', supplier_code: 'EGC-101', company_id: 'evergreen_trading', contact_email: 'orders@evergreen-components.example', is_active: true, notes: 'Components and wholesale stock.' },
  { name: 'Harborlight Imports', supplier_code: 'HLI-202', company_id: 'evergreen_trading', contact_email: 'billing@harborlight.example', is_active: true, notes: 'Import partner for seasonal inventory.' },
] });

export const evergreenPurchaseOrderSeed = defineSeed(PurchaseOrder, { externalId: 'po_number', mode: 'upsert', records: [
  { po_number: 'EG-PO-301', company_id: 'evergreen_trading', supplier_id: 'EGC-101', order_date: '2026-05-12', expected_total: 7850, status: 'open' },
  { po_number: 'EG-PO-302', company_id: 'evergreen_trading', supplier_id: 'HLI-202', order_date: '2026-07-08', expected_total: 4320, status: 'closed' },
] });

export const evergreenInvoiceSeed = defineSeed(Invoice, { externalId: 'invoice_number', mode: 'upsert', records: [
  { invoice_number: 'EG-INV-401', company_id: 'evergreen_trading', supplier_id: 'EGC-101', purchase_order_id: 'EG-PO-301', invoice_date: '2026-06-01', due_date: '2026-07-01', status: 'open', notes: 'June components shipment.' },
  { invoice_number: 'EG-INV-402', company_id: 'evergreen_trading', supplier_id: 'HLI-202', purchase_order_id: 'EG-PO-302', invoice_date: '2026-08-10', due_date: '2026-09-09', status: 'paid', notes: 'Seasonal import settlement.' },
  { invoice_number: 'EG-INV-403', company_id: 'evergreen_trading', supplier_id: 'EGC-101', invoice_date: '2026-09-05', due_date: '2026-10-05', status: 'draft', notes: 'No PO; awaiting final packing list.' },
] });
