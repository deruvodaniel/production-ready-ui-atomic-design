import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Step } from './Step';

const meta: Meta<typeof Step> = {
  title: 'Atoms/Step',
  component: Step,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A step component for wizards and multi-step processes. Shows step number, title, status, and optional connector line.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    number: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Step number displayed in the circle',
    },
    title: {
      control: 'text',
      description: 'Title of the step',
    },
    status: {
      control: 'select',
      options: ['completed', 'current', 'upcoming'],
      description: 'Current status of the step',
    },
    showConnector: {
      control: 'boolean',
      description: 'Whether to show the connector line below the step',
    },
    description: {
      control: 'text',
      description: 'Optional description text below the title',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for interactive steps',
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Current: Story = {
  args: {
    number: 1,
    title: 'Ambitions and Accomplishments',
    status: 'current',
    showConnector: true,
  },
};

export const Completed: Story = {
  args: {
    number: 1,
    title: 'Personal Information',
    status: 'completed',
    showConnector: true,
  },
};

export const Upcoming: Story = {
  args: {
    number: 3,
    title: 'Performance Summary',
    status: 'upcoming',
    showConnector: true,
  },
};

export const WithDescription: Story = {
  args: {
    number: 2,
    title: 'Strengths and Opportunities',
    status: 'current',
    description: 'Identify key strengths and areas for improvement',
    showConnector: true,
  },
};

export const WithoutConnector: Story = {
  args: {
    number: 4,
    title: 'Review',
    status: 'upcoming',
    showConnector: false,
  },
};

export const Interactive: Story = {
  args: {
    number: 1,
    title: 'Personal Information',
    status: 'completed',
    showConnector: true,
    onClick: fn(),
  },
};

export const MultipleSteps: Story = {
  render: () => (
    <div className="space-y-0">
      <Step
        number={1}
        title="Ambitions and Accomplishments"
        status="current"
        showConnector={true}
        onClick={fn()}
      />
      <Step
        number={2}
        title="Strengths and Opportunities"
        status="upcoming"
        showConnector={true}
        onClick={fn()}
      />
      <Step
        number={3}
        title="Performance Summary"
        status="upcoming"
        showConnector={true}
        onClick={fn()}
      />
      <Step
        number={4}
        title="Review"
        status="upcoming"
        showConnector={false}
        onClick={fn()}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of multiple steps connected together to form a stepper workflow.',
      },
    },
  },
};

export const PerformanceReviewSteps: Story = {
  render: () => (
    <div className="space-y-0 bg-neutral-100 p-6 rounded-lg">
      <Step
        number={1}
        title="Ambitions and Accomplishments"
        status="current"
        description="Capture what was achieved, how it was done, and the impact delivered"
        showConnector={true}
        onClick={fn()}
      />
      <Step
        number={2}
        title="Strengths and Opportunities"
        status="upcoming"
        description="Identify key strengths and areas for improvement"
        showConnector={true}
        onClick={fn()}
      />
      <Step
        number={3}
        title="Performance Summary"
        status="upcoming"
        description="Overall performance evaluation and ratings"
        showConnector={true}
        onClick={fn()}
      />
      <Step
        number={4}
        title="Review"
        status="upcoming"
        description="Final review and submission"
        showConnector={false}
        onClick={fn()}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Performance review stepper as shown in the design system. This shows the complete workflow for performance reviews.',
      },
    },
  },
};
