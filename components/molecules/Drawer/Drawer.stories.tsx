import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Drawer } from './Drawer';
import { Button } from '@/components/atoms/Button/Button';

const meta: Meta<typeof Drawer> = {
  title: 'Molecules/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer open={open} onOpenChange={setOpen} title="Preferences" description="User settings">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Drawer content goes here.
          </p>
        </Drawer>
      </div>
    );
  },
};
