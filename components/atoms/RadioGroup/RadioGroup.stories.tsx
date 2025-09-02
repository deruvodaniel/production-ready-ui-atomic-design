import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [value, setValue] = React.useState('monthly');
    return (
      <RadioGroup
        name="plan"
        value={value}
        onChange={setValue}
        options={[
          { label: 'Monthly', value: 'monthly', description: '$10/mo' },
          { label: 'Yearly', value: 'yearly', description: '$100/yr' },
        ]}
      />
    );
  },
};
