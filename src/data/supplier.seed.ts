import { defineSeed } from '@objectstack/spec/data';
import { Supplier } from '../objects/supplier.object.js';

export const supplierSeed = defineSeed(Supplier, {
  externalId: 'supplier_code',
  mode: 'upsert',
  records: [
    { name: 'Northstar Office Supply', supplier_code: 'NOS-001', contact_email: 'hello@northstar.example', is_active: true, notes: 'Paper, toner, and workplace essentials.' },
    { name: 'Blue Heron Logistics', supplier_code: 'BHL-014', contact_email: 'dispatch@blueheron.example', is_active: true, notes: 'Regional freight and scheduled deliveries.' },
    { name: 'Cedar & Finch Catering', supplier_code: 'CFC-022', contact_email: 'events@cedarfinch.example', is_active: true, notes: 'Meeting catering and pantry replenishment.' },
    { name: 'Mosaic IT Services', supplier_code: 'MIT-031', contact_email: 'support@mosaicit.example', is_active: true, notes: 'Managed devices and helpdesk support.' },
    { name: 'Silverline Facility Care', supplier_code: 'SFC-047', contact_email: 'team@silverline.example', is_active: false, notes: 'Archived supplier; retained for reference.' },
  ],
});
