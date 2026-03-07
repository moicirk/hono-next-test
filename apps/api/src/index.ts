import { serve } from '@hono/node-server';
import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { applicationsRoute } from './routes/applications.route.js';
import { companiesRoute } from './routes/companies.route.js';
import { jobsRoute } from './routes/jobs.route.js';

const app = new Hono()
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
  .route('/api/jobs/:jobId/applications', applicationsRoute);

if (process.env.NODE_ENV !== 'test') {
  const port = Number(process.env.PORT) || 8000;
  console.log(`✅ Hono server is running on http://localhost:${port}`);
  serve({ fetch: app.fetch, port });
}

export default app;
