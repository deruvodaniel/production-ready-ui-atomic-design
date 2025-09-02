import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Skeleton loading components for better perceived performance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'circular', 'rectangular'],
    },
    animation: {
      control: { type: 'select' },
      options: ['pulse', 'wave', 'none'],
    },
    width: {
      control: { type: 'text' },
    },
    height: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '200px',
    height: '20px',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton variant="default" width="200px" height="20px" />
      <Skeleton variant="circular" width="40px" height="40px" />
      <Skeleton variant="rectangular" width="200px" height="100px" />
    </div>
  ),
};

export const Animations: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm mb-2">Pulse Animation</p>
        <Skeleton animation="pulse" width="200px" height="20px" />
      </div>
      <div>
        <p className="text-sm mb-2">Wave Animation</p>
        <Skeleton animation="wave" width="200px" height="20px" />
      </div>
      <div>
        <p className="text-sm mb-2">No Animation</p>
        <Skeleton animation="none" width="200px" height="20px" />
      </div>
    </div>
  ),
};

export const TextSkeleton: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <SkeletonText lines={1} />
      <SkeletonText lines={3} />
      <SkeletonText lines={5} />
    </div>
  ),
};

export const AvatarSkeleton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SkeletonAvatar size="sm" />
      <SkeletonAvatar size="md" />
      <SkeletonAvatar size="lg" />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-80">
      <SkeletonCard />
    </div>
  ),
};

export const ComplexLayout: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SkeletonAvatar />
          <div>
            <Skeleton width="120px" height="16px" className="mb-1" />
            <Skeleton width="80px" height="12px" />
          </div>
        </div>
        <Skeleton width="60px" height="32px" />
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        <Skeleton width="100%" height="200px" variant="rectangular" />
        <SkeletonText lines={3} />
      </div>
      
      {/* Actions */}
      <div className="flex gap-2">
        <Skeleton width="80px" height="36px" />
        <Skeleton width="80px" height="36px" />
        <Skeleton width="80px" height="36px" />
      </div>
    </div>
  ),
};