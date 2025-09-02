import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component for displaying content with optional header and footer.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated'],
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
    },
    interactive: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Typography variant="body">
        This is the default card variant with medium padding.
      </Typography>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: (
      <Typography variant="h4" weight="semibold">
        Card Title
      </Typography>
    ),
    children: (
      <Typography variant="body" color="muted">
        This card has both a header and footer. The content area automatically 
        adjusts to accommodate these sections.
      </Typography>
    ),
    footer: (
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Save</Button>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <Typography variant="body">
        This card uses the outlined variant with a visible border.
      </Typography>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <Typography variant="body">
        This card uses the elevated variant with a shadow.
      </Typography>
    ),
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    children: (
      <Typography variant="body">
        This is an interactive card that responds to hover and focus.
      </Typography>
    ),
  },
};

export const UsingSubComponents: Story = {
  render: () => (
    <Card variant="elevated" padding="none" className="w-80">
      <CardHeader className="p-6">
        <Typography variant="h5" weight="semibold">
          Product Card
        </Typography>
        <Typography variant="caption" color="muted">
          Featured item
        </Typography>
      </CardHeader>
      
      <CardContent className="px-6">
        <Typography variant="body" color="muted">
          This demonstrates the usage of card sub-components for better semantic structure.
        </Typography>
      </CardContent>
      
      <CardFooter className="p-6 bg-neutral-50 dark:bg-neutral-700/50">
        <div className="flex justify-between items-center w-full">
          <Typography variant="h6" weight="bold" color="primary">
            $99.00
          </Typography>
          <Button size="sm">Add to Cart</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};