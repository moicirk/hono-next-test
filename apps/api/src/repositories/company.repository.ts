import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { companies } from '../db/schema.js';
import type { Company, NewCompany, UpdateCompany } from '../models/company.model.js';

export const CompanyRepository = {
  findAll(): Promise<Company[]> {
    return db.select().from(companies);
  },

  async findById(id: number): Promise<Company | null> {
    const [row] = await db.select().from(companies).where(eq(companies.id, id));
    return row;
  },

  async create(data: NewCompany): Promise<Company> {
    const [row] = await db.insert(companies).values(data).returning();
    return row;
  },

  async update(id: number, data: UpdateCompany): Promise<Company | null> {
    const [row] = await db
      .update(companies)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(companies.id, id))
      .returning();
    return row;
  },

  async delete(id: number): Promise<boolean> {
    const [row] = await db.delete(companies).where(eq(companies.id, id)).returning();
    return !!row;
  },
};
