'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type Job } from '@/lib/api';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const STATUS_OPTIONS: { value: Job['status']; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'open', label: 'Open' },
  { value: 'in_review', label: 'In Review' },
  { value: 'filled', label: 'Filled' },
  { value: 'closed', label: 'Closed' },
];

export function JobsList({ jobs, companyId }: { jobs: Job[]; companyId: string }) {
  const [query, setQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<Set<Job['status']>>(new Set());

  function toggleStatus(status: Job['status']) {
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      next.has(status) ? next.delete(status) : next.add(status);
      return next;
    });
  }

  const filtered = jobs.filter((job) => {
    const q = query.toLowerCase();
    const matchesQuery = job.title.toLowerCase().includes(q) || job.description.toLowerCase().includes(q);
    const matchesStatus = selectedStatuses.size === 0 || selectedStatuses.has(job.status);
    return matchesQuery && matchesStatus;
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

      <div className='flex flex-col gap-2'>
        <span className='text-sm font-medium'>Status</span>
        <div className='flex flex-wrap items-center gap-2'>
          {STATUS_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              size='sm'
              variant={selectedStatuses.has(opt.value) ? 'default' : 'outline'}
              onClick={() => toggleStatus(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
          {selectedStatuses.size > 0 && (
            <Button
              size='sm'
              variant='ghost'
              onClick={() => setSelectedStatuses(new Set())}
              className='text-muted-foreground gap-1'
            >
              <X className='h-3.5 w-3.5' />
              Clear
            </Button>
          )}
        </div>
      </div>

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
