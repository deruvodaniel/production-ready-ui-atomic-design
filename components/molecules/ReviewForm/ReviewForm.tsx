'use client';

import React, { useState } from 'react';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import { RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ReviewSection {
  /** Unique identifier */
  id: string;
  /** Section title */
  title: string;
  /** Section content/value */
  content: string;
  /** Section placeholder */
  placeholder?: string;
}

export interface ReviewFormProps {
  /** Array of review sections */
  sections: ReviewSection[];
  /** Callback when section content changes */
  onSectionChange?: (sectionId: string, content: string) => void;
  /** Callback for action buttons */
  onAction?: (sectionId: string, action: 'tryAgain' | 'elaborate' | 'shorten') => void;
  /** Whether the form is read-only */
  readOnly?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  sections,
  onSectionChange,
  onAction,
  readOnly = false,
  className,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSectionExpansion = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleContentChange = (sectionId: string, content: string) => {
    if (!readOnly && onSectionChange) {
      onSectionChange(sectionId, content);
    }
  };

  const handleAction = (sectionId: string, action: 'tryAgain' | 'elaborate' | 'shorten') => {
    if (onAction) {
      onAction(sectionId, action);
    }
  };

  const formClasses = cn(
    'review-form space-y-8',
    className
  );

  return (
    <div className={formClasses}>
      {sections.map((section) => {
        const isExpanded = expandedSections.has(section.id);
        
        return (
          <div key={section.id} className="review-section">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h4" weight="bold" className="text-neutral-900">
                {section.title}
              </Typography>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSectionExpansion(section.id)}
                className="p-2"
              >
                {isExpanded ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Section Content */}
            <div className="space-y-4">
              {/* Text Area */}
              <div className="relative">
                <textarea
                  value={section.content}
                  onChange={(e) => handleContentChange(section.id, e.target.value)}
                  placeholder={section.placeholder}
                  readOnly={readOnly}
                  className={cn(
                    'w-full p-4 border-2 border-neutral-900 rounded-lg',
                    'bg-white text-neutral-900',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                    'resize-none transition-all duration-200',
                    {
                      'min-h-[120px]': !isExpanded,
                      'min-h-[200px]': isExpanded,
                      'bg-neutral-50 cursor-not-allowed': readOnly,
                    }
                  )}
                />
                
                {/* Resize indicator */}
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-neutral-300 opacity-50" 
                     style={{
                       clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)'
                     }}
                />
              </div>

              {/* Action Buttons */}
              {!readOnly && onAction && (
                <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction(section.id, 'tryAgain')}
                    className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction(section.id, 'elaborate')}
                    className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900"
                  >
                    <Maximize2 className="w-4 h-4" />
                    Elaborate
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction(section.id, 'shorten')}
                    className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900"
                  >
                    <Minimize2 className="w-4 h-4" />
                    Shorten
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Helper function to create review sections
export const createReviewSection = (
  id: string,
  title: string,
  content: string = '',
  placeholder?: string
): ReviewSection => ({
  id,
  title,
  content,
  placeholder,
});

// Predefined sections for performance reviews
export const performanceReviewSections: ReviewSection[] = [
  createReviewSection(
    'what',
    'What',
    'Rachel successfully delivered on her AAA goals, including leading the front-end side of the API migration 1, contributing to the shared UI library rollout 2, and onboarding two junior developers. She consistently met project deadlines and closed over 150 tickets across new features and bug fixes during the year 3.',
    'Describe what was accomplished...'
  ),
  createReviewSection(
    'how',
    'How',
    'She demonstrated strong collaboration by pairing with backend engineers during critical deadlines, mentoring juniors on React best practices, and adapting quickly to shifting design requirements. Rachel is recognized for reliability, calmness under pressure, and proactive problem-solving in cross-functional settings.',
    'Describe how it was accomplished...'
  ),
  createReviewSection(
    'impact',
    'Impact',
    'Her contributions unblocked the API migration project in Q2, reducing release bottlenecks and improving cross-team delivery speed by 15%. The shared UI library she supported accelerated design consistency and improved team efficiency. Through mentoring, she enhanced the onboarding process and helped raise the skill level of newer team members.',
    'Describe the impact and results...'
  ),
];
