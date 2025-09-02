'use client';

import React from 'react';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Badge } from '@/components/atoms/Badge/Badge';
import { cn } from '@/lib/utils';

export interface Source {
  /** Unique identifier */
  id: string;
  /** Source name */
  name: string;
  /** Source type for styling */
  type?: 'goals' | 'feedback' | 'notes' | 'default';
  /** Whether the source is active/available */
  active?: boolean;
  /** Optional URL for source link */
  url?: string;
}

export interface SourcesListProps {
  /** Array of sources */
  sources: Source[];
  /** Title for the sources section */
  title?: string;
  /** Show count of sources */
  showCount?: boolean;
  /** Callback when a source is clicked */
  onSourceClick?: (source: Source) => void;
  /** Additional CSS classes */
  className?: string;
}

export const SourcesList: React.FC<SourcesListProps> = ({
  sources,
  title = 'Sources',
  showCount = true,
  onSourceClick,
  className,
}) => {
  const containerClasses = cn(
    'sources-list',
    'p-4 rounded-xl bg-blue-50 border border-blue-100',
    className
  );

  const getSourceVariant = (type: string = 'default') => {
    switch (type) {
      case 'goals':
        return 'primary';
      case 'feedback':
        return 'success';
      case 'notes':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const handleSourceClick = (source: Source) => {
    if (onSourceClick && source.active !== false) {
      onSourceClick(source);
    }
  };

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="mb-4">
        <Typography
          variant="caption"
          className="uppercase tracking-wide font-bold text-neutral-700"
        >
          {showCount && sources.length > 0 
            ? `${sources.length} ${title}` 
            : title
          }
        </Typography>
      </div>

      {/* Sources */}
      <div className="space-y-2">
        {sources.length === 0 ? (
          <Typography variant="body" color="muted" className="text-sm">
            No sources available
          </Typography>
        ) : (
          sources.filter(source => source && source.id).map((source) => {
            const isClickable = onSourceClick && source.active !== false;
            
            return (
              <div
                key={source.id}
                className={cn(
                  'flex items-center gap-2',
                  {
                    'cursor-pointer hover:bg-blue-100 rounded-lg p-2 -m-2 transition-colors': isClickable,
                    'opacity-50': source.active === false,
                  }
                )}
                onClick={() => handleSourceClick(source)}
              >
                <Typography
                  variant="body"
                  className={cn(
                    'text-sm font-semibold text-blue-700',
                    {
                      'hover:text-blue-800': isClickable,
                    }
                  )}
                >
                  {source.name?.toUpperCase() || 'UNNAMED SOURCE'}
                </Typography>
                
                {source.active !== false && (
                  <Badge 
                    variant={getSourceVariant(source.type)} 
                    size="sm"
                    className="text-xs"
                  >
                    Active
                  </Badge>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// Helper function to create source data easily
export const createSource = (
  id: string,
  name: string,
  type?: Source['type'],
  active?: boolean,
  url?: string
): Source => ({
  id,
  name,
  type,
  active,
  url,
});

// Common source configurations for performance reviews
export const performanceReviewSources: Source[] = [
  createSource('goals', 'Goals', 'goals', true),
  createSource('team-feedback', 'Team Feedback', 'feedback', true),
  createSource('manager-notes', 'Manager Notes', 'notes', true),
];
