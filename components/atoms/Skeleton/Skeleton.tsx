'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import styles from './Skeleton.module.css';

const skeletonVariants = cva(styles.skeleton, {
  variants: {
    variant: {
      default: styles.default,
      circular: styles.circular,
      rectangular: styles.rectangular,
    },
    animation: {
      pulse: styles.pulse,
      wave: styles.wave,
      none: styles.none,
    },
  },
  defaultVariants: {
    variant: 'default',
    animation: 'pulse',
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant,
  animation,
  className,
  style,
  ...props
}) => {
  const skeletonStyle = {
    width,
    height,
    ...style,
  };

  return (
    <div
      className={cn(skeletonVariants({ variant, animation, className }))}
      style={skeletonStyle}
      aria-hidden="true"
      {...props}
    />
  );
};

// Preset skeleton components
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 1,
  className,
}) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        height="1rem"
        width={index === lines - 1 ? '75%' : '100%'}
      />
    ))}
  </div>
);

export const SkeletonAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className,
}) => {
  const sizeMap = {
    sm: '2rem',
    md: '2.5rem',
    lg: '3rem',
  };

  return (
    <Skeleton
      variant="circular"
      width={sizeMap[size]}
      height={sizeMap[size]}
      className={className}
    />
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 space-y-4', className)}>
    <div className="flex items-center space-x-4">
      <SkeletonAvatar />
      <div className="space-y-2 flex-1">
        <Skeleton height="1rem" width="40%" />
        <Skeleton height="0.875rem" width="60%" />
      </div>
    </div>
    <SkeletonText lines={3} />
    <div className="flex space-x-2">
      <Skeleton height="2rem" width="5rem" />
      <Skeleton height="2rem" width="5rem" />
    </div>
  </div>
);