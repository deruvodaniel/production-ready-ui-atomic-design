import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { Stepper, StepperProps, createStep, performanceReviewSteps } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Molecules/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A stepper component for multi-step workflows. Manages step state and navigation between steps.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Current active step index (0-based)',
    },
    allowNavigation: {
      control: 'boolean',
      description: 'Whether to allow clicking on completed steps for navigation',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation of the stepper',
    },
    onStepClick: {
      action: 'stepClicked',
      description: 'Callback when a step is clicked',
    },
  },
  args: {
    onStepClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicSteps = [
  createStep('step1', 'Personal Information', 'Enter your basic details'),
  createStep('step2', 'Contact Details', 'Provide contact information'),
  createStep('step3', 'Preferences', 'Set your preferences'),
  createStep('step4', 'Review', 'Review and submit'),
];

export const Default: Story = {
  args: {
    steps: basicSteps,
    currentStep: 0,
    allowNavigation: true,
    orientation: 'vertical',
  },
};

export const SecondStep: Story = {
  args: {
    steps: basicSteps,
    currentStep: 1,
    allowNavigation: true,
    orientation: 'vertical',
  },
};

export const CompletedSteps: Story = {
  args: {
    steps: basicSteps,
    currentStep: 2,
    allowNavigation: true,
    orientation: 'vertical',
  },
};

export const LastStep: Story = {
  args: {
    steps: basicSteps,
    currentStep: 3,
    allowNavigation: true,
    orientation: 'vertical',
  },
};

export const NoNavigation: Story = {
  args: {
    steps: basicSteps,
    currentStep: 1,
    allowNavigation: false,
    orientation: 'vertical',
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper with navigation disabled. Completed steps are not clickable.',
      },
    },
  },
};

export const Horizontal: Story = {
  args: {
    steps: basicSteps,
    currentStep: 1,
    allowNavigation: true,
    orientation: 'horizontal',
  },
};

export const PerformanceReview: Story = {
  args: {
    steps: performanceReviewSteps,
    currentStep: 0,
    allowNavigation: true,
    orientation: 'vertical',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Performance review stepper with predefined steps. This matches the design in the Figma mockup.',
      },
    },
  },
};

export const WithDisabledStep: Story = {
  args: {
    steps: [
      createStep('step1', 'Basic Info', 'Enter basic information'),
      createStep('step2', 'Verification', 'Verify your identity', true), // disabled
      createStep('step3', 'Completion', 'Complete the process'),
    ],
    currentStep: 0,
    allowNavigation: true,
    orientation: 'vertical',
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper with a disabled step. The second step is disabled and cannot be clicked.',
      },
    },
  },
};

// Interactive example with state management
export const Interactive: Story = {
  render: args => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleStepClick = (stepIndex: number, stepId: string) => {
      console.log(`Clicked step ${stepIndex} (${stepId})`);
      setCurrentStep(stepIndex);
    };

    return (
      <div className="space-y-6">
        <Stepper
          {...args}
          steps={performanceReviewSteps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
        <div className="p-4 bg-neutral-100 rounded-lg">
          <p className="text-sm text-neutral-600">
            Current step: {currentStep + 1} - {performanceReviewSteps[currentStep]?.title}
          </p>
          <div className="flex gap-2 mt-2">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm disabled:opacity-50"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm disabled:opacity-50"
              onClick={() =>
                setCurrentStep(Math.min(performanceReviewSteps.length - 1, currentStep + 1))
              }
              disabled={currentStep === performanceReviewSteps.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  },
  args: {
    allowNavigation: true,
    orientation: 'vertical',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive stepper with navigation controls. Click on completed steps or use the buttons to navigate.',
      },
    },
  },
};
