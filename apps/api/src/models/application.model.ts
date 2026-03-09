import type { applications, clients } from '../db/schema.js';

type Application = typeof applications.$inferSelect;

export type ApplicationStatus = Application['status'];
export type NewApplication = Pick<Application, 'jobId' | 'clientId' | 'coverLetter'>;

export type ApplicationWithClient = Omit<Application, 'clientId'> & {
  client: Pick<typeof clients.$inferSelect, 'id' | 'name' | 'email'>;
};
