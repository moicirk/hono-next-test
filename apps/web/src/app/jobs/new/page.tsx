'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';

export default function NewJobPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className='mx-auto max-w-2xl px-4 py-10'>
        <Card>
          <CardContent className='py-10 text-center'>
            <p className='mb-4 text-lg font-semibold'>Job posted successfully!</p>
            <Button asChild>
              <Link href='/jobs'>Back to Jobs</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className='mx-auto max-w-2xl px-4 py-10'>
      <div className='mb-6'>
        <Button asChild variant='outline' size='sm'>
          <Link href='/jobs'>&larr; Back to Jobs</Link>
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
              <label className='text-sm font-medium' htmlFor='position'>
                Position Sought
              </label>
              <input
                id='position'
                name='position'
                type='text'
                required
                placeholder='e.g. Frontend Developer'
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
                <label className='text-sm font-medium' htmlFor='salaryFrom'>
                  Salary From ($)
                </label>
                <input
                  id='salaryFrom'
                  name='salaryFrom'
                  type='number'
                  required
                  min={0}
                  placeholder='e.g. 3000'
                  className='border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
                />
              </div>
              <div className='flex flex-1 flex-col gap-1.5'>
                <label className='text-sm font-medium' htmlFor='salaryTo'>
                  Salary To ($)
                </label>
                <input
                  id='salaryTo'
                  name='salaryTo'
                  type='number'
                  required
                  min={0}
                  placeholder='e.g. 5000'
                  className='border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
                />
              </div>
            </div>

            <Button type='submit' className='mt-2'>
              Post Job
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
