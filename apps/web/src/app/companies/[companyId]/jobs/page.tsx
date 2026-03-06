import { companies, jobs } from '@/lib/data';
import { JobsList } from '@/components/jobs-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CompanyJobsPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const company = companies.find((c) => c.id === companyId);

  if (!company) {
    notFound();
  }

  const companyJobs = jobs.filter((j) => j.companyId === companyId);

  return (
    <main className='mx-auto max-w-4xl px-4 py-10'>
      <div className='mb-6'>
        <Button asChild variant='outline' size='sm'>
          <Link href='/companies'>&larr; Back to Companies</Link>
        </Button>
      </div>

      <h1 className='mb-2 text-3xl font-bold'>{company.name}</h1>
      <p className='text-muted-foreground mb-8'>
        {companyJobs.length} open {companyJobs.length === 1 ? 'position' : 'positions'}
      </p>

      <JobsList jobs={companyJobs} companyId={companyId} />

      <div className='mt-8'>
        <Button asChild variant='outline'>
          <Link href={`/companies/${companyId}/jobs/new`}>+ Add New Job</Link>
        </Button>
      </div>
    </main>
  );
}