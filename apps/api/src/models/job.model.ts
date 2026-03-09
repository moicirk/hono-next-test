import type { jobs } from '../db/schema.js';

export type Job = typeof jobs.$inferSelect;
export type JobStatus = Job['status'];
export type NewJob = Pick<Job, 'companyId' | 'title' | 'description' | 'priceFrom' | 'priceTo' | 'status'>;
export type UpdateJob = Partial<Pick<Job, 'title' | 'description' | 'priceFrom' | 'priceTo' | 'status'>>;
export type JobWithCount = Job & { applicationCount: number };
