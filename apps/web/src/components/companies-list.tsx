'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type Company, api } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function CompaniesList({ initialCompanies }: { initialCompanies: Company[] }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setLoading(true);
    try {
      await api.companies.create(trimmed);
      setName('');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-3'>
        {initialCompanies.map((company) => (
          <Card key={company.id} className='transition-shadow hover:shadow-md'>
            <CardContent className='flex items-center justify-between py-4'>
              <span className='font-medium'>{company.name}</span>
              <Button asChild size='sm' variant='outline'>
                <Link href={`/companies/${company.id}/jobs`}>View Jobs</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <form onSubmit={handleAdd} className='mt-4 flex gap-2'>
        <input
          type='text'
          placeholder='Company name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          className='border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex-1 rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-50'
        />
        <Button type='submit' disabled={loading}>
          {loading ? 'Adding...' : 'Add Company'}
        </Button>
      </form>
    </div>
  );
}
