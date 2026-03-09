import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { JobService } from '../services/job.service.js';

const jobStatusEnum = z.enum(['draft', 'open', 'in_review', 'filled', 'closed']);

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priceFrom: z.number().int().nonnegative(),
  priceTo: z.number().int().nonnegative(),
  status: jobStatusEnum.default('draft'),
});

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  priceFrom: z.number().int().nonnegative().optional(),
  priceTo: z.number().int().nonnegative().optional(),
  status: jobStatusEnum.optional(),
});

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

  .post('/', zValidator('json', createSchema), async (c) => {
    const companyId = Number(c.req.param('companyId'));
    return c.json(await JobService.create(companyId, c.req.valid('json')), 201);
  })

  .patch('/:id', zValidator('json', updateSchema), async (c) => {
    const companyId = Number(c.req.param('companyId'));
    const id = Number(c.req.param('id'));
    return c.json(await JobService.update(id, companyId, c.req.valid('json')));
  });
