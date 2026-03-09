'use client';

import { Button } from '@/components/ui/button';
import { type Job, api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Variant = 'default' | 'outline' | 'destructive';

const CONFIG: Record<string, { label: string; loadingLabel: string; variant: Variant }> = {
  in_review: { label: 'In Review', loadingLabel: 'Updating...', variant: 'default' },
  open: { label: 'Back to Open', loadingLabel: 'Updating...', variant: 'outline' },
  closed: { label: 'Close the Job', loadingLabel: 'Closing...', variant: 'destructive' },
};

export function JobStatusButton({
  companyId,
  jobId,
  targetStatus,
}: {
  companyId: number;
  jobId: number;
  targetStatus: Job['status'];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { label, loadingLabel, variant } = CONFIG[targetStatus];

  async function handle() {
    setLoading(true);
    try {
      await api.jobs.updateStatus(companyId, jobId, targetStatus);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button variant={variant} size='sm' disabled={loading} onClick={handle}>
      {loading ? loadingLabel : label}
    </Button>
  );
}
