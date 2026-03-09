import { serve } from '@hono/node-server';
import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { ForbiddenException } from './exceptions/forbidden.exception.js';
import { NotFoundException } from './exceptions/not-found.exception.js';
import { applicationsRoute } from './routes/applications.js';
import { clientsRoute } from './routes/clients.js';
import { companiesRoute } from './routes/companies.js';
import { jobsRoute } from './routes/jobs.js';

const app = new Hono()
  .onError((err, c) => {
    if (err instanceof NotFoundException) {
      return c.json({ message: err.message }, 404);
    }
    if (err instanceof ForbiddenException) {
      return c.json({ message: err.message }, 403);
    }
    return c.json({ message: 'Internal server error' }, 500);
  })
  .use(
    '/api/*',
    cors({
      origin: process.env.WEB_BASE_URL ?? 'http://localhost:3000',
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      maxAge: 600,
    }),
  )
  .route('/api/companies', companiesRoute)
  .route('/api/companies/:companyId/jobs', jobsRoute)
  .route('/api/jobs/:jobId/applications', applicationsRoute)
  .route('/api/clients', clientsRoute);

if (process.env.NODE_ENV !== 'test') {
  const port = Number(process.env.PORT) || 8000;
  console.log(`✅ Hono server is running on http://localhost:${port}`);
  serve({ fetch: app.fetch, port });
}

export default app;
