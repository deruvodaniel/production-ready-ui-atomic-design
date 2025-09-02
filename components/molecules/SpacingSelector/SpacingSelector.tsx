'use client';

import React from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Card } from '@/components/molecules/Card/Card';
import { useTheme } from '@/theme/theme-provider';
import { Maximize2, Minimize2, Square } from 'lucide-react';
import styles from './SpacingSelector.module.css';

export interface SpacingSelectorProps {
  className?: string;
}

export const SpacingSelector: React.FC<SpacingSelectorProps> = ({ className }) => {
  const { config, updateTheme } = useTheme();

  const spacingOptions = [
    {
      id: 'compact',
      label: 'Compact',
      description: 'Tight spacing for dense layouts',
      icon: <Minimize2 className="w-4 h-4" />,
      multiplier: 0.75,
    },
    {
      id: 'comfortable',
      label: 'Comfortable',
      description: 'Balanced spacing (default)',
      icon: <Square className="w-4 h-4" />,
      multiplier: 1,
    },
    {
      id: 'spacious',
      label: 'Spacious',
      description: 'Generous spacing for breathing room',
      icon: <Maximize2 className="w-4 h-4" />,
      multiplier: 1.25,
    },
  ];

  const handleSpacingChange = (scale: 'compact' | 'comfortable' | 'spacious') => {
    updateTheme({
      spacing: { scale },
    });
  };

  return (
    <Card variant="elevated" padding="lg" className={className}>
      <div className={styles.header}>
        <Typography variant="h4" weight="semibold">
          Spacing Scale
        </Typography>
        <Typography variant="caption" color="muted">
          Adjust the overall spacing throughout the interface
        </Typography>
      </div>

      <div className={styles.options}>
        {spacingOptions.map((option) => (
          <Button
            key={option.id}
            variant={config.spacing.scale === option.id ? 'primary' : 'outline'}
            onClick={() => handleSpacingChange(option.id as any)}
            className={styles.option}
          >
            <div className={styles.optionContent}>
              {option.icon}
              <div className={styles.optionText}>
                <Typography variant="caption" weight="medium">
                  {option.label}
                </Typography>
                <Typography variant="caption" color="muted" className={styles.description}>
                  {option.description}
                </Typography>
              </div>
            </div>
          </Button>
        ))}
      </div>

      <div className={styles.preview}>
        <Typography variant="h6" weight="medium" className={styles.previewTitle}>
          Preview
        </Typography>
        <div className={styles.previewContent}>
          <div className={styles.previewCard}>
            <Typography variant="h6">Card Title</Typography>
            <Typography variant="body" color="muted">
              This preview shows how the current spacing affects component layouts.
            </Typography>
            <div className={styles.previewButtons}>
              <Button size="sm">Primary</Button>
              <Button variant="outline" size="sm">Secondary</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};