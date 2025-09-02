'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import styles from './ProgressBar.module.css';

const progressVariants = cva(styles.progress, {
  variants: {
    variant: {
      default: styles.default,
      success: styles.success,
      warning: styles.warning,
      error: styles.error,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showLabel = false,
  label,
  animated = false,
  variant,
  size,
  className,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={styles.container} {...props}>
      {(showLabel || label) && (
        <div className={styles.labelContainer}>
          {label && (
            <span className={styles.label}>{label}</span>
          )}
          {showLabel && (
            <span className={styles.percentage}>{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      
      <div
        className={cn(progressVariants({ variant, size, className }))}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `Progress: ${Math.round(percentage)}%`}
      >
        <div
          className={cn(styles.fill, animated && styles.animated)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};