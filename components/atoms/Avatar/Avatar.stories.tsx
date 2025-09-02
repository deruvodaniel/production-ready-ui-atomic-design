import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible avatar component supporting images, fallback text, and icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['circular', 'rounded', 'square'],
    },
    showFallback: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fallback: 'JD',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    alt: 'John Doe',
    fallback: 'JD',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" fallback="XS" />
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
      <Avatar size="2xl" fallback="2XL" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="circular" fallback="C" />
      <Avatar variant="rounded" fallback="R" />
      <Avatar variant="square" fallback="S" />
    </div>
  ),
};

export const WithImages: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2"
        alt="User 1"
        fallback="U1"
      />
      <Avatar
        src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2"
        alt="User 2"
        fallback="U2"
        variant="rounded"
      />
      <Avatar
        src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2"
        alt="User 3"
        fallback="U3"
        variant="square"
      />
    </div>
  ),
};

export const FallbackStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar fallback="AB" />
        <Avatar fallback="CD" />
        <Avatar fallback="EF" />
      </div>
      <div className="flex items-center gap-4">
        <Avatar showFallback={false} />
        <Avatar src="invalid-url" fallback="ER" />
        <Avatar />
      </div>
    </div>
  ),
};