import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const companies = sqliteTable('companies', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
});