'use client';

import React from 'react';
import styles from './Checkbox.module.css';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ label, description, className, ...props }, ref) => {
  const id = props.id || `chk-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.controlWrapper}>
        <input ref={ref} id={id} type="checkbox" className={styles.input} {...props} />
        <span aria-hidden className={styles.box} />
      </div>
      <label htmlFor={id} className={styles.label}>{label}</label>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
});
Checkbox.displayName = 'Checkbox';
