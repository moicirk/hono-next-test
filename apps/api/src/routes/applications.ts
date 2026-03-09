import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';
import { ApplicationRepository } from '../repositories/application.repository.js';
import { ClientRepository } from '../repositories/client.repository.js';
import { JobRepository } from '../repositories/job.repository.js';

const updateSchema = z.object({
  status: z.enum(['pending', 'accepted', 'rejected']),
});

const createSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  coverLetter: z.string().min(1),
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

  .post('/', zValidator('json', createSchema), async (c) => {
    const jobId = Number(c.req.param('jobId'));
    await requireJob(jobId);
    const { name, email, coverLetter } = c.req.valid('json');
    let client = await ClientRepository.findByEmail(email);
    client ??= await ClientRepository.create({ name, email });
    const row = await ApplicationRepository.create({ jobId, clientId: client.id, coverLetter });
    return c.json(row, 201);
  })

  .patch('/:id', zValidator('json', updateSchema), async (c) => {
    const jobId = Number(c.req.param('jobId'));
    const id = Number(c.req.param('id'));
    const job = await requireJob(jobId);
    const { status } = c.req.valid('json');
    const row = await ApplicationRepository.updateStatus(id, jobId, status);
    if (!row) {
      throw new HTTPException(404, { message: 'Application not found' });
    }
    if (status === 'accepted') {
      await JobRepository.update(jobId, job.companyId, { status: 'filled' });
    }
    return c.json(row);
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
  });
