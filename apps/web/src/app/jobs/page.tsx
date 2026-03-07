import { JobsList } from '@/components/jobs-list';
import { Button } from '@/components/ui/button';
import { jobs } from '@/lib/data';
import Link from 'next/link';

export default function JobsPage() {
  return (
    <main className='mx-auto max-w-4xl px-4 py-10'>
      <h1 className='mb-2 text-3xl font-bold'>Job Openings</h1>
      <p className='text-muted-foreground mb-8'>Browse available positions and find the right fit.</p>

      <JobsList jobs={jobs} />

      <div className='mt-8'>
        <Button asChild variant='outline'>
          <Link href='/jobs/new'>+ Add New Job</Link>
        </Button>
      </div>
    </main>
  );
}
