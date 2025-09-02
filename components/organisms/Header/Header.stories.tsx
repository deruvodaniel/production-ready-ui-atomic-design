import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { Zap } from 'lucide-react';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A responsive header component with navigation, theme toggle, and customizable branding.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'UI Starter',
  },
};

export const WithLogo: Story = {
  args: {
    logo: <Zap className="w-6 h-6 text-primary-600" />,
    title: 'My App',
  },
};

export const WithNavigation: Story = {
  args: {
    title: 'Enterprise App',
    navigation: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Products', href: '/products' },
      { label: 'Analytics', href: '/analytics' },
      { label: 'Settings', href: '/settings' },
    ],
  },
};

export const FullExample: Story = {
  args: {
    logo: <Zap className="w-6 h-6 text-primary-600" />,
    title: 'Production App',
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
    ],
    showThemeToggle: true,
    showSettingsButton: true,
  },
};