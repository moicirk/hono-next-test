'use client';

import { useState } from 'react';
import { type Job } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function JobsList({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState('');

  const filtered = jobs.filter((job) => {
    const q = query.toLowerCase();
    return (
      job.title.toLowerCase().includes(q) ||
      job.position.toLowerCase().includes(q) ||
      job.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className='flex flex-col gap-6'>
      <input
        type='search'
        placeholder='Search by title, position, or description...'
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
                    <CardDescription className='mt-1'>{job.position}</CardDescription>
                  </div>
                  <span className='text-muted-foreground whitespace-nowrap text-sm font-medium'>
                    ${job.salaryFrom.toLocaleString()} &ndash; ${job.salaryTo.toLocaleString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-sm leading-relaxed'>{job.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/jobs/${job.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}