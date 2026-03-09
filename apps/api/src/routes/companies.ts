import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { CompanyService } from '../services/company.service.js';

const createSchema = z.object({ name: z.string().min(1) });
const updateSchema = z.object({ name: z.string().min(1) });

export const companiesRoute = new Hono()
  .get('/', async (c) => {
    return c.json(await CompanyService.findAll());
  })

  .get('/:id', async (c) => {
    return c.json(await CompanyService.findById(Number(c.req.param('id'))));
  })

  .post('/', zValidator('json', createSchema), async (c) => {
    const { name } = c.req.valid('json');
    return c.json(await CompanyService.create(name), 201);
  })

  .patch('/:id', zValidator('json', updateSchema), async (c) => {
    const { name } = c.req.valid('json');
    return c.json(await CompanyService.update(Number(c.req.param('id')), name));
  });
