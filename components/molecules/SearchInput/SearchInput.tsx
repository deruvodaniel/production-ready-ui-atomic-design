'use client';

import React, { useState } from 'react';
import { Input } from '@/components/atoms/Input/Input';
import { Button } from '@/components/atoms/Button/Button';
import { Search, X } from 'lucide-react';
import styles from './SearchInput.module.css';

export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  loading?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  value: controlledValue,
  onSearch,
  onClear,
  loading = false,
  disabled = false,
  size = 'md',
  className,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const setValue = controlledValue !== undefined ? () => {} : setInternalValue;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && onSearch) {
      onSearch(value.trim());
    }
  };

  const handleClear = () => {
    setValue('');
    if (onClear) {
      onClear();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && value) {
      handleClear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container} role="search">
      <div className={styles.inputWrapper}>
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          leftIcon={<Search />}
          size={size}
          disabled={disabled}
          className={className}
          aria-label="Search input"
          autoComplete="off"
        />
        
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Clear search"
            tabIndex={0}
          >
            <X />
          </Button>
        )}
      </div>

      {value && (
        <Button
          type="submit"
          size={size}
          disabled={disabled || loading || !value.trim()}
          loading={loading}
          className={styles.searchButton}
        >
          Search
        </Button>
      )}
    </form>
  );
};