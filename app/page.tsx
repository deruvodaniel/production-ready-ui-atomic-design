'use client';

import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Card } from '@/components/molecules/Card/Card';
import { Badge } from '@/components/atoms/Badge/Badge';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { ProgressBar } from '@/components/atoms/ProgressBar/ProgressBar';
import { PageLayout } from '@/components/templates/PageLayout/PageLayout';
import { useTheme } from '@/theme/theme-provider';
import { 
  Palette, 
  Type, 
  Zap, 
  Star,
  CheckCircle,
  AlertTriangle,
  Settings,
  Moon,
  Sun,
  Download
} from 'lucide-react';
import { FontSelector } from '@/components/molecules/FontSelector/FontSelector';

export default function Home() {
  const { isDark, toggleDarkMode, config, updateTheme } = useTheme();
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#64748b');
  const [accentColor, setAccentColor] = useState('#d946ef');

  const handleColorChange = (colorType: 'primary' | 'secondary' | 'accent', value: string) => {
    if (colorType === 'primary') setPrimaryColor(value);
    if (colorType === 'secondary') setSecondaryColor(value);
    if (colorType === 'accent') setAccentColor(value);
    
    updateTheme({
      colors: {
        ...config.colors,
        [colorType]: value,
      },
    });
  };

  const resetColors = () => {
    setPrimaryColor('#3b82f6');
    setSecondaryColor('#64748b');
    setAccentColor('#d946ef');
    updateTheme({
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        accent: '#d946ef',
      },
    });
  };

  const handleExport = () => {
    const data = {
      theme: config,
      mode: isDark ? 'dark' : 'light',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const scrollToTheme = () => {
    const el = document.getElementById('theme-customization');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageLayout
      header={{
        logo: <Zap className="w-6 h-6 text-primary-600" />,
        title: 'Design System Builder',
        navigation: [
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Storybook', href: '/storybook' },
        ],
        showThemeToggle: true,
        showSettingsButton: true,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Typography variant="h1" weight="bold" className="mb-6">
            Production-Ready Design System
          </Typography>
          
          <Typography variant="body" color="muted" className="max-w-3xl mx-auto mb-8 text-lg">
            Build beautiful, accessible applications with our comprehensive component library. 
            Customize colors, typography, and spacing to match your brand identity.
          </Typography>

          <div className="flex justify-center gap-4 mb-8">
            <Button size="lg" leftIcon={<Palette />} onClick={scrollToTheme}>
              Customize Theme
            </Button>
            <Button variant="outline" size="lg" leftIcon={<Download />} onClick={handleExport}>
              Export Config
            </Button>
          </div>

          <div className="flex justify-center items-center gap-4">
            <Badge variant="success" icon={<CheckCircle />}>
              WCAG 2.1 AA
            </Badge>
            <Badge variant="primary" icon={<Star />}>
              Production Ready
            </Badge>
            <Badge variant="warning" icon={<AlertTriangle />}>
              TypeScript
            </Badge>
          </div>
        </section>

        {/* Theme Customization */}
        <section className="mb-16" id="theme-customization">
          <Card variant="elevated" padding="lg">
            <div className="flex items-center justify-between mb-6">
              <Typography variant="h3" weight="semibold">
                Theme Customization
              </Typography>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  leftIcon={isDark ? <Sun /> : <Moon />}
                >
                  {isDark ? 'Light' : 'Dark'} Mode
                </Button>
                <Button variant="outline" size="sm" onClick={resetColors}>
                  Reset
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Primary Color */}
              <div className="space-y-4">
                <Typography variant="h6" weight="medium">
                  Primary Color
                </Typography>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="w-16 h-16 rounded-lg border-2 border-neutral-300 dark:border-neutral-600 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-mono text-neutral-600 dark:text-neutral-400">
                      {primaryColor}
                    </div>
                    <div className="text-xs text-neutral-500">
                      Used for buttons, links, and primary actions
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Color */}
              <div className="space-y-4">
                <Typography variant="h6" weight="medium">
                  Secondary Color
                </Typography>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="w-16 h-16 rounded-lg border-2 border-neutral-300 dark:border-neutral-600 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-mono text-neutral-600 dark:text-neutral-400">
                      {secondaryColor}
                    </div>
                    <div className="text-xs text-neutral-500">
                      Used for secondary buttons and elements
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent Color */}
              <div className="space-y-4">
                <Typography variant="h6" weight="medium">
                  Accent Color
                </Typography>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="w-16 h-16 rounded-lg border-2 border-neutral-300 dark:border-neutral-600 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-mono text-neutral-600 dark:text-neutral-400">
                      {accentColor}
                    </div>
                    <div className="text-xs text-neutral-500">
                      Used for highlights and special elements
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Typography Settings */}
        <section className="mb-16">
          <FontSelector />
        </section>

        {/* Component Preview */}
        <section className="mb-16">
          <Typography variant="h3" weight="semibold" className="mb-6">
            Component Preview
          </Typography>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Buttons */}
            <Card>
              <Typography variant="h5" weight="medium" className="mb-4">
                Buttons
              </Typography>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="sm">Primary</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="outline" size="sm">Outline</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button loading size="sm">Loading</Button>
                  <Button disabled size="sm">Disabled</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
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
                  <Badge variant="success" icon={<CheckCircle />}>Success</Badge>
                  <Badge variant="warning" icon={<AlertTriangle />}>Warning</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>
            </Card>

            {/* Progress */}
            <Card>
              <Typography variant="h5" weight="medium" className="mb-4">
                Progress Bars
              </Typography>
              <div className="space-y-4">
                <ProgressBar value={75} showLabel label="Upload Progress" />
                <ProgressBar value={60} variant="success" label="Success" />
                <ProgressBar value={40} variant="warning" label="Warning" />
                <ProgressBar value={25} variant="error" label="Error" />
              </div>
            </Card>

            {/* Avatars */}
            <Card>
              <Typography variant="h5" weight="medium" className="mb-4">
                Avatars
              </Typography>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar size="sm" fallback="SM" />
                  <Avatar size="md" fallback="MD" />
                  <Avatar size="lg" fallback="LG" />
                  <Avatar size="xl" fallback="XL" />
                </div>
                <div className="flex items-center gap-3">
                  <Avatar 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2"
                    alt="User"
                    fallback="U"
                  />
                  <Avatar variant="rounded" fallback="R" />
                  <Avatar variant="square" fallback="S" />
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

            {/* Status Cards */}
            <Card>
              <Typography variant="h5" weight="medium" className="mb-4">
                Status Examples
              </Typography>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Status</span>
                  <Badge variant="success">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Health</span>
                  <Badge variant="warning">Degraded</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge variant="error">Offline</Badge>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section>
          <Typography variant="h3" weight="semibold" className="mb-6">
            Features
          </Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <Typography variant="h5" weight="semibold" className="mb-2">
                  White-Label Theming
                </Typography>
                <Typography variant="body" color="muted">
                  Customize colors, fonts, and spacing to match your brand identity with real-time preview.
                </Typography>
              </div>
            </Card>

            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-400" />
                </div>
                <Typography variant="h5" weight="semibold" className="mb-2">
                  Accessibility First
                </Typography>
                <Typography variant="body" color="muted">
                  WCAG 2.1 AA compliant components with full keyboard navigation and screen reader support.
                </Typography>
              </div>
            </Card>

            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Type className="w-6 h-6 text-warning-600 dark:text-warning-400" />
                </div>
                <Typography variant="h5" weight="semibold" className="mb-2">
                  TypeScript Ready
                </Typography>
                <Typography variant="body" color="muted">
                  Fully typed components with comprehensive interfaces and strict type checking.
                </Typography>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
