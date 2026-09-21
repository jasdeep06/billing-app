import type { ApiEndpoint } from '@objectstack/spec/api';

/** Selector-friendly projection of the authenticated company query. */
export const companySelectorApi: ApiEndpoint = {
  name: 'billing_app_company_selector',
  path: '/api/v1/apps/billing_app/companies',
  method: 'GET',
  summary: 'Companies available to the current user',
  type: 'object_operation',
  objectParams: { object: 'billing_app_company', operation: 'find' },
  outputMapping: [{ source: 'records', target: 'items' }],
};
