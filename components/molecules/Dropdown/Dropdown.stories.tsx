import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { User, Settings, LogOut, Home, BarChart3, FileText } from 'lucide-react';

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown component with keyboard navigation and accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { id: '1', label: 'Option 1', value: 'option1' },
  { id: '2', label: 'Option 2', value: 'option2' },
  { id: '3', label: 'Option 3', value: 'option3' },
  { id: '4', label: 'Disabled Option', value: 'disabled', disabled: true },
];

const iconItems = [
  { id: '1', label: 'Dashboard', value: 'dashboard', icon: <Home className="w-4 h-4" /> },
  { id: '2', label: 'Analytics', value: 'analytics', icon: <BarChart3 className="w-4 h-4" /> },
  { id: '3', label: 'Documents', value: 'documents', icon: <FileText className="w-4 h-4" /> },
  { id: '4', label: 'Settings', value: 'settings', icon: <Settings className="w-4 h-4" /> },
];

const userMenuItems = [
  { id: '1', label: 'Profile', value: 'profile', icon: <User className="w-4 h-4" /> },
  { id: '2', label: 'Settings', value: 'settings', icon: <Settings className="w-4 h-4" /> },
  { id: '3', label: 'Sign out', value: 'logout', icon: <LogOut className="w-4 h-4" /> },
];

export const Default: Story = {
  args: {
    items: basicItems,
    placeholder: 'Select an option',
  },
};

export const WithIcons: Story = {
  args: {
    items: iconItems,
    placeholder: 'Navigate to...',
  },
};

export const UserMenu: Story = {
  args: {
    items: userMenuItems,
    placeholder: 'Account',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Dropdown items={basicItems} placeholder="Small" size="sm" />
      <Dropdown items={basicItems} placeholder="Medium" size="md" />
      <Dropdown items={basicItems} placeholder="Large" size="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    items: basicItems,
    placeholder: 'Disabled dropdown',
    disabled: true,
  },
};

export const WithSelection: Story = {
  args: {
    items: iconItems,
    value: 'dashboard',
    placeholder: 'Select page',
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = React.useState<string>('');
    
    return (
      <div className="space-y-4 w-64">
        <Dropdown
          items={iconItems}
          value={selectedValue}
          placeholder="Choose a page"
          onSelect={(item) => setSelectedValue(item.value)}
        />
        {selectedValue && (
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-md">
            <p className="text-sm">Selected: {selectedValue}</p>
          </div>
        )}
      </div>
    );
  },
};