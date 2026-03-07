import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { clients } from '../db/schema.js';
import type { Client, NewClient, UpdateClient } from '../models/client.model.js';

export const ClientRepository = {
  findAll(): Promise<Client[]> {
    return db.select().from(clients);
  },

  async findById(id: number): Promise<Client | null> {
    const [row] = await db.select().from(clients).where(eq(clients.id, id));
    return row;
  },

  async findByEmail(email: string): Promise<Client | null> {
    const [row] = await db.select().from(clients).where(eq(clients.email, email));
    return row;
  },

  async create(data: NewClient): Promise<Client> {
    const [row] = await db.insert(clients).values(data).returning();
    return row;
  },

  async update(id: number, data: UpdateClient): Promise<Client | null> {
    const [row] = await db
      .update(clients)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(clients.id, id))
      .returning();
    return row;
  },

  async delete(id: number): Promise<boolean> {
    const [row] = await db.delete(clients).where(eq(clients.id, id)).returning();
    return !!row;
  },
};
