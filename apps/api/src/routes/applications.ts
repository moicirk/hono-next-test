import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';
import { ApplicationRepository } from '../repositories/application.repository.js';
import { ClientRepository } from '../repositories/client.repository.js';
import { JobRepository } from '../repositories/job.repository.js';

const createSchema = z.object({
  clientId: z.number().int().positive(),
  coverLetter: z.string().min(1),
});

const updateSchema = z.object({
  status: z.enum(['pending', 'accepted', 'rejected']),
});

async function requireJob(jobId: number) {
  const job = await JobRepository.findById(jobId);
  if (!job) {
    throw new HTTPException(404, { message: 'Job not found' });
  }
  return job;
}

export const applicationsRoute = new Hono()
  .get('/', async (c) => {
    const jobId = Number(c.req.param('jobId'));
    await requireJob(jobId);
    const rows = await ApplicationRepository.findAllByJob(jobId);
    return c.json(rows);
  })

  .get('/:id', async (c) => {
    const jobId = Number(c.req.param('jobId'));
    const id = Number(c.req.param('id'));
    await requireJob(jobId);
    const row = await ApplicationRepository.findById(id, jobId);
    if (!row) {
      throw new HTTPException(404, { message: 'Application not found' });
    }
    return c.json(row);
  })

  .post('/', zValidator('json', createSchema), async (c) => {
    const jobId = Number(c.req.param('jobId'));
    await requireJob(jobId);
    const { clientId, coverLetter } = c.req.valid('json');
    const client = await ClientRepository.findById(clientId);
    if (!client) {
      throw new HTTPException(404, { message: 'Client not found' });
    }
    const row = await ApplicationRepository.create({ jobId, clientId, coverLetter });
    return c.json(row, 201);
  })

  .patch('/:id', zValidator('json', updateSchema), async (c) => {
    const jobId = Number(c.req.param('jobId'));
    const id = Number(c.req.param('id'));
    await requireJob(jobId);
    const { status } = c.req.valid('json');
    const row = await ApplicationRepository.updateStatus(id, jobId, status);
    if (!row) {
      throw new HTTPException(404, { message: 'Application not found' });
    }
    return c.json(row);
  });
