import { db } from './index.js';
import { applications, clients, companies, jobs } from './schema.js';

// Clear in dependency order
await db.delete(applications);
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
const insertedJobs = await db
  .insert(jobs)
  .values([
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
  ])
  .returning();

const [
  seniorFrontend,
  backendEngineer,
  engManager,
  uxDesigner,
  motionDesigner,
  devops,
  productManager,
  sre,
  qaEngineer,
  automationEngineer,
] = insertedJobs;

// Clients
const insertedClients = await db
  .insert(clients)
  .values([
    { name: 'Alice Morgan', email: 'alice.morgan@gmail.com' },
    { name: 'James Carter', email: 'james.carter@gmail.com' },
    { name: 'Emily Harper', email: 'emily.harper@gmail.com' },
    { name: 'Robert Lane', email: 'robert.lane@gmail.com' },
    { name: 'Sarah Mitchell', email: 'sarah.mitchell@gmail.com' },
  ])
  .returning();

const [alice, james, emily, robert, sarah] = insertedClients;

// Applications (3–5 per job, cycling through clients)
await db.insert(applications).values([
  // Senior Frontend Developer — 5 applications
  {
    jobId: seniorFrontend.id,
    clientId: alice.id,
    status: 'pending',
    coverLetter:
      'I have 5 years of React experience and have led frontend rewrites at two startups. I am confident I can make an immediate impact on your product team.',
  },
  {
    jobId: seniorFrontend.id,
    clientId: james.id,
    status: 'pending',
    coverLetter:
      'Having built large-scale SPAs with React and TypeScript, I thrive in collaborative environments. Mentoring junior developers is something I genuinely enjoy.',
  },
  {
    jobId: seniorFrontend.id,
    clientId: emily.id,
    status: 'pending',
    coverLetter:
      'My background in design systems and component libraries makes me a strong fit for this role. I am passionate about creating consistent, accessible user interfaces.',
  },
  {
    jobId: seniorFrontend.id,
    clientId: robert.id,
    status: 'pending',
    coverLetter:
      'I specialise in performance optimisation and have reduced bundle sizes by over 40% at my current company. Excited to bring that experience to your team.',
  },
  {
    jobId: seniorFrontend.id,
    clientId: sarah.id,
    status: 'pending',
    coverLetter:
      'I have worked across the full frontend stack, from component design to CI integration. I am looking for a senior role where I can grow into a leadership position.',
  },

  // Backend Engineer — 4 applications
  {
    jobId: backendEngineer.id,
    clientId: james.id,
    status: 'pending',
    coverLetter:
      'I have built RESTful and GraphQL APIs with Node.js for four years and have deep experience with PostgreSQL and AWS. I am excited to contribute to your backend team.',
  },
  {
    jobId: backendEngineer.id,
    clientId: emily.id,
    status: 'pending',
    coverLetter:
      'My background in distributed systems and microservices architecture aligns well with this role. I am eager to help scale your platform and improve reliability.',
  },
  {
    jobId: backendEngineer.id,
    clientId: robert.id,
    status: 'pending',
    coverLetter:
      'I have designed and maintained high-throughput APIs serving millions of requests per day. Docker and CI/CD are part of my daily workflow.',
  },
  {
    jobId: backendEngineer.id,
    clientId: alice.id,
    status: 'pending',
    coverLetter:
      'I transitioned from frontend to backend two years ago and have since focused on Node.js microservices. I am keen to deepen my expertise in a dedicated backend role.',
  },

  // Engineering Manager — 3 applications
  {
    jobId: engManager.id,
    clientId: sarah.id,
    status: 'pending',
    coverLetter:
      'I have managed engineering teams of up to 10 people across three product cycles. I believe strong 1:1s and clear roadmaps are the foundation of high-performing teams.',
  },
  {
    jobId: engManager.id,
    clientId: robert.id,
    status: 'pending',
    coverLetter:
      'After six years as a software engineer, I moved into management and have been leading a team of eight for two years. I am looking for a new challenge at a growing company.',
  },
  {
    jobId: engManager.id,
    clientId: james.id,
    status: 'pending',
    coverLetter:
      'I have experience bridging product and engineering, defining technical strategy, and holding teams accountable to delivery timelines without sacrificing quality.',
  },

  // UX/UI Designer — 4 applications
  {
    jobId: uxDesigner.id,
    clientId: emily.id,
    status: 'pending',
    coverLetter:
      'Design is my passion. I have three years of experience designing SaaS products and a strong portfolio of user-research-backed interfaces that improved key metrics.',
  },
  {
    jobId: uxDesigner.id,
    clientId: alice.id,
    status: 'pending',
    coverLetter:
      'I specialise in interaction design and prototyping in Figma. I have shipped features used by over 200,000 users and love collaborating closely with engineers.',
  },
  {
    jobId: uxDesigner.id,
    clientId: sarah.id,
    status: 'pending',
    coverLetter:
      'My work spans mobile and desktop products. I am equally comfortable running user interviews and crafting pixel-perfect mockups ready for handoff.',
  },
  {
    jobId: uxDesigner.id,
    clientId: james.id,
    status: 'pending',
    coverLetter:
      'I bring a hybrid background in graphic design and UX, which helps me balance aesthetics with usability. I am excited about the opportunity to join a product-focused team.',
  },

  // Motion Designer — 3 applications
  {
    jobId: motionDesigner.id,
    clientId: robert.id,
    status: 'pending',
    coverLetter:
      'I have produced motion graphics for product launches and marketing campaigns using After Effects and Lottie. I am comfortable working within brand guidelines while pushing creative boundaries.',
  },
  {
    jobId: motionDesigner.id,
    clientId: emily.id,
    status: 'pending',
    coverLetter:
      'Animation is at the core of everything I do. From micro-interactions in Figma to full-scale explainer videos, I bring ideas to life with precision and creativity.',
  },
  {
    jobId: motionDesigner.id,
    clientId: alice.id,
    status: 'pending',
    coverLetter:
      'With four years of motion design experience across agencies and in-house teams, I am ready to contribute to both product and marketing animation efforts.',
  },

  // DevOps Engineer — 5 applications
  {
    jobId: devops.id,
    clientId: sarah.id,
    status: 'pending',
    coverLetter:
      'I have managed Kubernetes clusters and built CI/CD pipelines for teams of 50+ engineers. I am motivated by automating complex infrastructure challenges.',
  },
  {
    jobId: devops.id,
    clientId: james.id,
    status: 'pending',
    coverLetter:
      'My experience spans AWS, GCP, and on-premise environments. I have reduced deployment times by 60% through pipeline optimisation and infrastructure-as-code.',
  },
  {
    jobId: devops.id,
    clientId: alice.id,
    status: 'pending',
    coverLetter:
      'I am a strong advocate for DevSecOps practices and have embedded security tooling into CI pipelines at my current employer. Monitoring and on-call culture are areas I take seriously.',
  },
  {
    jobId: devops.id,
    clientId: robert.id,
    status: 'pending',
    coverLetter:
      'I have been responsible for cloud cost optimisation, saving my team over 30% on monthly AWS bills. I enjoy finding efficiency gains without compromising reliability.',
  },
  {
    jobId: devops.id,
    clientId: emily.id,
    status: 'pending',
    coverLetter:
      'Terraform, Ansible, and GitHub Actions are my daily tools. I am looking for a role where I can help build a scalable, observable platform from the ground up.',
  },

  // Product Manager — 4 applications
  {
    jobId: productManager.id,
    clientId: alice.id,
    status: 'pending',
    coverLetter:
      'I have owned product roadmaps at two B2B SaaS companies, working closely with engineering and design to ship features that drove measurable customer value.',
  },
  {
    jobId: productManager.id,
    clientId: emily.id,
    status: 'pending',
    coverLetter:
      'My approach to product management centres on customer discovery and data-informed decision making. I am comfortable managing stakeholder expectations across the business.',
  },
  {
    jobId: productManager.id,
    clientId: robert.id,
    status: 'pending',
    coverLetter:
      'I have experience taking features from zero to one, including running alpha programmes and iterating rapidly based on user feedback.',
  },
  {
    jobId: productManager.id,
    clientId: sarah.id,
    status: 'pending',
    coverLetter:
      'I bring a technical background that helps me communicate effectively with engineering teams and write clear, actionable specs without unnecessary overhead.',
  },

  // Site Reliability Engineer — 3 applications
  {
    jobId: sre.id,
    clientId: james.id,
    status: 'pending',
    coverLetter:
      'I have defined and maintained SLOs for a platform serving 5 million users, built dashboards in Grafana, and led blameless post-mortems that improved system reliability significantly.',
  },
  {
    jobId: sre.id,
    clientId: sarah.id,
    status: 'pending',
    coverLetter:
      'Reliability engineering is where my interest in both software and operations converges. I have implemented chaos engineering practices that proactively uncovered production risks.',
  },
  {
    jobId: sre.id,
    clientId: robert.id,
    status: 'pending',
    coverLetter:
      'I have extensive experience with observability tooling including Prometheus, Grafana, and OpenTelemetry. I am passionate about making systems easier to operate and debug.',
  },

  // QA Engineer — 4 applications
  {
    jobId: qaEngineer.id,
    clientId: emily.id,
    status: 'pending',
    coverLetter:
      'I have five years of manual and automated testing experience across web and mobile platforms. Writing clear test plans and bug reports is something I take pride in.',
  },
  {
    jobId: qaEngineer.id,
    clientId: alice.id,
    status: 'pending',
    coverLetter:
      'I work closely with developers to shift quality left, reviewing requirements before a line of code is written and catching issues early in the development cycle.',
  },
  {
    jobId: qaEngineer.id,
    clientId: james.id,
    status: 'pending',
    coverLetter:
      'My experience spans functional, regression, and exploratory testing. I have a methodical approach and enjoy collaborating with cross-functional teams to deliver reliable software.',
  },
  {
    jobId: qaEngineer.id,
    clientId: sarah.id,
    status: 'pending',
    coverLetter:
      "I have contributed to QA strategy at a fast-growing startup, setting up processes from scratch and building a culture where quality is everyone's responsibility.",
  },

  // Automation Test Engineer — 3 applications
  {
    jobId: automationEngineer.id,
    clientId: robert.id,
    status: 'pending',
    coverLetter:
      'I have built end-to-end test suites in Playwright and Cypress that run in CI on every pull request. Reliable automation has consistently reduced regression cycles by weeks.',
  },
  {
    jobId: automationEngineer.id,
    clientId: sarah.id,
    status: 'pending',
    coverLetter:
      'I am proficient in both Cypress and Playwright and have experience integrating automated tests into GitHub Actions and GitLab CI pipelines.',
  },
  {
    jobId: automationEngineer.id,
    clientId: james.id,
    status: 'pending',
    coverLetter:
      'Test automation is my speciality. I have helped three engineering teams move from manual regression to fully automated pipelines, improving confidence in every release.',
  },
]);

console.log('Seeded: 4 companies, 10 jobs, 5 clients, 39 applications.');
