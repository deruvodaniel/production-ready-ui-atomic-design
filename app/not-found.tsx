import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { PageLayout } from '@/components/templates/PageLayout/PageLayout';
import Link from 'next/link';

export default function NotFound() {
  return (
    <PageLayout
      header={{
        title: 'Page Not Found',
      }}
    >
      <div className="max-w-md mx-auto text-center">
        <Typography variant="h1" weight="bold" className="mb-4">
          404
        </Typography>
        <Typography variant="h4" weight="semibold" className="mb-4">
          Page Not Found
        </Typography>
        <Typography variant="body" color="muted" className="mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Typography>
        <Link href="/">
          <Button size="lg">Go Home</Button>
        </Link>
      </div>
    </PageLayout>
  );
}
