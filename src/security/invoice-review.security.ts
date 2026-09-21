import { defineCapability, definePermissionSet } from '@objectstack/spec/security';

export const ViewInternalFinanceNotes = defineCapability({
  name: 'view_internal_finance_notes', label: 'View internal finance notes', scope: 'org',
});

const records = ['billing_app_company', 'billing_app_supplier', 'billing_app_purchase_order', 'billing_app_invoice', 'billing_app_invoice_line'];
const readOnly = Object.fromEntries(records.map((name) => [name, { allowRead: true }]));

export const SubmitterPermissions = definePermissionSet({
  name: 'invoice_submitter', label: 'Invoice Submitter', objects: {
    billing_app_supplier: { allowRead: true }, billing_app_purchase_order: { allowRead: true },
    billing_app_invoice: { allowRead: true, allowCreate: true, allowEdit: true, allowDelete: true },
    billing_app_invoice_line: { allowRead: true, allowCreate: true, allowEdit: true, allowDelete: true },
  }, rowLevelSecurity: [
    { name: 'own_invoices', object: 'billing_app_invoice', operation: 'all', using: 'created_by == current_user.id', check: 'created_by == current_user.id' },
  ],
});

export const FinanceAnalystPermissions = definePermissionSet({
  name: 'invoice_finance_analyst', label: 'Finance Analyst', objects: {
    ...Object.fromEntries(records.map((name) => [name, { allowRead: true, allowCreate: true, allowEdit: true, allowDelete: true }])),
  }, fields: { 'billing_app_invoice.internal_finance_notes': { readable: true, editable: true } },
  systemPermissions: ['view_internal_finance_notes'],
});

export const ApproverPermissions = definePermissionSet({
  name: 'invoice_approver', label: 'Approver', objects: readOnly,
  fields: { 'billing_app_invoice.internal_finance_notes': { readable: true, editable: false } },
  systemPermissions: ['view_internal_finance_notes'],
});

export const AuditorPermissions = definePermissionSet({
  name: 'invoice_auditor', label: 'Auditor', objects: readOnly,
});

export const CompanyAdministratorPermissions = definePermissionSet({
  name: 'invoice_company_administrator', label: 'Company Administrator',
  objects: {
    ...Object.fromEntries(records.map((name) => [name, { allowRead: true, allowCreate: true, allowEdit: true, allowDelete: true }])),
    billing_app_company_user: { allowRead: true, allowCreate: true, allowEdit: true, allowDelete: true, readScope: 'org' },
  }, fields: { 'billing_app_invoice.internal_finance_notes': { readable: true, editable: true } },
  systemPermissions: ['manage_users', 'view_internal_finance_notes'],
});
