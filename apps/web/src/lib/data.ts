export type Job = {
  id: string;
  title: string;
  description: string;
  salaryFrom: number;
  salaryTo: number;
  position: string;
};

export type Application = {
  id: string;
  jobId: string;
  date: string;
  name: string;
  phone: string;
  coverLetter: string;
};

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    description:
      'We are looking for an experienced frontend developer to join our growing product team. You will lead the development of our customer-facing web application, collaborate closely with designers, and mentor junior developers.',
    salaryFrom: 4000,
    salaryTo: 6000,
    position: 'Frontend Developer',
  },
  {
    id: '2',
    title: 'Backend Engineer (Node.js)',
    description:
      'Join our backend team to build scalable APIs and microservices. You will work with Node.js, PostgreSQL, and cloud infrastructure. Experience with Docker and CI/CD pipelines is a plus.',
    salaryFrom: 4500,
    salaryTo: 7000,
    position: 'Backend Engineer',
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    description:
      'We need a creative and detail-oriented designer to craft beautiful, user-friendly interfaces. You will own the design process from wireframes to high-fidelity prototypes and work directly with engineers during implementation.',
    salaryFrom: 3000,
    salaryTo: 4500,
    position: 'UX/UI Designer',
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    description:
      'We are seeking a DevOps engineer to manage and improve our cloud infrastructure. Responsibilities include maintaining CI/CD pipelines, monitoring systems, and ensuring high availability across environments.',
    salaryFrom: 5000,
    salaryTo: 7500,
    position: 'DevOps Engineer',
  },
  {
    id: '5',
    title: 'Product Manager',
    description:
      'As a Product Manager, you will define the product roadmap, gather requirements from stakeholders, and work cross-functionally with design and engineering to ship features that customers love.',
    salaryFrom: 4000,
    salaryTo: 6500,
    position: 'Product Manager',
  },
  {
    id: '6',
    title: 'QA Engineer',
    description:
      'We are looking for a QA Engineer to ensure the quality of our software products. You will write test plans, perform manual and automated testing, and work with developers to resolve issues quickly.',
    salaryFrom: 2500,
    salaryTo: 4000,
    position: 'QA Engineer',
  },
];

export const applications: Application[] = [
  {
    id: 'a1',
    jobId: '1',
    date: '2025-03-01',
    name: 'Anna Petrova',
    phone: '+380 67 123 4567',
    coverLetter:
      'I have 5 years of experience building React applications and am passionate about performance optimization. I believe I can make a strong impact on your product team.',
  },
  {
    id: 'a2',
    jobId: '1',
    date: '2025-03-02',
    name: 'Dmytro Kovalenko',
    phone: '+380 50 987 6543',
    coverLetter:
      'Having worked on large-scale e-commerce frontends, I am confident in my ability to lead development efforts and deliver high-quality user experiences efficiently.',
  },
  {
    id: 'a3',
    jobId: '1',
    date: '2025-03-03',
    name: 'Olena Marchenko',
    phone: '+380 63 555 7890',
    coverLetter:
      'I am a frontend developer with a strong focus on accessibility and design systems. I would love to bring that expertise to your team and help build inclusive interfaces.',
  },
  {
    id: 'a4',
    jobId: '2',
    date: '2025-03-01',
    name: 'Ivan Bondarenko',
    phone: '+380 98 234 5678',
    coverLetter:
      'I have built RESTful and GraphQL APIs with Node.js for the past 4 years and have extensive experience with PostgreSQL and AWS. Excited to contribute to your backend team.',
  },
  {
    id: 'a5',
    jobId: '2',
    date: '2025-03-04',
    name: 'Kateryna Lysenko',
    phone: '+380 73 456 1234',
    coverLetter:
      'My background in distributed systems and microservices architecture aligns well with the responsibilities outlined. I am eager to help scale your platform.',
  },
  {
    id: 'a6',
    jobId: '3',
    date: '2025-02-28',
    name: 'Mykola Savchenko',
    phone: '+380 66 321 9876',
    coverLetter:
      'Design is my passion. I have 3 years of experience designing SaaS products and have a strong portfolio of user research-backed interface designs that improved key metrics.',
  },
  {
    id: 'a7',
    jobId: '4',
    date: '2025-03-05',
    name: 'Sofiia Tkachenko',
    phone: '+380 95 678 0123',
    coverLetter:
      'I have managed Kubernetes clusters and built CI/CD pipelines for teams of 50+ engineers. I am motivated by automating complex infrastructure challenges.',
  },
];