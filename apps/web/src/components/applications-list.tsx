'use client';

import { ApplicationCard } from '@/components/application-card';
import { type Application } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function sortApplications(list: Application[]) {
  const accepted = list.find((a) => a.status === 'accepted');
  if (!accepted) return list;
  return [accepted, ...list.filter((a) => a.id !== accepted.id)];
}

export function ApplicationsList({
  initialApplications,
  jobId,
}: {
  initialApplications: Application[];
  jobId: number;
}) {
  const router = useRouter();
  const [apps, setApps] = useState(() => sortApplications(initialApplications));

  const hasAccepted = apps.some((a) => a.status === 'accepted');

  function handleStatusChange(appId: number, newStatus: Application['status']) {
    setApps((prev) => {
      const updated = prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a));
      return sortApplications(updated);
    });
    if (newStatus === 'accepted') {
      router.refresh();
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
    </div>
  );
}
