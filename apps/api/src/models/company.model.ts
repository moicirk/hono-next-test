import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { companies } from '../db/schema.js';

export type Company = typeof companies.$inferSelect;
export type NewCompany = Pick<Company, 'name'>;

export const CompanyModel = {
  findAll(): Promise<Company[]> {
    return db.select().from(companies);
  },

  async findById(id: number): Promise<Company | null> {
    const [row] = await db.select().from(companies).where(eq(companies.id, id));
    return row ?? null;
  },

  async create(data: NewCompany): Promise<Company> {
    const [row] = await db.insert(companies).values(data).returning();
    return row;
  },

  async update(id: number, data: Partial<NewCompany>): Promise<Company | null> {
    const [row] = await db
      .update(companies)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(companies.id, id))
      .returning();
    return row ?? null;
  },

  async delete(id: number): Promise<boolean> {
    const [row] = await db.delete(companies).where(eq(companies.id, id)).returning();
    return !!row;
  },
};