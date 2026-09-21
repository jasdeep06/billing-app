import { defineHook } from '@objectstack/spec/data';

const scopedObjects = ['billing_app_supplier', 'billing_app_purchase_order', 'billing_app_invoice'];

export const ensureCompanyScope = defineHook({
  name: 'ensure_company_scope', object: scopedObjects, events: ['beforeInsert', 'beforeUpdate'],
  handler: async (ctx: any) => {
    if (!ctx.input.company_id) ctx.input.company_id = 'northstar_services';
  },
  description: 'Assign legacy and newly created business records to the active company context.',
});
