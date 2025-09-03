import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { StepperSidebar, createUserInfo } from './StepperSidebar';
import { performanceReviewSteps, createStep } from '@/components/molecules/Stepper/Stepper';

const meta: Meta<typeof StepperSidebar> = {
  title: 'Organisms/StepperSidebar',
  component: StepperSidebar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A sidebar component combining user information with a stepper workflow. Perfect for performance reviews and multi-step processes.',
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

const rachelGreen = createUserInfo(
  'Rachel Green',
  'Director of Finances',
  '/api/placeholder/100/100',
  'RG'
);

const alexRuiz = createUserInfo(
  'Alex Ruiz',
  'Engineering Manager',
  '/api/placeholder/100/100',
  'AR'
);

export const PerformanceReview: Story = {
  args: {
    user: rachelGreen,
    steps: performanceReviewSteps,
    currentStep: 0,
    allowNavigation: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Performance review stepper sidebar matching the Figma design. Shows Rachel Green as the subject of the review.',
      },
    },
  },
};

export const MiddleStep: Story = {
  args: {
    user: rachelGreen,
    steps: performanceReviewSteps,
    currentStep: 1,
    allowNavigation: true,
  },
};

export const NearlyComplete: Story = {
  args: {
    user: rachelGreen,
    steps: performanceReviewSteps,
    currentStep: 2,
    allowNavigation: true,
  },
};

export const Completed: Story = {
  args: {
    user: rachelGreen,
    steps: performanceReviewSteps,
    currentStep: 3,
    allowNavigation: true,
  },
};

export const DifferentUser: Story = {
  args: {
    user: alexRuiz,
    steps: performanceReviewSteps,
    currentStep: 0,
    allowNavigation: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Same stepper with different user information.',
      },
    },
  },
};

export const CustomWorkflow: Story = {
  args: {
    user: createUserInfo('Sarah Johnson', 'Product Manager', '/api/placeholder/100/100'),
    steps: [
      createStep('onboarding', 'Onboarding', 'Welcome and initial setup'),
      createStep('training', 'Training', 'Complete required training modules'),
      createStep('shadowing', 'Job Shadowing', 'Shadow experienced team members'),
      createStep('independent', 'Independent Work', 'Begin independent assignments'),
      createStep('review', 'First Review', 'Initial performance review'),
    ],
    currentStep: 1,
    allowNavigation: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom workflow for employee onboarding process.',
      },
    },
  },
};

export const NoNavigation: Story = {
  args: {
    user: rachelGreen,
    steps: performanceReviewSteps,
    currentStep: 1,
    allowNavigation: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper sidebar with navigation disabled. Steps cannot be clicked.',
      },
    },
  },
};

export const Interactive: Story = {
  render: args => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleStepClick = (stepIndex: number, stepId: string) => {
      console.log(`Navigated to step ${stepIndex} (${stepId})`);
      setCurrentStep(stepIndex);
    };

    return (
      <div className="flex gap-8">
        <StepperSidebar
          {...args}
          user={rachelGreen}
          steps={performanceReviewSteps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
        <div className="flex-1 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            {performanceReviewSteps[currentStep]?.title}
          </h3>
          <p className="text-gray-600 mb-4">{performanceReviewSteps[currentStep]?.description}</p>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
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
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example with content area. Click on steps or use navigation buttons.',
      },
    },
  },
};

export const ResponsiveLayout: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="lg:hidden">
        <h3 className="text-lg font-semibold mb-4">Mobile Layout</h3>
        <StepperSidebar
          user={rachelGreen}
          steps={performanceReviewSteps}
          currentStep={1}
          allowNavigation={true}
          className="w-full"
        />
      </div>
      <div className="hidden lg:block">
        <h3 className="text-lg font-semibold mb-4">Desktop Layout</h3>
        <StepperSidebar
          user={rachelGreen}
          steps={performanceReviewSteps}
          currentStep={1}
          allowNavigation={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive layout showing how the component adapts to different screen sizes.',
      },
    },
  },
};
