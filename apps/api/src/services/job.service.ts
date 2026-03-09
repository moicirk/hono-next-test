import { NotFoundException } from '../exceptions/not-found.exception.js';
import type { Job, JobWithCount, NewJob, UpdateJob } from '../models/job.model.js';
import { CompanyRepository } from '../repositories/company.repository.js';
import { JobRepository } from '../repositories/job.repository.js';

async function requireCompany(companyId: number) {
  const company = await CompanyRepository.findById(companyId);
  if (!company) {
    throw new NotFoundException('Company not found');
  }
  return company;
}

export const JobService = {
  async findAllByCompany(companyId: number): Promise<JobWithCount[]> {
    await requireCompany(companyId);
    return JobRepository.findAllByCompany(companyId);
  },

  async findByIdAndCompany(id: number, companyId: number): Promise<Job> {
    await requireCompany(companyId);
    const job = await JobRepository.findByIdAndCompany(id, companyId);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  },

  async create(companyId: number, data: Omit<NewJob, 'companyId'>): Promise<Job> {
    await requireCompany(companyId);
    return JobRepository.create({ ...data, companyId });
  },

  async update(id: number, companyId: number, data: UpdateJob): Promise<Job> {
    await requireCompany(companyId);
    const job = await JobRepository.update(id, companyId, data);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  },
};
