import { ApplicationsList } from '@/components/applications-list';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function JobDetailPage({ params }: { params: Promise<{ companyId: string; jobId: string }> }) {
  const { companyId, jobId } = await params;

  const [company, job] = await Promise.all([
    api.companies.get(Number(companyId)).catch(() => null),
    api.jobs.get(Number(companyId), Number(jobId)).catch(() => null),
  ]);

  if (!company || !job) notFound();

  const applications = await api.applications.list(Number(jobId)).catch(() => []);

  return (
    <main className='mx-auto max-w-4xl px-4 py-10'>
      <div className='mb-6'>
        <Button asChild variant='outline' size='sm'>
          <Link href={`/companies/${companyId}/jobs`}>&larr; Back to {company.name} Jobs</Link>
        </Button>
      </div>

      <Card className='mb-10'>
        <CardHeader>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <CardTitle className='text-2xl'>{job.title}</CardTitle>
              <p className='text-muted-foreground mt-1 text-sm capitalize'>{job.status.replace('_', ' ')}</p>
            </div>
            <div className='text-right'>
              <p className='text-muted-foreground text-xs tracking-wide uppercase'>Salary</p>
              <p className='text-lg font-semibold'>
                ${job.priceFrom.toLocaleString()} &ndash; ${job.priceTo.toLocaleString()}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h2 className='mb-2 font-semibold'>About the role</h2>
          <p className='text-sm leading-relaxed'>{job.description}</p>
        </CardContent>
      </Card>

      <section>
        <h2 className='mb-4 text-xl font-bold'>
          Applications <span className='text-muted-foreground text-base font-normal'>({applications.length})</span>
        </h2>

        {applications.length === 0 ? (
          <p className='text-muted-foreground text-sm'>No applications yet.</p>
        ) : (
          <ApplicationsList initialApplications={applications} jobId={Number(jobId)} />
        )}
      </section>
    </main>
  );
}
