'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type Application, api } from '@/lib/api';
import { useState } from 'react';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
] as const;

const STATUS_STYLES: Record<Application['status'], string> = {
  pending: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  accepted: 'text-green-700 bg-green-50 border-green-200',
  rejected: 'text-red-600 bg-red-50 border-red-200',
};

export function ApplicationCard({
  application,
  jobId,
  onStatusChange,
  disabled = false,
}: {
  application: Application;
  jobId: number;
  onStatusChange: (status: Application['status']) => void;
  disabled?: boolean;
}) {
  const [saving, setSaving] = useState(false);

  async function handleStatusChange(next: Application['status']) {
    if (next === application.status) return;
    setSaving(true);
    try {
      await api.applications.updateStatus(jobId, application.id, next);
      onStatusChange(next);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <CardTitle className='text-base'>{application.client.name}</CardTitle>
            <p className='text-muted-foreground text-sm'>{application.client.email}</p>
          </div>
          <div className='flex flex-col items-end gap-1.5'>
            <select
              value={application.status}
              disabled={saving || disabled}
              onChange={(e) => handleStatusChange(e.target.value as Application['status'])}
              className={`rounded-md border px-2 py-1 text-xs font-medium focus:outline-none disabled:opacity-50 ${STATUS_STYLES[application.status]}`}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className='text-muted-foreground text-xs'>
              {new Date(application.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm leading-relaxed'>{application.coverLetter}</p>
      </CardContent>
    </Card>
  );
}
