import { db } from './index.js';
import { clients, companies, jobs } from './schema.js';

// Clear in dependency order
await db.delete(jobs);
await db.delete(clients);
await db.delete(companies);

// Companies
const insertedCompanies = await db
  .insert(companies)
  .values([{ name: 'TechCorp' }, { name: 'DesignHub' }, { name: 'CloudSys' }, { name: 'QualitySoft' }])
  .returning();

const [techCorp, designHub, cloudSys, qualitySoft] = insertedCompanies;

// Jobs
await db.insert(jobs).values([
  // TechCorp
  {
    companyId: techCorp.id,
    title: 'Senior Frontend Developer',
    description:
      'We are looking for an experienced frontend developer to join our growing product team. You will lead the development of our customer-facing web application, collaborate closely with designers, and mentor junior developers.',
    priceFrom: 4000,
    priceTo: 6000,
    status: 'open',
  },
  {
    companyId: techCorp.id,
    title: 'Backend Engineer (Node.js)',
    description:
      'Join our backend team to build scalable APIs and microservices. You will work with Node.js, PostgreSQL, and cloud infrastructure. Experience with Docker and CI/CD pipelines is a plus.',
    priceFrom: 4500,
    priceTo: 7000,
    status: 'open',
  },
  {
    companyId: techCorp.id,
    title: 'Engineering Manager',
    description:
      'We are seeking an Engineering Manager to lead a team of 6-8 engineers. You will drive technical strategy, conduct 1:1s, and work closely with product and design to deliver high-quality software on time.',
    priceFrom: 6000,
    priceTo: 9000,
    status: 'draft',
  },

  // DesignHub
  {
    companyId: designHub.id,
    title: 'UX/UI Designer',
    description:
      'We need a creative and detail-oriented designer to craft beautiful, user-friendly interfaces. You will own the design process from wireframes to high-fidelity prototypes and work directly with engineers during implementation.',
    priceFrom: 3000,
    priceTo: 4500,
    status: 'open',
  },
  {
    companyId: designHub.id,
    title: 'Motion Designer',
    description:
      'Create compelling animations and motion graphics for our product and marketing materials. You will collaborate with the brand team and work in Figma, After Effects, and Lottie.',
    priceFrom: 2500,
    priceTo: 4000,
    status: 'in_review',
  },

  // CloudSys
  {
    companyId: cloudSys.id,
    title: 'DevOps Engineer',
    description:
      'We are seeking a DevOps engineer to manage and improve our cloud infrastructure. Responsibilities include maintaining CI/CD pipelines, monitoring systems, and ensuring high availability across environments.',
    priceFrom: 5000,
    priceTo: 7500,
    status: 'open',
  },
  {
    companyId: cloudSys.id,
    title: 'Product Manager',
    description:
      'As a Product Manager, you will define the product roadmap, gather requirements from stakeholders, and work cross-functionally with design and engineering to ship features that customers love.',
    priceFrom: 4000,
    priceTo: 6500,
    status: 'open',
  },
  {
    companyId: cloudSys.id,
    title: 'Site Reliability Engineer',
    description:
      'Own the reliability and scalability of our platform. You will build observability tooling, manage on-call rotations, and work with engineering teams to define and meet SLO targets.',
    priceFrom: 5500,
    priceTo: 8000,
    status: 'filled',
  },

  // QualitySoft
  {
    companyId: qualitySoft.id,
    title: 'QA Engineer',
    description:
      'We are looking for a QA Engineer to ensure the quality of our software products. You will write test plans, perform manual and automated testing, and work with developers to resolve issues quickly.',
    priceFrom: 2500,
    priceTo: 4000,
    status: 'open',
  },
  {
    companyId: qualitySoft.id,
    title: 'Automation Test Engineer',
    description:
      'Build and maintain automated test suites for our web and mobile products. You will work with Playwright and Cypress, integrate tests into CI pipelines, and help drive a culture of quality across the team.',
    priceFrom: 3000,
    priceTo: 4500,
    status: 'draft',
  },
]);

// Clients
await db.insert(clients).values([
  { name: 'Alice Morgan', email: 'alice.morgan@gmail.com' },
  { name: 'James Carter', email: 'james.carter@gmail.com' },
  { name: 'Emily Harper', email: 'emily.harper@gmail.com' },
  { name: 'Robert Lane', email: 'robert.lane@gmail.com' },
  { name: 'Sarah Mitchell', email: 'sarah.mitchell@gmail.com' },
]);

console.log('Seeded: 4 companies, 10 jobs, 5 clients.');
