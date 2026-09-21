import { defineSeed } from '@objectstack/spec/data';
import { Invoice } from '../objects/invoice.object.js';

export const invoiceSeed = defineSeed(Invoice, {
  externalId: 'invoice_number', mode: 'upsert', records: [
    { invoice_number: 'INV-2001', supplier_id: 'NOS-001', purchase_order_id: 'PO-1001', invoice_date: '2026-01-20', due_date: '2026-02-19', status: 'paid', notes: 'January office supplies.' },
    { invoice_number: 'INV-2002', supplier_id: 'BHL-014', purchase_order_id: 'PO-1002', invoice_date: '2026-02-20', due_date: '2026-03-22', status: 'open', notes: 'Freight services, first milestone.' },
    { invoice_number: 'INV-2003', supplier_id: 'CFC-022', purchase_order_id: 'PO-1003', invoice_date: '2026-03-10', due_date: '2026-04-09', status: 'paid', notes: 'Catering for March workshops.' },
    { invoice_number: 'INV-2004', supplier_id: 'MIT-031', purchase_order_id: 'PO-1004', invoice_date: '2026-04-25', due_date: '2026-05-25', status: 'open', notes: 'Device refresh phase one.' },
    { invoice_number: 'INV-2005', supplier_id: 'NOS-001', purchase_order_id: 'PO-1005', invoice_date: '2026-06-10', due_date: '2026-07-10', status: 'cancelled', notes: 'Cancelled and reissued.' },
    { invoice_number: 'INV-2006', supplier_id: 'BHL-014', purchase_order_id: 'PO-1006', invoice_date: '2026-07-29', due_date: '2026-08-28', status: 'open', notes: 'August delivery run.' },
    { invoice_number: 'INV-2007', supplier_id: 'NOS-001', invoice_date: '2026-08-03', due_date: '2026-09-02', status: 'open', notes: 'Ad hoc stationery order without a PO.' },
    { invoice_number: 'INV-2008', supplier_id: 'BHL-014', invoice_date: '2026-08-15', due_date: '2026-09-14', status: 'draft', notes: 'Draft invoice pending review.' },
    { invoice_number: 'INV-2009', supplier_id: 'CFC-022', invoice_date: '2026-08-20', due_date: '2026-09-19', status: 'open', notes: 'Overdue event services invoice.' },
    { invoice_number: 'INV-2010', supplier_id: 'MIT-031', invoice_date: '2026-08-28', due_date: '2026-09-27', status: 'draft', notes: 'Awaiting supporting documentation.' },
    { invoice_number: 'INV-2011', supplier_id: 'NOS-001', invoice_date: '2026-09-02', due_date: '2026-10-02', status: 'open', notes: 'September consumables.' },
    { invoice_number: 'INV-2012', supplier_id: 'BHL-014', invoice_date: '2026-09-10', due_date: '2026-10-10', status: 'paid', notes: 'Paid early.' },
  ],
});
