import { defineHook } from '@objectstack/spec/data';

export const calculateInvoiceLineAmount = defineHook({
  name: 'calculate_invoice_line_amount',
  object: 'billing_app_invoice_line',
  events: ['beforeInsert', 'beforeUpdate'],
  handler: async (ctx: any) => {
    const quantity = Number(ctx.input.quantity ?? ctx.previous?.quantity ?? 0);
    const unitPrice = Number(ctx.input.unit_price ?? ctx.previous?.unit_price ?? 0);
    ctx.input.amount = Math.round(quantity * unitPrice * 100) / 100;
  },
  description: 'Keep each invoice line amount synchronized with quantity and unit price.',
});
