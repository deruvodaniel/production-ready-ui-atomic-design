import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A progress bar component for showing completion status with various styles and animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    animated: {
      control: { type: 'boolean' },
    },
    showLabel: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 65,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
    label: 'Upload Progress',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ProgressBar value={60} variant="default" label="Default" />
      <ProgressBar value={85} variant="success" label="Success" />
      <ProgressBar value={45} variant="warning" label="Warning" />
      <ProgressBar value={25} variant="error" label="Error" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ProgressBar value={70} size="sm" label="Small" />
      <ProgressBar value={70} size="md" label="Medium" />
      <ProgressBar value={70} size="lg" label="Large" />
    </div>
  ),
};

export const Animated: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ProgressBar value={60} animated label="Animated Default" />
      <ProgressBar value={75} variant="success" animated label="Animated Success" />
      <ProgressBar value={40} variant="warning" animated label="Animated Warning" />
    </div>
  ),
};

function InteractiveProgressBarComponent() {
  const [progress, setProgress] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="w-80">
      <ProgressBar
        value={progress}
        showLabel
        label="Auto Progress"
        animated
      />
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveProgressBarComponent />,
};