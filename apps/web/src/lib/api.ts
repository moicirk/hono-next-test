const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

// ---- Types ----------------------------------------------------------------

export type Company = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Job = {
  id: number;
  companyId: number;
  title: string;
  description: string;
  priceFrom: number;
  priceTo: number;
  status: 'draft' | 'open' | 'in_review' | 'filled' | 'closed';
  applicationCount: number;
  createdAt: string;
  updatedAt: string;
};

export type Client = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type Application = {
  id: number;
  jobId: number;
  status: 'pending' | 'accepted' | 'rejected';
  coverLetter: string;
  createdAt: string;
  updatedAt: string;
  client: Pick<Client, 'id' | 'name' | 'email'>;
};

// ---- Fetch helper ---------------------------------------------------------

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

// ---- Resource methods -----------------------------------------------------

export const api = {
  companies: {
    list: () => apiFetch<Company[]>('/api/companies'),
    get: (id: number) => apiFetch<Company>(`/api/companies/${id}`),
    create: (name: string) =>
      apiFetch<Company>('/api/companies', {
        method: 'POST',
        body: JSON.stringify({ name }),
      }),
  },

  jobs: {
    list: (companyId: number) => apiFetch<Job[]>(`/api/companies/${companyId}/jobs`),
    get: (companyId: number, id: number) => apiFetch<Job>(`/api/companies/${companyId}/jobs/${id}`),
    create: (companyId: number, data: Pick<Job, 'title' | 'description' | 'priceFrom' | 'priceTo' | 'status'>) =>
      apiFetch<Job>(`/api/companies/${companyId}/jobs`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  clients: {
    list: () => apiFetch<Client[]>('/api/clients'),
    get: (id: number) => apiFetch<Client>(`/api/clients/${id}`),
  },

  applications: {
    list: (jobId: number) => apiFetch<Application[]>(`/api/jobs/${jobId}/applications`),
    create: (jobId: number, data: { clientId: number; coverLetter: string }) =>
      apiFetch<Application>(`/api/jobs/${jobId}/applications`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateStatus: (jobId: number, id: number, status: Application['status']) =>
      apiFetch<Application>(`/api/jobs/${jobId}/applications/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
  },
};
