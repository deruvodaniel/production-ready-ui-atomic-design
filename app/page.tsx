'use client';

import React from 'react';
import { PageLayout } from '@/components/templates/PageLayout/PageLayout';
import { Card } from '@/components/molecules/Card/Card';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { ColorPicker } from '@/components/molecules/ColorPicker/ColorPicker';
import { FontSelector } from '@/components/molecules/FontSelector/FontSelector';
import { SpacingSelector } from '@/components/molecules/SpacingSelector/SpacingSelector';
import {
  Palette,
  Type,
  Layout,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Eye,
  Code,
  Layers,
  Zap,
} from 'lucide-react';
import { ThemeActions } from '@/components/organisms/ThemeActions/ThemeActions';
import Link from 'next/link';

// Component Preview Section
const ComponentPreview: React.FC = () => {
  return (
    <Card variant="elevated" padding="lg">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Eye className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <Typography variant="h6" weight="bold">
              Live Preview
            </Typography>
            <Typography variant="caption" color="muted">
              See your changes in real-time
            </Typography>
          </div>
        </div>

        <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
          {/* Buttons Preview */}
          <div className="space-y-3">
            <Typography variant="body" weight="semibold">
              Buttons
            </Typography>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm">
                Primary
              </Button>
              <Button variant="secondary" size="sm">
                Secondary
              </Button>
              <Button variant="outline" size="sm">
                Outline
              </Button>
              <Button variant="ghost" size="sm">
                Ghost
              </Button>
            </div>
          </div>

          {/* Typography Preview */}
          <div className="space-y-3">
            <Typography variant="body" weight="semibold">
              Typography
            </Typography>
            <div className="space-y-2">
              <Typography variant="h4" weight="bold">
                Heading Large
              </Typography>
              <Typography variant="h6" weight="bold">
                Heading Small
              </Typography>
              <Typography variant="body">Body text with regular weight</Typography>
              <Typography variant="caption" color="muted">
                Caption text in muted color
              </Typography>
            </div>
          </div>

          {/* Badges Preview */}
          <div className="space-y-3">
            <Typography variant="body" weight="semibold">
              Badges
            </Typography>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="secondary">Secondary</Badge>
            </div>
          </div>

          {/* Card Preview */}
          <div className="space-y-3">
            <Typography variant="body" weight="semibold">
              Cards
            </Typography>
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <Avatar src="/api/placeholder/40/40" fallback="UI" size="md" />
                <div className="flex-1">
                  <Typography variant="body" weight="semibold" className="mb-1">
                    Card Component
                  </Typography>
                  <Typography variant="caption" color="muted">
                    This is a sample card showing how your theme affects different components.
                  </Typography>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function ThemeBuilderHome() {
  return (
    <PageLayout
      header={{
        logo: (
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Layers className="w-6 h-6 text-white" />
          </div>
        ),
        title: 'UI Theme Builder',
        navigation: [
          { label: 'Theme Builder', href: '/', active: true },
          { label: 'Components', href: '/components' },
          { label: 'Storybook', href: '/storybook' },
          { label: 'Sony POC', href: '/admin' },
        ],
        rightContent: (
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <Zap className="w-4 h-4 mr-2" />
                Admin Demo
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <Code className="w-4 h-4 mr-2" />
              View Code
            </Button>
          </div>
        ),
        showThemeToggle: true,
        showSettingsButton: false,
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <Typography variant="h1" weight="bold" className="text-gray-900 mb-4">
                Production-Ready Design System
              </Typography>
              <Typography variant="h6" className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Build and customize your theme with real-time preview. Export your configuration and
                deploy a production-ready design system.
              </Typography>
              <div className="flex items-center justify-center gap-4">
                <Badge variant="success" size="lg">
                  <Layers className="w-4 h-4 mr-1" />
                  Atomic Design
                </Badge>
                <Badge variant="primary" size="lg">
                  <Zap className="w-4 h-4 mr-1" />
                  Live Preview
                </Badge>
                <Badge variant="secondary" size="lg">
                  <Code className="w-4 h-4 mr-1" />
                  TypeScript
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Theme Controls */}
            <div className="lg:col-span-2 space-y-8">
              <section>
                <div className="mb-6">
                  <Typography variant="h4" weight="bold" className="mb-2">
                    Theme Customization
                  </Typography>
                  <Typography variant="body" className="text-gray-600">
                    Customize your brand colors, typography, and spacing to match your design.
                  </Typography>
                </div>

                <div className="space-y-6">
                  {/* Colors */}
                  <ColorPicker />

                  {/* Typography */}
                  <FontSelector />

                  {/* Spacing */}
                  <SpacingSelector />
                </div>
              </section>
            </div>

            {/* Right Column - Preview and Actions */}
            <div className="space-y-8">
              {/* Live Preview */}
              <ComponentPreview />

              {/* Theme Actions */}
              <ThemeActions />

              {/* Quick Links */}
              <Card variant="elevated" padding="lg">
                <div className="space-y-4">
                  <Typography variant="h6" weight="bold">
                    Quick Links
                  </Typography>
                  <div className="space-y-2">
                    <Link href="/components" className="block">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Layers className="w-4 h-4 mr-2" />
                        View All Components
                      </Button>
                    </Link>
                    <Link href="/storybook" className="block">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Eye className="w-4 h-4 mr-2" />
                        Open Storybook
                      </Button>
                    </Link>
                    <Link href="/admin" className="block">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Zap className="w-4 h-4 mr-2" />
                        Admin Demo
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </PageLayout>
  );
}
