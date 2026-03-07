import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const timestamps = {
  createdAt: int('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
};

export const companies = sqliteTable('companies', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  ...timestamps,
});

export const jobs = sqliteTable('jobs', {
  id: int('id').primaryKey({ autoIncrement: true }),
  companyId: int('company_id')
    .notNull()
    .references(() => companies.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  priceFrom: int('price_from').notNull(),
  priceTo: int('price_to').notNull(),
  status: text('status', { enum: ['draft', 'open', 'in_review', 'filled', 'closed'] })
    .notNull()
    .default('draft'),
  ...timestamps,
});

export const clients = sqliteTable('clients', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  ...timestamps,
});

export const applications = sqliteTable('applications', {
  id: int('id').primaryKey({ autoIncrement: true }),
  jobId: int('job_id')
    .notNull()
    .references(() => jobs.id),
  clientId: int('client_id')
    .notNull()
    .references(() => clients.id),
  status: text('status', { enum: ['pending', 'accepted', 'rejected'] })
    .notNull()
    .default('pending'),
  coverLetter: text('cover_letter').notNull(),
  ...timestamps,
});
