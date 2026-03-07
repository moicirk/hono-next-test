import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { clients } from '../db/schema.js';

export type Client = typeof clients.$inferSelect;
export type NewClient = Pick<Client, 'name' | 'email'>;

export const ClientModel = {
  findAll(): Promise<Client[]> {
    return db.select().from(clients);
  },

  async findById(id: number): Promise<Client | null> {
    const [row] = await db.select().from(clients).where(eq(clients.id, id));
    return row ?? null;
  },

  async create(data: NewClient): Promise<Client> {
    const [row] = await db.insert(clients).values(data).returning();
    return row;
  },

  async update(id: number, data: Partial<NewClient>): Promise<Client | null> {
    const [row] = await db
      .update(clients)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(clients.id, id))
      .returning();
    return row ?? null;
  },

  async delete(id: number): Promise<boolean> {
    const [row] = await db.delete(clients).where(eq(clients.id, id)).returning();
    return !!row;
  },
};