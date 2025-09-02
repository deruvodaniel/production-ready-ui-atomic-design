'use client';

import React from 'react';
import { Input, InputProps } from '@/components/atoms/Input/Input';
import { Typography } from '@/components/atoms/Typography/Typography';
import styles from './FormField.module.css';

export interface FormFieldProps extends Omit<InputProps, 'label' | 'helperText' | 'errorMessage'> {
  label: string;
  description?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  description,
  error,
  hint,
  required,
  className,
  ...inputProps
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <label htmlFor={inputProps.id} className="block text-sm font-medium text-neutral-700 mb-1 dark:text-neutral-300">
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        
        {description && (
          <Typography variant="caption" color="muted">
            {description}
          </Typography>
        )}
      </div>

      <Input
        {...inputProps}
        required={required}
        errorMessage={error}
        helperText={hint}
        className={className}
      />
    </div>
  );
};