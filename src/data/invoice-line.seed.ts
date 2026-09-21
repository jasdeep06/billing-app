import { defineSeed } from '@objectstack/spec/data';
import { InvoiceLine } from '../objects/invoice-line.object.js';

export const invoiceLineSeed = defineSeed(InvoiceLine, {
  externalId: ['invoice_id', 'description'], mode: 'upsert', records: [
    { invoice_id: 'INV-2001', description: 'Printer paper cartons', quantity: 10, unit_price: 45.00 },
    { invoice_id: 'INV-2001', description: 'Toner cartridges', quantity: 4, unit_price: 88.75 },
    { invoice_id: 'INV-2002', description: 'Scheduled freight runs', quantity: 8, unit_price: 325.00 },
    { invoice_id: 'INV-2003', description: 'Workshop lunch service', quantity: 3, unit_price: 225.17 },
    { invoice_id: 'INV-2004', description: 'Managed laptops', quantity: 12, unit_price: 650.00 },
    { invoice_id: 'INV-2006', description: 'Regional delivery route', quantity: 5, unit_price: 275.00 },
    { invoice_id: 'INV-2007', description: 'Stationery bundle', quantity: 6, unit_price: 42.50 },
    { invoice_id: 'INV-2009', description: 'Event staffing', quantity: 2, unit_price: 480.00 },
    { invoice_id: 'INV-2011', description: 'Breakroom supplies', quantity: 7, unit_price: 32.25 },
    { invoice_id: 'INV-2012', description: 'Expedited freight', quantity: 1, unit_price: 180.00 },
  ],
});
