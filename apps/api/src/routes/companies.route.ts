import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';
import { CompanyModel } from '../models/company.model.js';

const createSchema = z.object({
  name: z.string().min(1),
});

const updateSchema = z.object({
  name: z.string().min(1),
});

export const companiesRoute = new Hono()
  .get('/', async (c) => {
    const rows = await CompanyModel.findAll();
    return c.json(rows);
  })

  .get('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const row = await CompanyModel.findById(id);
    if (!row) throw new HTTPException(404, { message: 'Company not found' });
    return c.json(row);
  })

  .post('/', zValidator('json', createSchema), async (c) => {
    const { name } = c.req.valid('json');
    const row = await CompanyModel.create({ name });
    return c.json(row, 201);
  })

  .patch('/:id', zValidator('json', updateSchema), async (c) => {
    const id = Number(c.req.param('id'));
    const { name } = c.req.valid('json');
    const row = await CompanyModel.update(id, { name });
    if (!row) throw new HTTPException(404, { message: 'Company not found' });
    return c.json(row);
  })

  .delete('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const ok = await CompanyModel.delete(id);
    if (!ok) throw new HTTPException(404, { message: 'Company not found' });
    return c.json({ success: true });
  });