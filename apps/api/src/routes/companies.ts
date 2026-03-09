import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { CompanyService } from '../services/company.service.js';
import { createCompanyValidator, updateCompanyValidator } from '../validation/company.validation.js';

export const companiesRoute = new Hono()
  .get('/', async (c) => {
    return c.json(await CompanyService.findAll());
  })

  .get('/:id', async (c) => {
    return c.json(await CompanyService.findById(Number(c.req.param('id'))));
  })

  .post('/', zValidator('json', createCompanyValidator), async (c) => {
    const { name } = c.req.valid('json');
    return c.json(await CompanyService.create(name), 201);
  })

  .patch('/:id', zValidator('json', updateCompanyValidator), async (c) => {
    const { name } = c.req.valid('json');
    return c.json(await CompanyService.update(Number(c.req.param('id')), name));
  });
