import type { clients } from '../db/schema.js';

export type Client = typeof clients.$inferSelect;
export type NewClient = Pick<Client, 'name' | 'email'>;
export type UpdateClient = Partial<NewClient>;
