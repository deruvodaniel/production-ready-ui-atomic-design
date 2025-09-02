import React from 'react';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <Typography variant="h2" weight="bold" className="mb-2">
          404 - Page not found
        </Typography>
        <Typography variant="body" color="muted" className="mb-6">
          The page you are looking for does not exist.
        </Typography>
        <a href="/">
          <Button>Go Home</Button>
        </a>
      </div>
    </div>
  );
}
