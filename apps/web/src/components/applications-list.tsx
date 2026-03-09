'use client';

import { ApplicationCard } from '@/components/application-card';
import { Button } from '@/components/ui/button';
import { type Application, api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function sortApplications(list: Application[]) {
  const accepted = list.find((a) => a.status === 'accepted');
  if (!accepted) return list;
  return [accepted, ...list.filter((a) => a.id !== accepted.id)];
}

const inputClass =
  'border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-50';

export function ApplicationsList({
  initialApplications,
  jobId,
  jobStatus,
}: {
  initialApplications: Application[];
  jobId: number;
  jobStatus: string;
}) {
  const router = useRouter();
  const [apps, setApps] = useState(() => sortApplications(initialApplications));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', coverLetter: '' });
  const [submitting, setSubmitting] = useState(false);

  const hasAccepted = apps.some((a) => a.status === 'accepted');
  const canApply = !['in_review', 'filled', 'closed'].includes(jobStatus);

  function handleStatusChange(appId: number, newStatus: Application['status']) {
    setApps((prev) => {
      const updated = prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a));
      return sortApplications(updated);
    });
    if (newStatus === 'accepted') {
      router.refresh();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newApp = await api.applications.create(jobId, form);
      setApps((prev) => sortApplications([...prev, newApp]));
      setForm({ name: '', email: '', coverLetter: '' });
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      {apps.map((app, index) => (
        <div key={app.id}>
          <div
            className='transition-opacity duration-300'
            style={{ opacity: hasAccepted && app.status !== 'accepted' ? 0.5 : 1 }}
          >
            <ApplicationCard
              application={app}
              jobId={jobId}
              onStatusChange={(status) => handleStatusChange(app.id, status)}
              disabled={hasAccepted}
            />
          </div>
          {hasAccepted && index === 0 && apps.length > 1 && <hr className='my-2' />}
        </div>
      ))}

      {canApply && showForm ? (
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 rounded-lg border p-4'>
          <input
            required
            placeholder='Full name'
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            disabled={submitting}
            className={inputClass}
          />
          <input
            required
            type='email'
            placeholder='Email'
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            disabled={submitting}
            className={inputClass}
          />
          <textarea
            required
            placeholder='Cover letter'
            value={form.coverLetter}
            onChange={(e) => setForm((f) => ({ ...f, coverLetter: e.target.value }))}
            disabled={submitting}
            rows={4}
            className={inputClass}
          />
          <div className='flex gap-2'>
            <Button type='submit' disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Application'}
            </Button>
            <Button
              type='button'
              variant='outline'
              disabled={submitting}
              onClick={() => {
                setShowForm(false);
                setForm({ name: '', email: '', coverLetter: '' });
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : canApply ? (
        <Button variant='outline' className='self-start' onClick={() => setShowForm(true)}>
          + Add Application
        </Button>
      ) : null}
    </div>
  );
}
