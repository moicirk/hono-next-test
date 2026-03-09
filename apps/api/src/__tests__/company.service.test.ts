import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotFoundException } from '../exceptions/not-found.exception.js';
import { CompanyRepository } from '../repositories/company.repository.js';
import { CompanyService } from '../services/company.service.js';

vi.mock('../repositories/company.repository.js');

const mockCompany = (overrides = {}) => ({
  id: 1,
  name: 'TechCorp',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('CompanyService.findById', () => {
  it('returns the company when found', async () => {
    vi.mocked(CompanyRepository.findById).mockResolvedValue(mockCompany());

    const result = await CompanyService.findById(1);

    expect(result.name).toBe('TechCorp');
  });

  it('throws NotFoundException when company does not exist', async () => {
    vi.mocked(CompanyRepository.findById).mockResolvedValue(null);

    await expect(CompanyService.findById(999)).rejects.toThrow(NotFoundException);
  });
});

describe('CompanyService.update', () => {
  it('returns the updated company', async () => {
    vi.mocked(CompanyRepository.update).mockResolvedValue(mockCompany({ name: 'NewName' }));

    const result = await CompanyService.update(1, 'NewName');

    expect(result.name).toBe('NewName');
    expect(CompanyRepository.update).toHaveBeenCalledWith(1, { name: 'NewName' });
  });

  it('throws NotFoundException when company does not exist', async () => {
    vi.mocked(CompanyRepository.update).mockResolvedValue(null);

    await expect(CompanyService.update(999, 'Ghost')).rejects.toThrow(NotFoundException);
  });
});
