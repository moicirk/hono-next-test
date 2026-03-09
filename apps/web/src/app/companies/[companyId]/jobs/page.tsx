import { JobsList } from '@/components/jobs-list';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CompanyJobsPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;

  const [company, jobs] = await Promise.all([
    api.companies.get(Number(companyId)).catch(() => null),
    api.jobs.list(Number(companyId)).catch(() => []),
  ]);

  if (!company) notFound();

  return (
    <main className='mx-auto max-w-4xl px-4 py-10'>
      <div className='mb-6'>
        <Button asChild variant='outline' size='sm'>
          <Link href='/companies'>&larr; Back to Companies</Link>
        </Button>
      </div>

      <h1 className='mb-2 text-3xl font-bold'>{company.name}</h1>
      <p className='text-muted-foreground mb-8'>
        {jobs.length} open {jobs.length === 1 ? 'position' : 'positions'}
      </p>

      <JobsList jobs={jobs} companyId={companyId} />

      <div className='mt-8'>
        <Button asChild variant='outline'>
          <Link href={`/companies/${companyId}/jobs/new`}>+ Add New Job</Link>
        </Button>
      </div>
    </main>
  );
}
