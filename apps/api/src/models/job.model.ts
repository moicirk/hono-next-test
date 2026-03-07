import { and, eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { jobs } from '../db/schema.js';

export type Job = typeof jobs.$inferSelect;
export type JobStatus = Job['status'];
export type NewJob = Pick<Job, 'companyId' | 'title' | 'description' | 'priceFrom' | 'priceTo' | 'status'>;
export type UpdateJob = Partial<Pick<Job, 'title' | 'description' | 'priceFrom' | 'priceTo' | 'status'>>;

export const JobModel = {
  findAllByCompany(companyId: number): Promise<Job[]> {
    return db.select().from(jobs).where(eq(jobs.companyId, companyId));
  },

  async findByIdGlobal(id: number): Promise<Job | null> {
    const [row] = await db.select().from(jobs).where(eq(jobs.id, id));
    return row ?? null;
  },

  async findById(id: number, companyId: number): Promise<Job | null> {
    const [row] = await db
      .select()
      .from(jobs)
      .where(and(eq(jobs.id, id), eq(jobs.companyId, companyId)));
    return row ?? null;
  },

  async create(data: NewJob): Promise<Job> {
    const [row] = await db.insert(jobs).values(data).returning();
    return row;
  },

  async update(id: number, companyId: number, data: UpdateJob): Promise<Job | null> {
    const [row] = await db
      .update(jobs)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(jobs.id, id), eq(jobs.companyId, companyId)))
      .returning();
    return row ?? null;
  },

  async delete(id: number, companyId: number): Promise<boolean> {
    const [row] = await db
      .delete(jobs)
      .where(and(eq(jobs.id, id), eq(jobs.companyId, companyId)))
      .returning();
    return !!row;
  },
};