import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  args: { label: 'Accept terms' },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: {} };
export const WithDescription: Story = { args: { description: 'You can unsubscribe at any time.' } };
