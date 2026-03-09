import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { JobService } from '../services/job.service.js';
import { createJobValidator, updateJobValidator } from '../validation/job.validation.js';

export const jobsRoute = new Hono()
  .get('/', async (c) => {
    const companyId = Number(c.req.param('companyId'));
    return c.json(await JobService.findAllByCompany(companyId));
  })

  .get('/:id', async (c) => {
    const companyId = Number(c.req.param('companyId'));
    const id = Number(c.req.param('id'));
    return c.json(await JobService.findByIdAndCompany(id, companyId));
  })

  .post('/', zValidator('json', createJobValidator), async (c) => {
    const companyId = Number(c.req.param('companyId'));
    return c.json(await JobService.create(companyId, c.req.valid('json')), 201);
  })

  .patch('/:id', zValidator('json', updateJobValidator), async (c) => {
    const companyId = Number(c.req.param('companyId'));
    const id = Number(c.req.param('id'));
    return c.json(await JobService.update(id, companyId, c.req.valid('json')));
  });
