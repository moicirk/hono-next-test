import { and, eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { jobs } from '../db/schema.js';
import type { Job, NewJob, UpdateJob } from '../models/job.model.js';

export const JobRepository = {
  findAllByCompany(companyId: number): Promise<Job[]> {
    return db.select().from(jobs).where(eq(jobs.companyId, companyId));
  },

  async findById(id: number): Promise<Job | null> {
    const [row] = await db.select().from(jobs).where(eq(jobs.id, id));
    return row;
  },

  async findByIdAndCompany(id: number, companyId: number): Promise<Job | null> {
    const [row] = await db
      .select()
      .from(jobs)
      .where(and(eq(jobs.id, id), eq(jobs.companyId, companyId)));
    return row;
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
    return row;
  },

  async delete(id: number, companyId: number): Promise<boolean> {
    const [row] = await db
      .delete(jobs)
      .where(and(eq(jobs.id, id), eq(jobs.companyId, companyId)))
      .returning();
    return !!row;
  },
};
