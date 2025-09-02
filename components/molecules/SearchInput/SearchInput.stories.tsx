import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SearchInput } from './SearchInput';
import { fn } from '@storybook/test';

const meta: Meta<typeof SearchInput> = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A search input component with clear functionality and keyboard shortcuts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    loading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: {
    onSearch: fn(),
    onClear: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search products...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Sample search',
    placeholder: 'Search...',
  },
};

export const Loading: Story = {
  args: {
    value: 'Loading search',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 'Disabled search',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <SearchInput size="sm" placeholder="Small search" />
      <SearchInput size="md" placeholder="Medium search" />
      <SearchInput size="lg" placeholder="Large search" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [results, setResults] = React.useState<string[]>([]);
    
    const handleSearch = (query: string) => {
      // Simulate search results
      const mockResults = [
        `Result 1 for "${query}"`,
        `Result 2 for "${query}"`,
        `Result 3 for "${query}"`,
      ];
      setResults(mockResults);
    };

    const handleClear = () => {
      setResults([]);
    };

    return (
      <div className="w-80 space-y-4">
        <SearchInput
          placeholder="Search for anything..."
          onSearch={handleSearch}
          onClear={handleClear}
        />
        
        {results.length > 0 && (
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md p-4">
            <h3 className="font-medium mb-2">Search Results:</h3>
            <ul className="space-y-1">
              {results.map((result, index) => (
                <li key={index} className="text-sm text-neutral-600 dark:text-neutral-400">
                  {result}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};