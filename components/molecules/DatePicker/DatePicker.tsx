'use client';

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/atoms/Button/Button';
import styles from './DatePicker.module.css';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value: valueProp,
  onChange,
  placeholder = 'Pick a date',
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Date | null>(valueProp ?? null);

  const selectDate = (date?: Date) => {
    const next = date ?? null;
    setValue(next);
    onChange?.(next);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={styles.trigger} aria-haspopup="dialog">
          {value ? value.toLocaleDateString() : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className={styles.content}>
        <Calendar mode="single" selected={value ?? undefined} onSelect={selectDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
};
