'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Typography } from '@/components/atoms/Typography/Typography';
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from 'lucide-react';
import styles from './Dropdown.module.css';

export interface DropdownItem {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  items: DropdownItem[];
  value?: string;
  placeholder?: React.ReactNode;
  onSelect?: (item: DropdownItem) => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  value,
  placeholder = 'Select an option',
  onSelect,
  disabled = false,
  className,
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(
    items.find(item => item.value === value) || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (item: DropdownItem) => {
    if (!item.disabled) {
      setSelectedItem(item);
      setIsOpen(false);
      onSelect?.(item);
      buttonRef.current?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, item?: DropdownItem) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (item) {
        handleSelect(item);
      } else {
        handleToggle();
      }
    }
  };

  return (
    <div ref={dropdownRef} className={cn(styles.dropdown, className)}>
      <Button
        ref={buttonRef}
        variant="outline"
        size={size}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(styles.trigger, isOpen && styles.triggerOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={selectedItem ? selectedItem.label : (typeof placeholder === 'string' ? placeholder : 'Select an option')}
      >
        <span className={styles.triggerContent}>
          {selectedItem?.icon && <span className={styles.triggerIcon}>{selectedItem.icon}</span>}
          <span className={styles.triggerText}>
            {selectedItem ? selectedItem.label : placeholder}
          </span>
        </span>
        <ChevronDown className={cn(styles.chevron, isOpen && styles.chevronOpen)} />
      </Button>

      {isOpen && (
        <div className={styles.menu} role="listbox">
          {items.map(item => (
            <div
              key={item.id}
              role="option"
              aria-selected={selectedItem?.id === item.id}
              className={cn(
                styles.menuItem,
                selectedItem?.id === item.id && styles.menuItemSelected,
                item.disabled && styles.menuItemDisabled
              )}
              onClick={() => handleSelect(item)}
              onKeyDown={e => handleKeyDown(e, item)}
              tabIndex={item.disabled ? -1 : 0}
            >
              <div className={styles.menuItemContent}>
                {item.icon && <span className={styles.menuItemIcon}>{item.icon}</span>}
                <Typography variant="caption" className={styles.menuItemText}>
                  {item.label}
                </Typography>
              </div>
              {selectedItem?.id === item.id && <Check className={styles.checkIcon} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
