import { ForbiddenException } from '../exceptions/forbidden.exception.js';
import { NotFoundException } from '../exceptions/not-found.exception.js';
import type { ApplicationStatus, ApplicationWithClient } from '../models/application.model.js';
import { ApplicationRepository } from '../repositories/application.repository.js';
import { ClientRepository } from '../repositories/client.repository.js';
import { JobRepository } from '../repositories/job.repository.js';

async function requireJob(jobId: number) {
  const job = await JobRepository.findById(jobId);
  if (!job) {
    throw new NotFoundException('Job not found');
  }
  return job;
}

export const ApplicationService = {
  async findAllByJob(jobId: number): Promise<ApplicationWithClient[]> {
    await requireJob(jobId);
    return ApplicationRepository.findAllByJob(jobId);
  },

  async findById(id: number, jobId: number): Promise<ApplicationWithClient> {
    await requireJob(jobId);
    const application = await ApplicationRepository.findById(id, jobId);
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return application;
  },

  async create(
    jobId: number,
    data: { name: string; email: string; coverLetter: string },
  ): Promise<ApplicationWithClient> {
    const job = await requireJob(jobId);
    if (job.status !== 'open') {
      throw new ForbiddenException('Applications can only be submitted for open jobs');
    }
    let client = await ClientRepository.findByEmail(data.email);
    client ??= await ClientRepository.create({ name: data.name, email: data.email });
    return ApplicationRepository.create({ jobId, clientId: client.id, coverLetter: data.coverLetter });
  },

  async updateStatus(id: number, jobId: number, status: ApplicationStatus): Promise<ApplicationWithClient> {
    const job = await requireJob(jobId);
    const application = await ApplicationRepository.updateStatus(id, jobId, status);
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    if (status === 'accepted') {
      await JobRepository.update(jobId, job.companyId, { status: 'filled' });
    }
    return application;
  },
};
