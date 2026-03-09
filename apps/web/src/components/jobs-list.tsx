'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type Job } from '@/lib/api';
import Link from 'next/link';
import { useState } from 'react';

export function JobsList({ jobs, companyId }: { jobs: Job[]; companyId: string }) {
  const [query, setQuery] = useState('');

  const filtered = jobs.filter((job) => {
    const q = query.toLowerCase();
    return job.title.toLowerCase().includes(q) || job.description.toLowerCase().includes(q);
  });

  const base = `/companies/${companyId}/jobs`;

  return (
    <div className='flex flex-col gap-6'>
      <input
        type='search'
        placeholder='Search by title or description...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
      />

      {filtered.length === 0 ? (
        <p className='text-muted-foreground text-sm'>No jobs match your search.</p>
      ) : (
        <div className='flex flex-col gap-4'>
          {filtered.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <CardTitle className='text-lg'>{job.title}</CardTitle>
                    <CardDescription className='mt-1 capitalize'>{job.status.replace('_', ' ')}</CardDescription>
                  </div>
                  <span className='text-muted-foreground text-sm font-medium whitespace-nowrap'>
                    ${job.priceFrom.toLocaleString()} &ndash; ${job.priceTo.toLocaleString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-sm leading-relaxed'>{job.description}</p>
              </CardContent>
              <CardFooter className='flex items-center justify-between'>
                <Button asChild>
                  <Link href={`${base}/${job.id}`}>View Details</Link>
                </Button>
                <span className='text-muted-foreground text-sm'>
                  {job.applicationCount} {job.applicationCount === 1 ? 'application' : 'applications'}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
