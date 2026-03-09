import { CompaniesList } from '@/components/companies-list';
import { api } from '@/lib/api';

export default async function CompaniesPage() {
  const companies = await api.companies.list();

  return (
    <main className='mx-auto max-w-2xl px-4 py-10'>
      <h1 className='mb-2 text-3xl font-bold'>Companies</h1>
      <p className='text-muted-foreground mb-8'>Select a company to view their job openings.</p>
      <CompaniesList initialCompanies={companies} />
    </main>
  );
}
