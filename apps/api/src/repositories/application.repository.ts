import { and, eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { applications, clients } from '../db/schema.js';
import type { ApplicationStatus, ApplicationWithClient, NewApplication } from '../models/application.model.js';

const withClientSelect = {
  id: applications.id,
  jobId: applications.jobId,
  status: applications.status,
  coverLetter: applications.coverLetter,
  createdAt: applications.createdAt,
  updatedAt: applications.updatedAt,
  client: {
    id: clients.id,
    name: clients.name,
    email: clients.email,
  },
};

export const ApplicationRepository = {
  findAllByJob(jobId: number): Promise<ApplicationWithClient[]> {
    return db
      .select(withClientSelect)
      .from(applications)
      .innerJoin(clients, eq(applications.clientId, clients.id))
      .where(eq(applications.jobId, jobId));
  },

  async create(data: NewApplication): Promise<ApplicationWithClient> {
    const [row] = await db.insert(applications).values(data).returning();
    const result = await this.findById(row.id, row.jobId);
    if (!result) {
      throw new Error('Failed to retrieve created application');
    }
    return result;
  },

  async updateStatus(id: number, jobId: number, status: ApplicationStatus): Promise<ApplicationWithClient | null> {
    await db
      .update(applications)
      .set({ status, updatedAt: new Date() })
      .where(and(eq(applications.id, id), eq(applications.jobId, jobId)));
    return this.findById(id, jobId);
  },

  async findById(id: number, jobId: number): Promise<ApplicationWithClient | null> {
    const [row] = await db
      .select(withClientSelect)
      .from(applications)
      .innerJoin(clients, eq(applications.clientId, clients.id))
      .where(and(eq(applications.id, id), eq(applications.jobId, jobId)));
    return row;
  },
};
