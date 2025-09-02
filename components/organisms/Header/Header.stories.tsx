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
        component: 'A responsive header component with navigation pills, Sony Assistant, notifications, and customizable branding following the Figma design specifications.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default logo component matching the Figma design
const DefaultLogo = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30.0005" width="42.4264" height="42.4264" rx="4" transform="rotate(45 30.0005 0)" fill="#9498B8"/>
    <path opacity="0.8" d="M30.0269 30.052L40.6335 40.6586L30.0269 51.2652V30.052Z" fill="url(#paint0_linear_2023_23862)"/>
    <path opacity="0.8" d="M30.0269 8.83887L19.4203 19.4455L30.0269 30.0521V8.83887Z" fill="url(#paint1_linear_2023_23862)"/>
    <defs>
      <linearGradient id="paint0_linear_2023_23862" x1="30.053" y1="40.6586" x2="40.6596" y2="40.6586" gradientUnits="userSpaceOnUse">
        <stop stopOpacity="0"/>
        <stop offset="1"/>
      </linearGradient>
      <linearGradient id="paint1_linear_2023_23862" x1="19.4464" y1="19.4455" x2="30.053" y2="19.4455" gradientUnits="userSpaceOnUse">
        <stop/>
        <stop offset="1" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

export const Default: Story = {
  args: {
    logo: <DefaultLogo />,
    navigation: [
      { label: 'Home', href: '/admin/feedback', active: true },
      { label: 'My Team', href: '/admin/team' },
      { label: 'Game Changers', href: '/admin/game-changers' },
    ],
    showSonyAssistant: true,
    showNotifications: true,
    notificationCount: 0,
    user: {
      name: 'Alex Ruiz',
      email: 'alex.ruiz@company.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
  },
};

export const WithNotifications: Story = {
  args: {
    logo: <DefaultLogo />,
    navigation: [
      { label: 'Home', href: '/admin/feedback' },
      { label: 'My Team', href: '/admin/team', active: true },
      { label: 'Game Changers', href: '/admin/game-changers' },
    ],
    showSonyAssistant: true,
    showNotifications: true,
    notificationCount: 3,
    user: {
      name: 'Rachel Green',
      email: 'rachel.green@company.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
  },
};

export const GameChangersActive: Story = {
  args: {
    logo: <DefaultLogo />,
    navigation: [
      { label: 'Home', href: '/admin/feedback' },
      { label: 'My Team', href: '/admin/team' },
      { label: 'Game Changers', href: '/admin/game-changers', active: true },
    ],
    showSonyAssistant: true,
    showNotifications: true,
    notificationCount: 0,
    user: {
      name: 'Julia Harvey',
      email: 'julia.harvey@company.com',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face',
    },
  },
};

export const MobileView: Story = {
  args: {
    logo: <DefaultLogo />,
    navigation: [
      { label: 'Home', href: '/admin/feedback', active: true },
      { label: 'My Team', href: '/admin/team' },
      { label: 'Game Changers', href: '/admin/game-changers' },
    ],
    showSonyAssistant: true,
    showNotifications: true,
    notificationCount: 5,
    user: {
      name: 'Alex Ruiz',
      email: 'alex.ruiz@company.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const WithoutSonyAssistant: Story = {
  args: {
    logo: <DefaultLogo />,
    navigation: [
      { label: 'Home', href: '/admin/feedback' },
      { label: 'My Team', href: '/admin/team', active: true },
      { label: 'Game Changers', href: '/admin/game-changers' },
    ],
    showSonyAssistant: false,
    showNotifications: true,
    notificationCount: 0,
    user: {
      name: 'Tom Hardy',
      email: 'tom.hardy@company.com',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&crop=face',
    },
  },
};

export const MinimalHeader: Story = {
  args: {
    logo: <DefaultLogo />,
    navigation: [],
    showSonyAssistant: false,
    showNotifications: false,
    user: {
      name: 'Simple User',
      email: 'user@company.com',
      avatar: '',
    },
  },
};

export const HighNotificationCount: Story = {
  args: {
    logo: <DefaultLogo />,
    navigation: [
      { label: 'Home', href: '/admin/feedback', active: true },
      { label: 'My Team', href: '/admin/team' },
      { label: 'Game Changers', href: '/admin/game-changers' },
    ],
    showSonyAssistant: true,
    showNotifications: true,
    notificationCount: 99,
    user: {
      name: 'Busy Manager',
      email: 'manager@company.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
  },
};
