'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import styles from './Typography.module.css';

const typographyVariants = cva(styles.base, {
  variants: {
    variant: {
      h1: styles.h1,
      h2: styles.h2,
      h3: styles.h3,
      h4: styles.h4,
      h5: styles.h5,
      h6: styles.h6,
      body: styles.body,
      caption: styles.caption,
      overline: styles.overline,
    },
    weight: {
      light: styles.light,
      normal: styles.normal,
      medium: styles.medium,
      semibold: styles.semibold,
      bold: styles.bold,
    },
    color: {
      default: styles.colorDefault,
      muted: styles.colorMuted,
      primary: styles.colorPrimary,
      secondary: styles.colorSecondary,
      accent: styles.colorAccent,
      success: styles.colorSuccess,
      warning: styles.colorWarning,
      error: styles.colorError,
    },
    align: {
      left: styles.alignLeft,
      center: styles.alignCenter,
      right: styles.alignRight,
    },
  },
  defaultVariants: {
    variant: 'body',
    weight: 'normal',
    color: 'default',
    align: 'left',
  },
});

export interface TypographyProps
  extends VariantProps<typeof typographyVariants> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  htmlFor?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant,
  weight,
  color,
  align,
  as,
  className,
  ...props
}) => {
  // Map variants to default HTML elements
  const defaultElements = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body: 'p',
    caption: 'span',
    overline: 'span',
  } as const;

  const Component = as || (variant ? defaultElements[variant] : 'p') || 'p';

  return (
    <Component
      className={cn(typographyVariants({ variant, weight, color, align, className }))}
      {...props}
    >
      {children}
    </Component>
  );
};