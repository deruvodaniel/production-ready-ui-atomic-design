'use client';

import React, { useState } from 'react';
import './game-changers.css';
import { Card } from '@/components/molecules/Card/Card';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import { PageLayout } from '@/components/templates/PageLayout/PageLayout';
import { 
  ChevronLeft,
  Star,
  Sparkles,
  Bot,
  Bell
} from 'lucide-react';
import { employeesData } from '@/data/employees';
import Link from 'next/link';

// Rating Toggle Component
interface RatingToggleProps {
  value: 'low' | 'medium' | 'high';
  onChange: (value: 'low' | 'medium' | 'high') => void;
}

const RatingToggle: React.FC<RatingToggleProps> = ({ value, onChange }) => {
  return (
    <div className="rating-toggle">
      <button
        type="button"
        className={`rating-option ${value === 'low' ? 'active' : ''}`}
        onClick={() => onChange('low')}
      >
        Low
      </button>
      <button
        type="button"
        className={`rating-option ${value === 'medium' ? 'active' : ''}`}
        onClick={() => onChange('medium')}
      >
        Medium
      </button>
      <button
        type="button"
        className={`rating-option ${value === 'high' ? 'active' : ''}`}
        onClick={() => onChange('high')}
      >
        High
      </button>
    </div>
  );
};

// Performance Row Component
interface PerformanceRowProps {
  label: string;
  value: 'low' | 'medium' | 'high';
  onChange: (value: 'low' | 'medium' | 'high') => void;
}

const PerformanceRow: React.FC<PerformanceRowProps> = ({ label, value, onChange }) => {
  return (
    <div className="performance-row">
      <Typography variant="body" className="performance-label">
        {label}
      </Typography>
      <RatingToggle value={value} onChange={onChange} />
    </div>
  );
};

// Radar Chart Component (simplified)
const RadarChart: React.FC = () => {
  return (
    <div className="radar-chart">
      <svg width="233" height="233" viewBox="0 0 233 233" className="radar-svg">
        {/* Background grids */}
        <g className="radar-grid">
          <polygon
            points="116.5,20 180,60 200,116.5 180,173 116.5,213 53,173 33,116.5 53,60"
            fill="rgba(255, 255, 255, 0.24)"
            stroke="#9498B8"
            strokeWidth="1"
          />
          <polygon
            points="116.5,50 150,75 165,116.5 150,158 116.5,183 83,158 68,116.5 83,75"
            fill="rgba(203, 216, 228, 0.24)"
            stroke="#9498B8"
            strokeWidth="1"
          />
          <polygon
            points="116.5,80 135,95 145,116.5 135,138 116.5,153 98,138 88,116.5 98,95"
            fill="rgba(255, 255, 255, 0.24)"
            stroke="#9498B8"
            strokeWidth="1"
          />
        </g>
        
        {/* Data polygon */}
        <polygon
          points="116.5,30 165,70 190,116.5 165,163 116.5,203 68,163 43,116.5 68,70"
          fill="rgba(79, 70, 229, 0.1)"
          stroke="#4F46E5"
          strokeWidth="2"
        />
        
        {/* Labels */}
        <g className="radar-labels">
          <text x="116.5" y="15" textAnchor="middle" className="radar-label">Retention Risk</text>
          <text x="205" y="65" textAnchor="start" className="radar-label">Game Changers</text>
          <text x="225" y="121" textAnchor="start" className="radar-label">Values & Leadership</text>
          <text x="205" y="175" textAnchor="start" className="radar-label">Engagement</text>
          <text x="116.5" y="225" textAnchor="middle" className="radar-label">Ability</text>
          <text x="28" y="175" textAnchor="end" className="radar-label">Aspiration</text>
          <text x="8" y="121" textAnchor="end" className="radar-label">Agility</text>
        </g>
      </svg>
    </div>
  );
};

export default function GameChangersPage() {
  // Employee data - using Rachel Green from mock data
  const employee = employeesData.find(emp => emp.id === 'rachel-green') || employeesData[0];

  // Performance ratings state
  const [performanceRatings, setPerformanceRatings] = useState({
    retentionRisk: 'high' as 'low' | 'medium' | 'high',
    gameChangers: 'high' as 'low' | 'medium' | 'high',
    valuesAlignment: 'medium' as 'low' | 'medium' | 'high',
    engagementScore: 'low' as 'low' | 'medium' | 'high',
  });

  // Potential ratings state
  const [potentialRatings, setPotentialRatings] = useState({
    ability: 'high' as 'low' | 'medium' | 'high',
    aspiration: 'high' as 'low' | 'medium' | 'high',
    agility: 'medium' as 'low' | 'medium' | 'high',
  });

  // Text areas state
  const [performanceBehaviors, setPerformanceBehaviors] = useState(`Quality of Work:
Delivers consistently high-quality work with exceptional attention to detail, which significantly contributes to project success".

Productivity & Efficiency:
Consistently meets or exceeds quarterly goals and deadlines through effective time management".

Communication:
Communicates effectively with team members, ensuring clear, concise, and error-free information exchange".`);

  const [potentialBehaviors, setPotentialBehaviors] = useState(`Quality of Work:
Delivers consistently high-quality work with exceptional attention to detail, which significantly contributes to project success".

Productivity & Efficiency:
Consistently meets or exceeds quarterly goals and deadlines through effective time management".

Communication:
Communicates effectively with team members, ensuring clear, concise, and error-free information exchange".`);

  // Proposed and final ratings
  const [proposedRating, setProposedRating] = useState<'low' | 'medium' | 'high'>('medium');
  const [finalRating, setFinalRating] = useState<'low' | 'medium' | 'high'>('medium');

  // Form state management
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save functionality
  React.useEffect(() => {
    if (isDirty && !isSaving) {
      const timer = setTimeout(() => {
        handleAutoSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isDirty, performanceRatings, potentialRatings, performanceBehaviors, potentialBehaviors, proposedRating, finalRating]);

  const handleAutoSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setLastSaved(new Date());
    setIsDirty(false);
    setIsSaving(false);
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastSaved(new Date());
    setIsDirty(false);
    setIsSaving(false);
    // In a real app, would navigate away or show success message
  };

  const handleMarkCompleted = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, would mark as completed and navigate away
    setIsSaving(false);
  };

  // Mark form as dirty when any value changes
  const markDirty = () => {
    if (!isDirty) setIsDirty(true);
  };

  return (
    <PageLayout
      header={{
        logo: (
          <div className="w-15 h-15 bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-lg transform rotate-45 relative">
            <div className="absolute inset-2 bg-white rounded opacity-20" />
          </div>
        ),
        title: '',
        navigation: [
          { label: 'Home', href: '/admin/feedback' },
          { label: 'My Team', href: '/admin/team' },
          { label: 'Game Changers', href: '/admin/game-changers', active: true },
        ],
        rightContent: (
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            <div className="hidden sm:flex items-center gap-3 bg-neutral-200 rounded-full px-3 lg:px-4 py-2">
              <div className="w-8 lg:w-10 h-8 lg:h-10 bg-neutral-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 lg:w-6 h-4 lg:h-6 text-white" />
              </div>
              <span className="hidden lg:block text-neutral-600 font-semibold text-sm lg:text-base">Sony Assistant</span>
            </div>
            <div className="w-8 lg:w-10 h-8 lg:h-10 bg-neutral-100 rounded-full flex items-center justify-center">
              <Bell className="w-4 lg:w-5 h-4 lg:h-5 text-neutral-800" />
            </div>
            <Avatar 
              src="/api/placeholder/48/48" 
              fallback="AR" 
              size="md"
              className="lg:w-12 lg:h-12"
            />
          </div>
        ),
        showThemeToggle: false,
        showSettingsButton: false,
      }}
    >
      <div className="game-changers-page">
        {/* Back Button */}
        <div className="back-button">
          <Link href="/admin/team" className="back-link">
            <ChevronLeft className="w-4 h-4" />
            <span>BACK</span>
          </Link>
        </div>

        <div className="game-changers-content">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="employee-info">
              <Avatar 
                src={employee.avatar}
                fallback={employee.name.split(' ').map(n => n[0]).join('')}
                size="xl"
                className="employee-avatar"
              />
              <div className="employee-details">
                <Typography variant="h4" weight="bold" className="employee-name">
                  {employee.name}
                </Typography>
                <Typography variant="body" className="employee-title">
                  {employee.role}
                </Typography>
              </div>
            </div>

            <div className="employee-profile-data">
              <div className="profile-field">
                <Typography variant="body" weight="bold" className="field-label">
                  Job Profile
                </Typography>
                <Typography variant="body" className="field-value">
                  PMF005 - Director, Finance
                </Typography>
              </div>
              
              <div className="profile-field">
                <Typography variant="body" weight="bold" className="field-label">
                  Job Level
                </Typography>
                <Typography variant="body" className="field-value">
                  M5
                </Typography>
              </div>
              
              <div className="profile-field">
                <Typography variant="body" weight="bold" className="field-label">
                  Business Division
                </Typography>
                <Typography variant="body" className="field-value">
                  Admin
                </Typography>
              </div>
              
              <div className="profile-field">
                <Typography variant="body" weight="bold" className="field-label">
                  Last Game Changers Rating
                </Typography>
                <Typography variant="body" className="field-value">
                  Medium
                </Typography>
              </div>
              
              <div className="profile-field">
                <Typography variant="body" weight="bold" className="field-label">
                  Last Effectiveness Index
                </Typography>
                <Typography variant="body" className="field-value">
                  Admin
                </Typography>
              </div>

              <Button variant="secondary" className="view-all-btn">
                View all →
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            {/* Classification Section */}
            <div className="classification-section">
              <div className="classification-icon">
                <Star className="star-icon" />
              </div>
              <Typography variant="h3" weight="bold" className="classification-title">
                Advancing Player
              </Typography>
            </div>

            {/* Performance Review Link */}
            <div className="mb-8">
              <Link href="/admin/performance-review">
                <Button
                  variant="primary"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Sparkles className="w-4 h-4" />
                  Start Performance Review
                </Button>
              </Link>
            </div>

            {/* Performance Section */}
            <div className="evaluation-section">
              <Typography variant="h5" weight="bold" className="section-title">
                Performance
              </Typography>
              
              <div className="evaluation-content">
                <div className="performance-metrics">
                  <PerformanceRow
                    label="Retention Risk"
                    value={performanceRatings.retentionRisk}
                    onChange={(value) => {
                      setPerformanceRatings(prev => ({ ...prev, retentionRisk: value }));
                      markDirty();
                    }}
                  />
                  <PerformanceRow
                    label="Game Changers"
                    value={performanceRatings.gameChangers}
                    onChange={(value) => {
                      setPerformanceRatings(prev => ({ ...prev, gameChangers: value }));
                      markDirty();
                    }}
                  />
                  <PerformanceRow
                    label="Alignment to Our Values & Leadership Behaviors"
                    value={performanceRatings.valuesAlignment}
                    onChange={(value) => {
                      setPerformanceRatings(prev => ({ ...prev, valuesAlignment: value }));
                      markDirty();
                    }}
                  />
                  <PerformanceRow
                    label="Engagement Survey Score"
                    value={performanceRatings.engagementScore}
                    onChange={(value) => {
                      setPerformanceRatings(prev => ({ ...prev, engagementScore: value }));
                      markDirty();
                    }}
                  />
                </div>

                <div className="rating-highlights">
                  <div className="rating-card">
                    <Typography variant="h6" weight="bold" className="rating-card-title">
                      Proposed Rating
                    </Typography>
                    <RatingToggle
                      value={proposedRating}
                      onChange={(value) => {
                        setProposedRating(value);
                        markDirty();
                      }}
                    />
                  </div>
                  
                  <div className="rating-card">
                    <Typography variant="h6" weight="bold" className="rating-card-title">
                      Final Selected Rating
                    </Typography>
                    <RatingToggle
                      value={finalRating}
                      onChange={(value) => {
                        setFinalRating(value);
                        markDirty();
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Example Behaviors */}
              <div className="behaviors-section">
                <Typography variant="body" weight="bold" className="behaviors-label">
                  Example Behaviors
                </Typography>
                <div className="textarea-container">
                  <textarea
                    value={performanceBehaviors}
                    onChange={(e) => {
                      setPerformanceBehaviors(e.target.value);
                      markDirty();
                    }}
                    className="behaviors-textarea"
                    rows={6}
                  />
                  <div className="resize-handle" />
                </div>
                <div className="prefilled-note">
                  <Sparkles className="w-6 h-6 text-neutral-500" />
                  <Typography variant="body" className="note-text">
                    This draft is pre-filled using goals, feedback, and notes. You can edit freely.
                  </Typography>
                </div>
              </div>
            </div>

            {/* Potential Section */}
            <div className="evaluation-section">
              <Typography variant="h5" weight="bold" className="section-title">
                Potential
              </Typography>
              
              <div className="evaluation-content">
                <div className="performance-metrics">
                  <PerformanceRow
                    label="Ability"
                    value={potentialRatings.ability}
                    onChange={(value) => {
                      setPotentialRatings(prev => ({ ...prev, ability: value }));
                      markDirty();
                    }}
                  />
                  <PerformanceRow
                    label="Aspiration"
                    value={potentialRatings.aspiration}
                    onChange={(value) => {
                      setPotentialRatings(prev => ({ ...prev, aspiration: value }));
                      markDirty();
                    }}
                  />
                  <PerformanceRow
                    label="Agility"
                    value={potentialRatings.agility}
                    onChange={(value) => {
                      setPotentialRatings(prev => ({ ...prev, agility: value }));
                      markDirty();
                    }}
                  />
                </div>

                <div className="rating-highlights">
                  <div className="rating-card">
                    <Typography variant="h6" weight="bold" className="rating-card-title">
                      Proposed Rating
                    </Typography>
                    <RatingToggle
                      value={proposedRating}
                      onChange={(value) => {
                        setProposedRating(value);
                        markDirty();
                      }}
                    />
                  </div>
                  
                  <div className="rating-card">
                    <Typography variant="h6" weight="bold" className="rating-card-title">
                      Final Selected Rating
                    </Typography>
                    <RatingToggle
                      value={finalRating}
                      onChange={(value) => {
                        setFinalRating(value);
                        markDirty();
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Example Behaviors */}
              <div className="behaviors-section">
                <Typography variant="body" weight="bold" className="behaviors-label">
                  Example Behaviors
                </Typography>
                <div className="textarea-container">
                  <textarea
                    value={potentialBehaviors}
                    onChange={(e) => {
                      setPotentialBehaviors(e.target.value);
                      markDirty();
                    }}
                    className="behaviors-textarea"
                    rows={6}
                  />
                  <div className="resize-handle" />
                </div>
                <div className="prefilled-note">
                  <Sparkles className="w-6 h-6 text-neutral-500" />
                  <Typography variant="body" className="note-text">
                    This draft is pre-filled using goals, feedback, and notes. You can edit freely.
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="radar-section">
            <RadarChart />
          </div>
        </div>

        {/* Footer */}
        <div className="footer-section">
          <div className="ai-assistant">
            <div className="ai-avatar">
              <Bot className="w-8 h-8 text-neutral-800" />
            </div>
          </div>
          
          <div className="footer-actions">
            <div className="footer-left">
              <Button
                variant="secondary"
                size="lg"
                onClick={handleSaveDraft}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Draft and Close'}
              </Button>
              {lastSaved && (
                <Typography variant="caption" className="auto-save-status">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </Typography>
              )}
              {isSaving && (
                <Typography variant="caption" className="auto-save-status">
                  Auto-saving...
                </Typography>
              )}
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleMarkCompleted}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Mark as Completed'}
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
