import { Hono } from 'hono';
import { ClientService } from '../services/client.service.js';

export const clientsRoute = new Hono()
  .get('/', async (c) => {
    return c.json(await ClientService.findAll());
  })

  .get('/:id', async (c) => {
    return c.json(await ClientService.findById(Number(c.req.param('id'))));
  });
