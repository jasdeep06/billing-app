import { defineSeed } from '@objectstack/spec/data';
import { Company } from '../objects/company.object.js';

export const companySeed = defineSeed(Company, {
  externalId: 'company_code', mode: 'upsert', records: [
    { name: 'Northstar Services', company_code: 'northstar_services' },
    { name: 'Evergreen Trading', company_code: 'evergreen_trading' },
  ],
});
