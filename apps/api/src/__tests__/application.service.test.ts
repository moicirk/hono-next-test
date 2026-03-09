import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ForbiddenException } from '../exceptions/forbidden.exception.js';
import { NotFoundException } from '../exceptions/not-found.exception.js';
import { ApplicationRepository } from '../repositories/application.repository.js';
import { ClientRepository } from '../repositories/client.repository.js';
import { JobRepository } from '../repositories/job.repository.js';
import { ApplicationService } from '../services/application.service.js';

vi.mock('../repositories/job.repository.js');
vi.mock('../repositories/client.repository.js');
vi.mock('../repositories/application.repository.js');

const mockJob = (overrides = {}) => ({
  id: 1,
  companyId: 1,
  title: 'Frontend Developer',
  description: 'Build great UIs',
  priceFrom: 3000,
  priceTo: 5000,
  status: 'open' as const,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

const mockClient = { id: 10, name: 'Alice', email: 'alice@test.com', createdAt: new Date(), updatedAt: new Date() };

const mockApplication = (overrides = {}) => ({
  id: 100,
  jobId: 1,
  status: 'pending' as const,
  coverLetter: 'I am a great fit.',
  createdAt: new Date(),
  updatedAt: new Date(),
  client: { id: 10, name: 'Alice', email: 'alice@test.com' },
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ApplicationService.create', () => {
  it('throws NotFoundException when job does not exist', async () => {
    vi.mocked(JobRepository.findById).mockResolvedValue(null);

    await expect(
      ApplicationService.create(999, { name: 'Alice', email: 'alice@test.com', coverLetter: 'Hello' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws ForbiddenException when job status is not open', async () => {
    for (const status of ['draft', 'in_review', 'filled', 'closed'] as const) {
      vi.mocked(JobRepository.findById).mockResolvedValue(mockJob({ status }));

      await expect(
        ApplicationService.create(1, { name: 'Alice', email: 'alice@test.com', coverLetter: 'Hello' }),
      ).rejects.toThrow(ForbiddenException);
    }
  });

  it('creates application when job is open', async () => {
    vi.mocked(JobRepository.findById).mockResolvedValue(mockJob());
    vi.mocked(ClientRepository.findByEmail).mockResolvedValue(mockClient);
    vi.mocked(ApplicationRepository.create).mockResolvedValue(mockApplication());

    const result = await ApplicationService.create(1, {
      name: 'Alice',
      email: 'alice@test.com',
      coverLetter: 'I am a great fit.',
    });

    expect(ApplicationRepository.create).toHaveBeenCalledWith({
      jobId: 1,
      clientId: mockClient.id,
      coverLetter: 'I am a great fit.',
    });
    expect(result.client.email).toBe('alice@test.com');
  });

  it('creates a new client if email is not found', async () => {
    vi.mocked(JobRepository.findById).mockResolvedValue(mockJob());
    vi.mocked(ClientRepository.findByEmail).mockResolvedValue(null);
    vi.mocked(ClientRepository.create).mockResolvedValue(mockClient);
    vi.mocked(ApplicationRepository.create).mockResolvedValue(mockApplication());

    await ApplicationService.create(1, { name: 'Alice', email: 'alice@test.com', coverLetter: 'Hello' });

    expect(ClientRepository.create).toHaveBeenCalledWith({ name: 'Alice', email: 'alice@test.com' });
  });
});

describe('ApplicationService.updateStatus', () => {
  it('throws NotFoundException when job does not exist', async () => {
    vi.mocked(JobRepository.findById).mockResolvedValue(null);

    await expect(ApplicationService.updateStatus(1, 999, 'accepted')).rejects.toThrow(NotFoundException);
  });

  it('throws NotFoundException when application does not exist', async () => {
    vi.mocked(JobRepository.findById).mockResolvedValue(mockJob());
    vi.mocked(ApplicationRepository.updateStatus).mockResolvedValue(null);

    await expect(ApplicationService.updateStatus(999, 1, 'accepted')).rejects.toThrow(NotFoundException);
  });

  it('sets job status to filled when application is accepted', async () => {
    vi.mocked(JobRepository.findById).mockResolvedValue(mockJob());
    vi.mocked(ApplicationRepository.updateStatus).mockResolvedValue(mockApplication({ status: 'accepted' }));
    vi.mocked(JobRepository.update).mockResolvedValue(mockJob({ status: 'filled' }));

    await ApplicationService.updateStatus(100, 1, 'accepted');

    expect(JobRepository.update).toHaveBeenCalledWith(1, 1, { status: 'filled' });
  });

  it('does not update job status for non-accepted statuses', async () => {
    vi.mocked(JobRepository.findById).mockResolvedValue(mockJob());
    vi.mocked(ApplicationRepository.updateStatus).mockResolvedValue(mockApplication({ status: 'rejected' }));

    await ApplicationService.updateStatus(100, 1, 'rejected');

    expect(JobRepository.update).not.toHaveBeenCalled();
  });
});
