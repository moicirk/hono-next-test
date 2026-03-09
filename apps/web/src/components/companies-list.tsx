'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type Company, api } from '@/lib/api';
import { Check, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function CompaniesList({ initialCompanies }: { initialCompanies: Company[] }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [saving, setSaving] = useState(false);

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

  function startEdit(company: Company) {
    setEditingId(company.id);
    setEditingName(company.name);
  }

  async function handleSave(id: number) {
    const trimmed = editingName.trim();
    if (!trimmed) return;
    setSaving(true);
    try {
      await api.companies.update(id, trimmed);
      setEditingId(null);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-3'>
        {initialCompanies.map((company) => (
          <Card key={company.id} className='transition-shadow hover:shadow-md'>
            <CardContent className='flex items-center justify-between gap-4 py-4'>
              {editingId === company.id ? (
                <input
                  autoFocus
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave(company.id);
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                  disabled={saving}
                  className='border-input bg-background focus-visible:ring-ring min-w-0 flex-1 rounded-md border px-3 py-1.5 text-sm font-medium focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50'
                />
              ) : (
                <span className='font-medium'>{company.name}</span>
              )}

              <div className='flex shrink-0 items-center gap-2'>
                {editingId === company.id ? (
                  <Button
                    size='icon'
                    variant='ghost'
                    disabled={saving}
                    onClick={() => handleSave(company.id)}
                    className='h-8 w-8'
                  >
                    <Check className='h-4 w-4' />
                  </Button>
                ) : (
                  <>
                    <Button size='icon' variant='ghost' onClick={() => startEdit(company)} className='h-8 w-8'>
                      <Pencil className='h-4 w-4' />
                    </Button>
                  </>
                )}
                <Button asChild size='sm' variant='outline'>
                  <Link href={`/companies/${company.id}/jobs`}>View Jobs</Link>
                </Button>
              </div>
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
