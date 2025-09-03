'use client';

import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Input/Input';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Badge } from '@/components/atoms/Badge/Badge';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { ProgressBar } from '@/components/atoms/ProgressBar/ProgressBar';
import { Skeleton, SkeletonText, SkeletonAvatar } from '@/components/atoms/Skeleton/Skeleton';
import { Card } from '@/components/molecules/Card/Card';
import { FormField } from '@/components/molecules/FormField/FormField';
import { SearchInput } from '@/components/molecules/SearchInput/SearchInput';
import { Dropdown } from '@/components/molecules/Dropdown/Dropdown';
import { Sidebar } from '@/components/organisms/Sidebar/Sidebar';
import { PageLayout } from '@/components/templates/PageLayout/PageLayout';
import { useState } from 'react';
import {
  Palette,
  Code,
  Accessibility,
  Layers,
  Zap,
  Github,
  Star,
  CheckCircle,
  AlertTriangle,
  Home,
  Users,
  BarChart3,
  Settings,
  FileText,
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/molecules/Accordion/Accordion';

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    // Simulate search
    const mockResults = [`Component: ${query}`, `Documentation: ${query}`, `Example: ${query}`];
    setSearchResults(mockResults);
    setSearchQuery(query);
  };

  const sidebarItems = [
    {
      id: 'atoms',
      label: 'Atoms',
      href: '/components/atoms',
      icon: <Layers />,
      children: [
        { id: 'button', label: 'Button', href: '/components/atoms/button' },
        { id: 'input', label: 'Input', href: '/components/atoms/input' },
        { id: 'typography', label: 'Typography', href: '/components/atoms/typography' },
        { id: 'badge', label: 'Badge', href: '/components/atoms/badge' },
      ],
    },
    {
      id: 'molecules',
      label: 'Molecules',
      href: '/components/molecules',
      icon: <Code />,
      children: [
        { id: 'card', label: 'Card', href: '/components/molecules/card' },
        { id: 'form-field', label: 'Form Field', href: '/components/molecules/form-field' },
        { id: 'search-input', label: 'Search Input', href: '/components/molecules/search-input' },
      ],
    },
    {
      id: 'organisms',
      label: 'Organisms',
      href: '/components/organisms',
      icon: <Users />,
      children: [
        { id: 'header', label: 'Header', href: '/components/organisms/header' },
        { id: 'sidebar', label: 'Sidebar', href: '/components/organisms/sidebar' },
      ],
    },
  ];

  return (
    <PageLayout
      header={{
        logo: <Zap className="w-6 h-6 text-primary-600" />,
        title: 'UI Components',
        navigation: [
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Storybook', href: '/storybook' },
        ],
      }}
      maxWidth="full"
    >
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <Sidebar
          items={sidebarItems}
          currentPath="/components/atoms/button"
          className="sticky top-0 h-[calc(100vh-4rem)]"
          disableItemLinks
        />

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Search Section */}
          <section className="mb-8">
            <Typography variant="h2" weight="semibold" className="mb-4">
              Component Library
            </Typography>

            <div className="max-w-md">
              <SearchInput
                placeholder="Search components..."
                onSearch={handleSearch}
                onClear={() => {
                  setSearchResults([]);
                  setSearchQuery('');
                }}
              />
            </div>

            {searchResults.length > 0 && (
              <Card className="mt-4 max-w-md">
                <Typography variant="h6" weight="medium" className="mb-2">
                  Search Results for &quot;{searchQuery}&quot;
                </Typography>
                <ul className="space-y-1">
                  {searchResults.map((result, index) => (
                    <li key={index} className="text-sm text-neutral-600 dark:text-neutral-400">
                      {result}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </section>

          {/* Atoms Section */}
          <section className="mb-12">
            <Typography variant="h3" weight="semibold" className="mb-6">
              Atoms
            </Typography>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Buttons */}
              <Card>
                <Typography variant="h5" weight="medium" className="mb-4">
                  Buttons
                </Typography>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary" size="sm">
                      Primary
                    </Button>
                    <Button variant="secondary" size="sm">
                      Secondary
                    </Button>
                    <Button variant="outline" size="sm">
                      Outline
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button loading size="sm">
                      Loading
                    </Button>
                    <Button disabled size="sm">
                      Disabled
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Badges */}
              <Card>
                <Typography variant="h5" weight="medium" className="mb-4">
                  Badges
                </Typography>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success" icon={<CheckCircle />}>
                      Success
                    </Badge>
                    <Badge variant="warning" icon={<AlertTriangle />}>
                      Warning
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                  </div>
                </div>
              </Card>

              {/* Typography */}
              <Card>
                <Typography variant="h5" weight="medium" className="mb-4">
                  Typography
                </Typography>
                <div className="space-y-2">
                  <Typography variant="h6">Heading 6</Typography>
                  <Typography variant="body">Body text with normal weight</Typography>
                  <Typography variant="caption" color="muted">
                    Caption text in muted color
                  </Typography>
                  <Typography variant="overline" color="primary">
                    Overline Text
                  </Typography>
                </div>
              </Card>
            </div>
          </section>

          {/* Molecules Section */}
          <section className="mb-12">
            <Typography variant="h3" weight="semibold" className="mb-6">
              Molecules
            </Typography>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form Fields */}
              <Card>
                <Typography variant="h5" weight="medium" className="mb-4">
                  Form Fields
                </Typography>
                <div className="space-y-4">
                  <FormField
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    hint="We'll never share your email"
                  />
                  <FormField label="Password" type="password" placeholder="••••••••" required />
                  <FormField
                    label="Invalid Field"
                    defaultValue="invalid@"
                    error="Please enter a valid email address"
                  />
                </div>
              </Card>

              {/* Cards */}
              <Card variant="outlined">
                <Typography variant="h5" weight="medium" className="mb-4">
                  Card Variants
                </Typography>
                <div className="space-y-4">
                  <Card variant="elevated" padding="sm">
                    <Typography variant="caption">Elevated card with small padding</Typography>
                  </Card>
                  <Card variant="outlined" padding="md">
                    <Typography variant="caption">Outlined card with medium padding</Typography>
                  </Card>
                  <Card interactive padding="sm">
                    <Typography variant="caption">Interactive card (hover me)</Typography>
                  </Card>
                </div>
              </Card>
            </div>
          </section>

          {/* Disclosures */}
          <section className="mb-12">
            <Typography variant="h3" weight="semibold" className="mb-6">
              Accordion
            </Typography>
            <Card>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is this project?</AccordionTrigger>
                  <AccordionContent>
                    A production-ready UI starter with atomic design and theming.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I customize it?</AccordionTrigger>
                  <AccordionContent>
                    Yes, update colors, fonts, and spacing from the Theme Customization.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Components follow WCAG guidelines and support keyboard navigation.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </section>

          {/* Organisms Section */}
          <section>
            <Typography variant="h3" weight="semibold" className="mb-6">
              Organisms
            </Typography>

            <Card variant="elevated" padding="lg">
              <Typography variant="h5" weight="medium" className="mb-4">
                Navigation Components
              </Typography>
              <Typography variant="body" color="muted" className="mb-6">
                Complex components like headers and sidebars that combine multiple atoms and
                molecules to create functional UI sections. The sidebar you see on the left is an
                example of an organism component.
              </Typography>

              <div className="flex gap-4">
                <Button variant="outline" leftIcon={<Code />}>
                  View Source
                </Button>
                <Button leftIcon={<Github />}>Open in Storybook</Button>
              </div>
            </Card>
          </section>
        </main>
      </div>
    </PageLayout>
  );
}
