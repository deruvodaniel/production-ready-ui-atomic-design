'use client';

import React from 'react';
import { Typography } from '@/components/atoms/Typography/Typography';
import { cn } from '@/lib/utils';

export interface StepProps {
  /** Step number */
  number: number;
  /** Step title */
  title: string;
  /** Current step state */
  status: 'completed' | 'current' | 'upcoming';
  /** Whether to show connector line below */
  showConnector?: boolean;
  /** Optional description */
  description?: string;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export const Step: React.FC<StepProps> = ({
  number,
  title,
  status,
  showConnector = true,
  description,
  onClick,
  className,
}) => {
  const isInteractive = onClick && status !== 'upcoming';

  const stepCircleClasses = cn(
    'w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors',
    {
      'bg-neutral-900 border-neutral-900 text-white': status === 'current',
      'bg-neutral-200 border-neutral-400 text-neutral-600': status === 'upcoming',
      'bg-green-500 border-green-500 text-white': status === 'completed',
    }
  );

  const connectorClasses = cn('w-0.5 h-18 ml-5 transition-colors', {
    'bg-neutral-900': status === 'current' || status === 'completed',
    'bg-neutral-200': status === 'upcoming',
  });

  const contentClasses = cn('flex-1 transition-colors', {
    'cursor-pointer hover:bg-neutral-50 rounded-lg p-2 -m-2': isInteractive,
  });

  const titleClasses = cn('font-semibold transition-colors', {
    'text-neutral-900': status === 'current',
    'text-neutral-600': status === 'upcoming',
    'text-neutral-800': status === 'completed',
  });

  const handleClick = () => {
    if (isInteractive) {
      onClick?.();
    }
  };

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-start gap-4" onClick={handleClick}>
        {/* Step Circle */}
        <div className={stepCircleClasses}>
          {status === 'completed' ? (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <Typography
              variant="body"
              weight="bold"
              className={cn('text-sm', {
                'text-white': status === 'current',
                'text-neutral-600': status === 'upcoming',
              })}
            >
              {number}
            </Typography>
          )}
        </div>

        {/* Step Content */}
        <div className={contentClasses}>
          <Typography variant="body" className={titleClasses} style={{ lineHeight: '1.5' }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="caption" color="muted" className="mt-1 block">
              {description}
            </Typography>
          )}
        </div>
      </div>

      {/* Connector */}
      {showConnector && <div className={connectorClasses} />}
    </div>
  );
};
