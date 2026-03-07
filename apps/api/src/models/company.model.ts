import type { companies } from '../db/schema.js';

export type Company = typeof companies.$inferSelect;
export type NewCompany = Pick<Company, 'name'>;
export type UpdateCompany = Partial<NewCompany>;
