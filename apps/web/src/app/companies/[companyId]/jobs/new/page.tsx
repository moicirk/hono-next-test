'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewJobPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      title: (form.elements.namedItem('title') as HTMLInputElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
      priceFrom: Number((form.elements.namedItem('priceFrom') as HTMLInputElement).value),
      priceTo: Number((form.elements.namedItem('priceTo') as HTMLInputElement).value),
      status: 'draft' as const,
    };
    setLoading(true);
    setError('');
    try {
      await api.jobs.create(Number(companyId), data);
      router.push(`/companies/${companyId}/jobs`);
      router.refresh();
    } catch {
      setError('Failed to post the job. Please try again.');
      setLoading(false);
    }
  }

  return (
    <main className='mx-auto max-w-2xl px-4 py-10'>
      <div className='mb-6'>
        <Button asChild variant='outline' size='sm'>
          <Link href={`/companies/${companyId}/jobs`}>&larr; Back to Jobs</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Post a New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-sm font-medium' htmlFor='title'>
                Job Title
              </label>
              <input
                id='title'
                name='title'
                type='text'
                required
                placeholder='e.g. Senior Frontend Developer'
                className='border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
              />
            </div>

            <div className='flex flex-col gap-1.5'>
              <label className='text-sm font-medium' htmlFor='description'>
                Description
              </label>
              <textarea
                id='description'
                name='description'
                required
                rows={5}
                placeholder='Describe the role, responsibilities, and requirements...'
                className='border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
              />
            </div>

            <div className='flex gap-4'>
              <div className='flex flex-1 flex-col gap-1.5'>
                <label className='text-sm font-medium' htmlFor='priceFrom'>
                  Salary From ($)
                </label>
                <input
                  id='priceFrom'
                  name='priceFrom'
                  type='number'
                  required
                  min={0}
                  placeholder='e.g. 3000'
                  className='border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
                />
              </div>
              <div className='flex flex-1 flex-col gap-1.5'>
                <label className='text-sm font-medium' htmlFor='priceTo'>
                  Salary To ($)
                </label>
                <input
                  id='priceTo'
                  name='priceTo'
                  type='number'
                  required
                  min={0}
                  placeholder='e.g. 5000'
                  className='border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
                />
              </div>
            </div>

            {error && <p className='text-destructive text-sm'>{error}</p>}

            <Button type='submit' disabled={loading} className='mt-2'>
              {loading ? 'Posting...' : 'Post Job'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
