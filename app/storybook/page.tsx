'use client';

import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { Card } from '@/components/molecules/Card/Card';
import { PageLayout } from '@/components/templates/PageLayout/PageLayout';
import { ExternalLink, Book, Zap } from 'lucide-react';

export default function StorybookPage() {
  return (
    <PageLayout
      header={{
        logo: <Zap className="w-6 h-6 text-primary-600" />,
        title: 'Storybook',
        navigation: [
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Storybook', href: '/storybook' },
        ],
      }}
    >
      <div className="max-w-4xl mx-auto">
        <section className="text-center mb-12">
          <div className="mb-6">
            <Book className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          </div>
          
          <Typography variant="h1" weight="bold" className="mb-6">
            Component Documentation
          </Typography>
          
          <Typography variant="body" color="muted" className="max-w-2xl mx-auto mb-8 text-lg">
            Explore our comprehensive component library with interactive examples, 
            accessibility testing, and responsive design previews.
          </Typography>

          <Button 
            size="lg" 
            leftIcon={<ExternalLink />}
            onClick={() => window.open('http://localhost:6006', '_blank')}
          >
            Open Storybook
          </Button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card variant="elevated" padding="lg">
            <Typography variant="h4" weight="semibold" className="mb-4">
              Interactive Components
            </Typography>
            <Typography variant="body" color="muted" className="mb-4">
              Test all component variants, states, and props with live controls. 
              See how components respond to different configurations in real-time.
            </Typography>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Live prop editing</li>
              <li>• Multiple component variants</li>
              <li>• State management examples</li>
              <li>• Event handling demos</li>
            </ul>
          </Card>

          <Card variant="elevated" padding="lg">
            <Typography variant="h4" weight="semibold" className="mb-4">
              Accessibility Testing
            </Typography>
            <Typography variant="body" color="muted" className="mb-4">
              Built-in accessibility checks ensure WCAG 2.1 AA compliance. 
              Test keyboard navigation, screen reader compatibility, and color contrast.
            </Typography>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• WCAG compliance checks</li>
              <li>• Keyboard navigation testing</li>
              <li>• Color contrast validation</li>
              <li>• Screen reader simulation</li>
            </ul>
          </Card>

          <Card variant="elevated" padding="lg">
            <Typography variant="h4" weight="semibold" className="mb-4">
              Responsive Design
            </Typography>
            <Typography variant="body" color="muted" className="mb-4">
              Preview components across different viewport sizes. Test mobile, 
              tablet, and desktop layouts with the viewport addon.
            </Typography>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Mobile-first design</li>
              <li>• Tablet optimization</li>
              <li>• Desktop layouts</li>
              <li>• Custom viewport testing</li>
            </ul>
          </Card>

          <Card variant="elevated" padding="lg">
            <Typography variant="h4" weight="semibold" className="mb-4">
              Design System
            </Typography>
            <Typography variant="body" color="muted" className="mb-4">
              Explore design tokens, color palettes, typography scales, 
              and spacing systems that power the component library.
            </Typography>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Color system documentation</li>
              <li>• Typography guidelines</li>
              <li>• Spacing and layout tokens</li>
              <li>• Component composition patterns</li>
            </ul>
          </Card>
        </section>

        <section className="text-center">
          <Card variant="outlined" padding="lg">
            <Typography variant="h5" weight="semibold" className="mb-4">
              Getting Started
            </Typography>
            <Typography variant="body" color="muted" className="mb-6">
              To run Storybook locally, use the following command in your terminal:
            </Typography>
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md p-4 mb-6">
              <code className="text-sm font-mono">yarn storybook</code>
            </div>
            <Typography variant="caption" color="muted">
              Storybook will be available at http://localhost:6006
            </Typography>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
}