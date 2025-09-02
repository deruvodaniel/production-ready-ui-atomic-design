'use client';

import React from 'react';
import styles from './RadioGroup.module.css';

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
}
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: RadioOption[];
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  options,
  ...props
}) => {
  return (
    <div role="radiogroup" {...props}>
      {options.map(opt => {
        const id = `${name}-${opt.value}`;
        return (
          <label key={opt.value} className={styles.option} htmlFor={id}>
            <input
              id={id}
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={e => onChange?.(e.target.value)}
              className={styles.input}
            />
            <span aria-hidden className={styles.dot} />
            <span className={styles.texts}>
              <span className={styles.label}>{opt.label}</span>
              {opt.description && <span className={styles.description}>{opt.description}</span>}
            </span>
          </label>
        );
      })}
    </div>
  );
};
