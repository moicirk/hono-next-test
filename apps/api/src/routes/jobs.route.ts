import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';
import { CompanyModel } from '../models/company.model.js';
import { JobModel } from '../models/job.model.js';

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

async function requireCompany(companyId: number) {
  const company = await CompanyModel.findById(companyId);
  if (!company) throw new HTTPException(404, { message: 'Company not found' });
  return company;
}

export const jobsRoute = new Hono()
  .get('/', async (c) => {
    const companyId = Number(c.req.param('companyId'));
    await requireCompany(companyId);
    const rows = await JobModel.findAllByCompany(companyId);
    return c.json(rows);
  })

  .get('/:id', async (c) => {
    const companyId = Number(c.req.param('companyId'));
    const id = Number(c.req.param('id'));
    await requireCompany(companyId);
    const row = await JobModel.findById(id, companyId);
    if (!row) throw new HTTPException(404, { message: 'Job not found' });
    return c.json(row);
  })

  .post('/', zValidator('json', createSchema), async (c) => {
    const companyId = Number(c.req.param('companyId'));
    await requireCompany(companyId);
    const body = c.req.valid('json');
    const row = await JobModel.create({ ...body, companyId });
    return c.json(row, 201);
  })

  .patch('/:id', zValidator('json', updateSchema), async (c) => {
    const companyId = Number(c.req.param('companyId'));
    const id = Number(c.req.param('id'));
    await requireCompany(companyId);
    const body = c.req.valid('json');
    const row = await JobModel.update(id, companyId, body);
    if (!row) throw new HTTPException(404, { message: 'Job not found' });
    return c.json(row);
  })

  .delete('/:id', async (c) => {
    const companyId = Number(c.req.param('companyId'));
    const id = Number(c.req.param('id'));
    await requireCompany(companyId);
    const ok = await JobModel.delete(id, companyId);
    if (!ok) throw new HTTPException(404, { message: 'Job not found' });
    return c.json({ success: true });
  });