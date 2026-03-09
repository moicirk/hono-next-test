import { NotFoundException } from '../exceptions/not-found.exception.js';
import type { Company } from '../models/company.model.js';
import { CompanyRepository } from '../repositories/company.repository.js';

export const CompanyService = {
  findAll(): Promise<Company[]> {
    return CompanyRepository.findAll();
  },

  async findById(id: number): Promise<Company> {
    const company = await CompanyRepository.findById(id);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  },

  create(name: string): Promise<Company> {
    return CompanyRepository.create({ name });
  },

  async update(id: number, name: string): Promise<Company> {
    const company = await CompanyRepository.update(id, { name });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  },
};
