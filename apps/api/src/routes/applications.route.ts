import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';
import { ApplicationModel } from '../models/application.model.js';
import { ClientModel } from '../models/client.model.js';
import { JobModel } from '../models/job.model.js';

const createSchema = z.object({
  clientId: z.number().int().positive(),
  coverLetter: z.string().min(1),
});

const updateSchema = z.object({
  status: z.enum(['pending', 'accepted', 'rejected']),
});

async function requireJob(jobId: number) {
  const job = await JobModel.findByIdGlobal(jobId);
  if (!job) throw new HTTPException(404, { message: 'Job not found' });
  return job;
}

export const applicationsRoute = new Hono()
  .get('/', async (c) => {
    const jobId = Number(c.req.param('jobId'));
    await requireJob(jobId);
    const rows = await ApplicationModel.findAllByJob(jobId);
    return c.json(rows);
  })

  .get('/:id', async (c) => {
    const jobId = Number(c.req.param('jobId'));
    const id = Number(c.req.param('id'));
    await requireJob(jobId);
    const row = await ApplicationModel.findById(id, jobId);
    if (!row) throw new HTTPException(404, { message: 'Application not found' });
    return c.json(row);
  })

  .post('/', zValidator('json', createSchema), async (c) => {
    const jobId = Number(c.req.param('jobId'));
    await requireJob(jobId);
    const { clientId, coverLetter } = c.req.valid('json');
    const client = await ClientModel.findById(clientId);
    if (!client) throw new HTTPException(404, { message: 'Client not found' });
    const row = await ApplicationModel.create({ jobId, clientId, coverLetter });
    return c.json(row, 201);
  })

  .patch('/:id', zValidator('json', updateSchema), async (c) => {
    const jobId = Number(c.req.param('jobId'));
    const id = Number(c.req.param('id'));
    await requireJob(jobId);
    const { status } = c.req.valid('json');
    const row = await ApplicationModel.updateStatus(id, jobId, status);
    if (!row) throw new HTTPException(404, { message: 'Application not found' });
    return c.json(row);
  });