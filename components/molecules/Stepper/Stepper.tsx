'use client';

import React from 'react';
import { Step } from '@/components/atoms/Step/Step';
import { cn } from '@/lib/utils';

export interface StepData {
  /** Unique identifier for the step */
  id: string;
  /** Step title */
  title: string;
  /** Optional description */
  description?: string;
  /** Whether this step is disabled */
  disabled?: boolean;
}

export interface StepperProps {
  /** Array of step data */
  steps: StepData[];
  /** Current active step index (0-based) */
  currentStep: number;
  /** Callback when a step is clicked */
  onStepClick?: (stepIndex: number, stepId: string) => void;
  /** Whether to allow clicking on completed steps */
  allowNavigation?: boolean;
  /** Custom orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Additional CSS classes */
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  allowNavigation = true,
  orientation = 'vertical',
  className,
}) => {
  const handleStepClick = (stepIndex: number) => {
    const step = steps[stepIndex];
    if (!step.disabled && onStepClick) {
      // Only allow navigation to completed steps or current step if allowNavigation is true
      if (allowNavigation && (stepIndex <= currentStep || stepIndex === currentStep)) {
        onStepClick(stepIndex, step.id);
      }
    }
  };

  const getStepStatus = (stepIndex: number): 'completed' | 'current' | 'upcoming' => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const stepperClasses = cn(
    'stepper',
    {
      'flex flex-col space-y-0': orientation === 'vertical',
      'flex flex-row items-center space-x-8': orientation === 'horizontal',
    },
    className
  );

  return (
    <div className={stepperClasses}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const status = getStepStatus(index);
        const isClickable = allowNavigation && !step.disabled && index <= currentStep;

        return (
          <Step
            key={step.id}
            number={index + 1}
            title={step.title}
            description={step.description}
            status={status}
            showConnector={!isLast && orientation === 'vertical'}
            onClick={isClickable ? () => handleStepClick(index) : undefined}
            className={cn({
              'opacity-50': step.disabled,
            })}
          />
        );
      })}
    </div>
  );
};

// Utility function to create step data easily
export const createStep = (
  id: string,
  title: string,
  description?: string,
  disabled?: boolean
): StepData => ({
  id,
  title,
  description,
  disabled,
});

// Common step configurations
export const performanceReviewSteps: StepData[] = [
  createStep(
    'ambitions',
    'Ambitions and Accomplishments',
    'Capture what was achieved, how it was done, and the impact delivered'
  ),
  createStep(
    'strengths',
    'Strengths and Opportunities',
    'Identify key strengths and areas for improvement'
  ),
  createStep('summary', 'Performance Summary', 'Overall performance evaluation and ratings'),
  createStep('review', 'Review', 'Final review and submission'),
];
