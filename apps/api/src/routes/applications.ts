import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { ApplicationService } from '../services/application.service.js';
import { createApplicationValidator, updateApplicationValidator } from '../validation/application.validation.js';

export const applicationsRoute = new Hono()
  .get('/', async (c) => {
    const jobId = Number(c.req.param('jobId'));
    return c.json(await ApplicationService.findAllByJob(jobId));
  })

  .post('/', zValidator('json', createApplicationValidator), async (c) => {
    const jobId = Number(c.req.param('jobId'));
    return c.json(await ApplicationService.create(jobId, c.req.valid('json')), 201);
  })

  .patch('/:id', zValidator('json', updateApplicationValidator), async (c) => {
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
