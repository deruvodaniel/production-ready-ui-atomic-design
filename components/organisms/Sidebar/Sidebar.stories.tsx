import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Sidebar } from './Sidebar';
import { Home, Users, Settings, BarChart3, FileText, ShoppingCart, CreditCard } from 'lucide-react';

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A navigation sidebar with support for nested items, badges, and collapsible state.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    collapsed: {
      control: { type: 'boolean' },
    },
    currentPath: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: <Home />,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: <BarChart3 />,
    badge: { text: 'New', variant: 'primary' as const },
  },
  {
    id: 'users',
    label: 'User Management',
    href: '/users',
    icon: <Users />,
    children: [
      { id: 'all-users', label: 'All Users', href: '/users' },
      { id: 'user-roles', label: 'Roles & Permissions', href: '/users/roles' },
      { id: 'user-activity', label: 'Activity Log', href: '/users/activity' },
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    href: '/ecommerce',
    icon: <ShoppingCart />,
    children: [
      { id: 'products', label: 'Products', href: '/ecommerce/products' },
      { id: 'orders', label: 'Orders', href: '/ecommerce/orders' },
      { id: 'payments', label: 'Payments', href: '/ecommerce/payments' },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    href: '/content',
    icon: <FileText />,
    badge: { text: '12', variant: 'warning' as const },
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: <Settings />,
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    currentPath: '/dashboard',
  },
};

export const Collapsed: Story = {
  args: {
    items: sampleItems,
    currentPath: '/analytics',
    collapsed: true,
  },
};

export const WithActiveSubmenu: Story = {
  args: {
    items: sampleItems,
    currentPath: '/users/roles',
  },
};

export const FullExample: Story = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [currentPath, setCurrentPath] = React.useState('/analytics');

    return (
      <div className="flex h-96">
        <Sidebar items={sampleItems} currentPath={currentPath} collapsed={collapsed} />
        <main className="flex-1 p-6 bg-neutral-50 dark:bg-neutral-900">
          <div className="mb-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="mb-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              {collapsed ? 'Expand' : 'Collapse'} Sidebar
            </button>
          </div>

          <h1 className="text-2xl font-bold mb-4">Current Page: {currentPath}</h1>

          <div className="space-y-2">
            <p>Click sidebar items to navigate.</p>
            <p>Try collapsing the sidebar to see icon-only mode.</p>
          </div>
        </main>
      </div>
    );
  },
};
