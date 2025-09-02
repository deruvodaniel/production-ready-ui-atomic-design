import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible typography component supporting various text styles, weights, and colors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption', 'overline'],
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'muted', 'primary', 'secondary', 'accent', 'success', 'warning', 'error'],
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    as: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'This is body text that provides clear, readable content for users.',
  },
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography color="default">Default text color</Typography>
      <Typography color="muted">Muted text color</Typography>
      <Typography color="primary">Primary text color</Typography>
      <Typography color="secondary">Secondary text color</Typography>
      <Typography color="accent">Accent text color</Typography>
      <Typography color="success">Success text color</Typography>
      <Typography color="warning">Warning text color</Typography>
      <Typography color="error">Error text color</Typography>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography weight="light">Light weight text</Typography>
      <Typography weight="normal">Normal weight text</Typography>
      <Typography weight="medium">Medium weight text</Typography>
      <Typography weight="semibold">Semibold weight text</Typography>
      <Typography weight="bold">Bold weight text</Typography>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Typography align="left">Left aligned text</Typography>
      <Typography align="center">Center aligned text</Typography>
      <Typography align="right">Right aligned text</Typography>
    </div>
  ),
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    color: 'muted',
    children: 'This is caption text for additional information',
  },
};

export const Overline: Story = {
  args: {
    variant: 'overline',
    color: 'muted',
    children: 'Overline Text',
  },
};