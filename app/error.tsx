'use client';

import React from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Typography } from '@/components/atoms/Typography/Typography';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <Typography variant="h3" weight="semibold" className="mb-4">
          Something went wrong
        </Typography>
        <Typography variant="body" color="muted" className="mb-6">
          {error?.message || 'An unexpected error occurred.'}
        </Typography>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
