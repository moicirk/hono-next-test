import { and, eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { applications, clients } from '../db/schema.js';
import type {
  Application,
  ApplicationStatus,
  ApplicationWithClient,
  NewApplication,
} from '../models/application.model.js';

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

  async findById(id: number, jobId: number): Promise<ApplicationWithClient | null> {
    const [row] = await db
      .select(withClientSelect)
      .from(applications)
      .innerJoin(clients, eq(applications.clientId, clients.id))
      .where(and(eq(applications.id, id), eq(applications.jobId, jobId)));
    return row;
  },

  async create(data: NewApplication): Promise<Application> {
    const [row] = await db.insert(applications).values(data).returning();
    return row;
  },

  async updateStatus(id: number, jobId: number, status: ApplicationStatus): Promise<Application | null> {
    const [row] = await db
      .update(applications)
      .set({ status, updatedAt: new Date() })
      .where(and(eq(applications.id, id), eq(applications.jobId, jobId)))
      .returning();
    return row;
  },
};
