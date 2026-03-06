'use client';

import { useState } from 'react';
import { type Company } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CompaniesList({ initialCompanies }: { initialCompanies: Company[] }) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [name, setName] = useState('');

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const newCompany: Company = { id: `c${Date.now()}`, name: trimmed };
    setCompanies((prev) => [...prev, newCompany]);
    setName('');
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-3'>
        {companies.map((company) => (
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
          className='border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex-1 rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
        />
        <Button type='submit'>Add Company</Button>
      </form>
    </div>
  );
}