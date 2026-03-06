import { db } from './index.js';
import { companies } from './schema.js';

await db.delete(companies);

await db.insert(companies).values([
  { name: 'TechCorp' },
  { name: 'DesignHub' },
  { name: 'CloudSys' },
  { name: 'QualitySoft' },
]);

console.log('Seeded 4 companies.');