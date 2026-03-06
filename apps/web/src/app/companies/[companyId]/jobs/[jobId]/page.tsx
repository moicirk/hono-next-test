import { applications, companies, jobs } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ companyId: string; jobId: string }>;
}) {
  const { companyId, jobId } = await params;
  const company = companies.find((c) => c.id === companyId);
  const job = jobs.find((j) => j.id === jobId && j.companyId === companyId);

  if (!company || !job) {
    notFound();
  }

  const jobApplications = applications.filter((a) => a.jobId === jobId);

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
              <p className='text-muted-foreground mt-1 text-sm'>{job.position}</p>
            </div>
            <div className='text-right'>
              <p className='text-muted-foreground text-xs uppercase tracking-wide'>Salary</p>
              <p className='text-lg font-semibold'>
                ${job.salaryFrom.toLocaleString()} &ndash; ${job.salaryTo.toLocaleString()}
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
          Applications{' '}
          <span className='text-muted-foreground text-base font-normal'>({jobApplications.length})</span>
        </h2>

        {jobApplications.length === 0 ? (
          <p className='text-muted-foreground text-sm'>No applications yet.</p>
        ) : (
          <div className='flex flex-col gap-4'>
            {jobApplications.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-base'>{app.name}</CardTitle>
                    <span className='text-muted-foreground text-sm'>
                      {new Date(app.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className='text-muted-foreground text-sm'>{app.phone}</p>
                </CardHeader>
                <CardContent>
                  <p className='text-sm leading-relaxed'>{app.coverLetter}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}