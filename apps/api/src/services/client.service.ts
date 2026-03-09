import { NotFoundException } from '../exceptions/not-found.exception.js';
import type { Client } from '../models/client.model.js';
import { ClientRepository } from '../repositories/client.repository.js';

export const ClientService = {
  findAll(): Promise<Client[]> {
    return ClientRepository.findAll();
  },

  async findById(id: number): Promise<Client> {
    const client = await ClientRepository.findById(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  },
};
