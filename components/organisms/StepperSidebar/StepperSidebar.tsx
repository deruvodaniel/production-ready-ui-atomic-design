'use client';

import React from 'react';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Stepper, StepData } from '@/components/molecules/Stepper/Stepper';
import { cn } from '@/lib/utils';

export interface UserInfo {
  /** User's name */
  name: string;
  /** User's role/title */
  title: string;
  /** User's avatar URL */
  avatar?: string;
  /** User's initials for fallback */
  initials?: string;
}

export interface StepperSidebarProps {
  /** User information to display */
  user: UserInfo;
  /** Steps for the stepper */
  steps: StepData[];
  /** Current active step index */
  currentStep: number;
  /** Callback when a step is clicked */
  onStepClick?: (stepIndex: number, stepId: string) => void;
  /** Whether to allow navigation between steps */
  allowNavigation?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const StepperSidebar: React.FC<StepperSidebarProps> = ({
  user,
  steps,
  currentStep,
  onStepClick,
  allowNavigation = true,
  className,
}) => {
  const sidebarClasses = cn(
    'stepper-sidebar',
    'flex flex-col p-8 bg-neutral-100 rounded-3xl',
    'min-h-[600px] w-80',
    className
  );

  return (
    <div className={sidebarClasses}>
      {/* User Info Section */}
      <div className="flex flex-col items-center text-center mb-10">
        <Avatar
          src={user.avatar}
          fallback={
            user.initials ||
            user.name
              .split(' ')
              .map(n => n[0])
              .join('')
          }
          size="2xl"
          className="mb-6"
        />

        <div className="space-y-1">
          <Typography variant="h4" weight="bold" className="text-neutral-900">
            {user.name}
          </Typography>
          <Typography variant="body" color="muted" className="text-neutral-700">
            {user.title}
          </Typography>
        </div>
      </div>

      {/* Stepper Section */}
      <div className="flex-1">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={onStepClick}
          allowNavigation={allowNavigation}
          orientation="vertical"
        />
      </div>
    </div>
  );
};

// Helper function to create user info easily
export const createUserInfo = (
  name: string,
  title: string,
  avatar?: string,
  initials?: string
): UserInfo => ({
  name,
  title,
  avatar,
  initials,
});
