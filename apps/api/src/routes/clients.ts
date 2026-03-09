import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { ClientRepository } from '../repositories/client.repository.js';

export const clientsRoute = new Hono()
  .get('/', async (c) => {
    const rows = await ClientRepository.findAll();
    return c.json(rows);
  })

  .get('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const row = await ClientRepository.findById(id);
    if (!row) {
      throw new HTTPException(404, { message: 'Client not found' });
    }
    return c.json(row);
  });
