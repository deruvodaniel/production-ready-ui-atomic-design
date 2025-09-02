import type { Meta, StoryObj } from '@storybook/react';
import { ResponsiveTable } from './ResponsiveTable';

interface Row {
  id: number;
  name: string;
  email: string;
  role: string;
}

const meta: Meta = {
  title: 'Molecules/ResponsiveTable',
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof meta>;

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
] as const;

const data: Row[] = [
  { id: 1, name: 'Jane Doe', email: 'jane@example.com', role: 'Admin' },
  { id: 2, name: 'John Smith', email: 'john@example.com', role: 'Editor' },
];

export const Basic: Story = {
  render: () => (
    <div className="w-[720px]">
      <ResponsiveTable<Row> columns={columns as any} data={data} caption="Users" />
    </div>
  ),
};
