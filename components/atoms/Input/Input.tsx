'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import styles from './Input.module.css';

const inputVariants = cva(styles.input, {
  variants: {
    variant: {
      default: styles.default,
      filled: styles.filled,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
    state: {
      default: '',
      error: styles.error,
      success: styles.success,
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    state: 'default',
  },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      state,
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId();
    const inputId = id || `input-${reactId.replace(/:/g, '')}`;
    const inputState = errorMessage ? 'error' : state;

    return (
      <div className={styles.container}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}
        
        <div className={styles.inputWrapper}>
          {leftIcon && (
            <div className={styles.leftIcon} aria-hidden="true">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant, size, state: inputState, className }),
              leftIcon && styles.hasLeftIcon,
              rightIcon && styles.hasRightIcon
            )}
            aria-invalid={inputState === 'error'}
            aria-describedby={
              errorMessage
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            onInput={props.onChange}
            {...props}
          />
          
          {rightIcon && (
            <div className={styles.rightIcon} aria-hidden="true">
              {rightIcon}
            </div>
          )}
        </div>

        {errorMessage && (
          <p id={`${inputId}-error`} className={styles.errorMessage} role="alert">
            {errorMessage}
          </p>
        )}
        
        {helperText && !errorMessage && (
          <p id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
