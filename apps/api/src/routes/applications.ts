import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { ApplicationService } from '../services/application.service.js';

const createSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  coverLetter: z.string().min(1),
});

const updateSchema = z.object({
  status: z.enum(['pending', 'accepted', 'rejected']),
});

export const applicationsRoute = new Hono()
  .get('/', async (c) => {
    const jobId = Number(c.req.param('jobId'));
    return c.json(await ApplicationService.findAllByJob(jobId));
  })

  .post('/', zValidator('json', createSchema), async (c) => {
    const jobId = Number(c.req.param('jobId'));
    return c.json(await ApplicationService.create(jobId, c.req.valid('json')), 201);
  })

  .patch('/:id', zValidator('json', updateSchema), async (c) => {
    const jobId = Number(c.req.param('jobId'));
    const id = Number(c.req.param('id'));
    const { status } = c.req.valid('json');
    return c.json(await ApplicationService.updateStatus(id, jobId, status));
  })

  .get('/:id', async (c) => {
    const jobId = Number(c.req.param('jobId'));
    const id = Number(c.req.param('id'));
    return c.json(await ApplicationService.findById(id, jobId));
  });
