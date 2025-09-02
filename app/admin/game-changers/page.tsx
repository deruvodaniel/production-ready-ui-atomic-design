'use client';

import React, { useState, useEffect } from 'react';
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
  Bell,
  Save,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { employeesData } from '@/data/employees';
import Link from 'next/link';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

// Simulated API functions
const simulateAPICall = <T,>(data: T, delay: number = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Rating Toggle Component with accessibility improvements
interface RatingToggleProps {
  value: 'low' | 'medium' | 'high';
  onChange: (value: 'low' | 'medium' | 'high') => void;
  label: string;
  disabled?: boolean;
}

const RatingToggle: React.FC<RatingToggleProps> = ({ value, onChange, label, disabled = false }) => {
  return (
    <div className="rating-toggle" role="radiogroup" aria-label={label}>
      {(['low', 'medium', 'high'] as const).map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          aria-label={`${label}: ${option}`}
          className={`rating-option ${value === option ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={() => !disabled && onChange(option)}
          disabled={disabled}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
};

// Performance Row Component with accessibility improvements
interface PerformanceRowProps {
  label: string;
  value: 'low' | 'medium' | 'high';
  onChange: (value: 'low' | 'medium' | 'high') => void;
  description?: string;
  disabled?: boolean;
}

const PerformanceRow: React.FC<PerformanceRowProps> = ({ 
  label, 
  value, 
  onChange, 
  description,
  disabled = false 
}) => {
  return (
    <div className="performance-row">
      <div className="performance-label-container">
        <Typography variant="body" className="performance-label" id={`label-${label.replace(/\s+/g, '-').toLowerCase()}`}>
          {label}
        </Typography>
        {description && (
          <Typography variant="caption" className="performance-description text-gray-500">
            {description}
          </Typography>
        )}
      </div>
      <RatingToggle 
        value={value} 
        onChange={onChange} 
        label={label}
        disabled={disabled}
      />
    </div>
  );
};

// Enhanced Radar Chart with recharts
const EnhancedRadarChart: React.FC<{ data: any[] }> = ({ data }) => {
  const chartConfig = {
    value: {
      label: 'Rating',
      color: 'hsl(var(--chart-1))'
    }
  };

  return (
    <div className="w-full h-80" role="img" aria-label="Performance radar chart showing ratings across different dimensions">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <ResponsiveContainer>
          <RadarChart data={data} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
            <PolarGrid stroke="#9498B8" strokeWidth={1} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fontSize: 12, fill: '#474B69' }}
              className="text-xs"
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 3]} 
              tick={{ fontSize: 10, fill: '#9498B8' }}
              tickCount={4}
            />
            <Radar 
              name="Rating" 
              dataKey="value" 
              stroke="hsl(var(--chart-1))" 
              fill="hsl(var(--chart-1))" 
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

// Enhanced form data with better structure
const createFormData = () => {
  const employee = employeesData.find(emp => emp.id === 'rachel-green') || employeesData[0];
  
  return {
    employee: {
      id: employee.id,
      name: employee.name,
      role: employee.role,
      avatar: employee.avatar,
      jobProfile: 'PMF005 - Director, Finance',
      jobLevel: 'M5',
      businessDivision: 'Admin',
      lastRating: 'Medium',
      lastEffectivenessIndex: 'Admin'
    },
    ratings: {
      performance: {
        retentionRisk: 'high' as const,
        gameChangers: 'high' as const,
        valuesAlignment: 'medium' as const,
        engagementScore: 'low' as const,
      },
      potential: {
        ability: 'high' as const,
        aspiration: 'high' as const,
        agility: 'medium' as const,
      },
      proposed: 'medium' as const,
      final: 'medium' as const
    },
    behaviors: {
      performance: `Quality of Work:
Delivers consistently high-quality work with exceptional attention to detail, which significantly contributes to project success.

Productivity & Efficiency:
Consistently meets or exceeds quarterly goals and deadlines through effective time management.

Communication:
Communicates effectively with team members, ensuring clear, concise, and error-free information exchange.`,
      potential: `Leadership Potential:
Demonstrates strong leadership qualities and the ability to influence others positively.

Learning Agility:
Quickly adapts to new technologies and methodologies, showing continuous improvement.

Strategic Thinking:
Shows ability to think strategically and contribute to long-term planning initiatives.`
    },
    classification: 'Advancing Player',
    lastSaved: null as Date | null,
    isDirty: false
  };
};

export default function GameChangersPage() {
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await simulateAPICall(createFormData(), 800);
        setFormData(data);
      } catch (err) {
        setError('Failed to load employee data');
        console.error('Data loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (formData?.isDirty && !isSaving) {
      const timer = setTimeout(() => {
        handleAutoSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [formData?.isDirty, isSaving]);

  // Prepare radar chart data
  const radarData = formData ? [
    { subject: 'Retention Risk', value: formData.ratings.performance.retentionRisk === 'high' ? 3 : formData.ratings.performance.retentionRisk === 'medium' ? 2 : 1 },
    { subject: 'Game Changers', value: formData.ratings.performance.gameChangers === 'high' ? 3 : formData.ratings.performance.gameChangers === 'medium' ? 2 : 1 },
    { subject: 'Values & Leadership', value: formData.ratings.performance.valuesAlignment === 'high' ? 3 : formData.ratings.performance.valuesAlignment === 'medium' ? 2 : 1 },
    { subject: 'Engagement', value: formData.ratings.performance.engagementScore === 'high' ? 3 : formData.ratings.performance.engagementScore === 'medium' ? 2 : 1 },
    { subject: 'Ability', value: formData.ratings.potential.ability === 'high' ? 3 : formData.ratings.potential.ability === 'medium' ? 2 : 1 },
    { subject: 'Aspiration', value: formData.ratings.potential.aspiration === 'high' ? 3 : formData.ratings.potential.aspiration === 'medium' ? 2 : 1 },
    { subject: 'Agility', value: formData.ratings.potential.agility === 'high' ? 3 : formData.ratings.potential.agility === 'medium' ? 2 : 1 },
  ] : [];

  const markDirty = () => {
    if (formData && !formData.isDirty) {
      setFormData({ ...formData, isDirty: true });
    }
  };

  const handleAutoSave = async () => {
    if (!formData) return;
    
    setIsSaving(true);
    setSaveStatus('saving');
    try {
      // Simulate API call
      await simulateAPICall({}, 500);
      setFormData({ ...formData, lastSaved: new Date(), isDirty: false });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      setSaveStatus('error');
      console.error('Auto-save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    setSaveStatus('saving');
    try {
      await simulateAPICall({}, 1000);
      setFormData({ ...formData, lastSaved: new Date(), isDirty: false });
      setSaveStatus('saved');
    } catch (err) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleMarkCompleted = async () => {
    setIsSaving(true);
    try {
      await simulateAPICall({}, 1000);
      // In a real app, would mark as completed and navigate away
    } catch (err) {
      console.error('Completion error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const updatePerformanceRating = (key: string, value: 'low' | 'medium' | 'high') => {
    setFormData({
      ...formData,
      ratings: {
        ...formData.ratings,
        performance: {
          ...formData.ratings.performance,
          [key]: value
        }
      }
    });
    markDirty();
  };

  const updatePotentialRating = (key: string, value: 'low' | 'medium' | 'high') => {
    setFormData({
      ...formData,
      ratings: {
        ...formData.ratings,
        potential: {
          ...formData.ratings.potential,
          [key]: value
        }
      }
    });
    markDirty();
  };

  const updateBehavior = (type: 'performance' | 'potential', value: string) => {
    setFormData({
      ...formData,
      behaviors: {
        ...formData.behaviors,
        [type]: value
      }
    });
    markDirty();
  };

  if (loading) {
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
        }}
      >
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-600 mx-auto"></div>
            <Typography variant="body" className="mt-4 text-gray-600">
              Loading employee evaluation...
            </Typography>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
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
        }}
      >
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <Typography variant="h5" className="text-red-600 mb-2">
              Error loading evaluation
            </Typography>
            <Typography variant="body" className="text-gray-600">
              {error}
            </Typography>
          </div>
        </div>
      </PageLayout>
    );
  }

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
      <div className="game-changers-page bg-gray-50 min-h-screen">
        {/* Header with back button */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link 
                  href="/admin/team" 
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  aria-label="Back to team page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="font-medium">BACK</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                {saveStatus && (
                  <div className="flex items-center gap-2">
                    {saveStatus === 'saving' && (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <Typography variant="caption" className="text-blue-600">Saving...</Typography>
                      </>
                    )}
                    {saveStatus === 'saved' && (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <Typography variant="caption" className="text-green-600">Saved</Typography>
                      </>
                    )}
                    {saveStatus === 'error' && (
                      <>
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <Typography variant="caption" className="text-red-600">Save failed</Typography>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
            {/* Sidebar */}
            <aside className="w-full xl:w-80 space-y-6" role="complementary" aria-label="Employee information">
              <Card className="p-6 transition-all duration-200 hover:shadow-lg">
                <div className="employee-info">
                  <Avatar 
                    src={formData.employee.avatar}
                    fallback={formData.employee.name.split(' ').map((n: string) => n[0]).join('')}
                    size="xl"
                    className="employee-avatar mb-4 mx-auto transition-transform duration-200 hover:scale-105"
                  />
                  <div className="text-center">
                    <Typography variant="h4" weight="bold" className="employee-name mb-2">
                      {formData.employee.name}
                    </Typography>
                    <Typography variant="body" className="employee-title text-gray-600 mb-4">
                      {formData.employee.role}
                    </Typography>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Typography variant="body" weight="bold" className="text-gray-900 mb-1">
                        Job Profile
                      </Typography>
                      <Typography variant="body" className="text-gray-600">
                        {formData.employee.jobProfile}
                      </Typography>
                    </div>
                    
                    <div>
                      <Typography variant="body" weight="bold" className="text-gray-900 mb-1">
                        Job Level
                      </Typography>
                      <Typography variant="body" className="text-gray-600">
                        {formData.employee.jobLevel}
                      </Typography>
                    </div>
                    
                    <div>
                      <Typography variant="body" weight="bold" className="text-gray-900 mb-1">
                        Business Division
                      </Typography>
                      <Typography variant="body" className="text-gray-600">
                        {formData.employee.businessDivision}
                      </Typography>
                    </div>
                    
                    <div>
                      <Typography variant="body" weight="bold" className="text-gray-900 mb-1">
                        Last Game Changers Rating
                      </Typography>
                      <Badge variant="secondary" className="inline-flex">
                        {formData.employee.lastRating}
                      </Badge>
                    </div>
                  </div>

                  <Button variant="secondary" className="w-full transition-all duration-200 hover:shadow-sm">
                    View all →
                  </Button>
                </div>
              </Card>

              {/* Radar Chart */}
              <Card className="p-6 transition-all duration-200 hover:shadow-lg">
                <Typography variant="h6" weight="bold" className="mb-4 text-center">
                  Performance Overview
                </Typography>
                <EnhancedRadarChart data={radarData} />
              </Card>
            </aside>

            {/* Main Content */}
            <main className="flex-1 space-y-8" role="main">
              {/* Classification Section */}
              <Card className="p-6 lg:p-8 transition-all duration-200 hover:shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <Typography variant="h3" weight="bold" className="text-gray-900">
                      {formData.classification}
                    </Typography>
                    <Typography variant="body" className="text-gray-600">
                      Current performance classification
                    </Typography>
                  </div>
                </div>

                {/* Performance Review Link */}
                <Link href="/admin/performance-review">
                  <Button
                    variant="primary"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    Start Performance Review
                  </Button>
                </Link>
              </Card>

              {/* Performance Section */}
              <Card className="p-6 lg:p-8 transition-all duration-200 hover:shadow-lg">
                <Typography variant="h5" weight="bold" className="mb-6">
                  Performance
                </Typography>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <PerformanceRow
                        label="Retention Risk"
                        description="Risk of employee leaving the organization"
                        value={formData.ratings.performance.retentionRisk}
                        onChange={(value) => updatePerformanceRating('retentionRisk', value)}
                        disabled={isSaving}
                      />
                      <PerformanceRow
                        label="Game Changers"
                        description="Impact on organizational success"
                        value={formData.ratings.performance.gameChangers}
                        onChange={(value) => updatePerformanceRating('gameChangers', value)}
                        disabled={isSaving}
                      />
                      <PerformanceRow
                        label="Values & Leadership"
                        description="Alignment with company values"
                        value={formData.ratings.performance.valuesAlignment}
                        onChange={(value) => updatePerformanceRating('valuesAlignment', value)}
                        disabled={isSaving}
                      />
                      <PerformanceRow
                        label="Engagement Score"
                        description="Employee engagement level"
                        value={formData.ratings.performance.engagementScore}
                        onChange={(value) => updatePerformanceRating('engagementScore', value)}
                        disabled={isSaving}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <Typography variant="h6" weight="bold" className="mb-3">
                          Proposed Rating
                        </Typography>
                        <RatingToggle
                          value={formData.ratings.proposed}
                          onChange={(value) => setFormData({
                            ...formData,
                            ratings: { ...formData.ratings, proposed: value }
                          })}
                          label="Proposed rating"
                          disabled={isSaving}
                        />
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <Typography variant="h6" weight="bold" className="mb-3">
                          Final Rating
                        </Typography>
                        <RatingToggle
                          value={formData.ratings.final}
                          onChange={(value) => setFormData({
                            ...formData,
                            ratings: { ...formData.ratings, final: value }
                          })}
                          label="Final rating"
                          disabled={isSaving}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Performance Behaviors */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Typography variant="body" weight="bold">
                        Performance Examples
                      </Typography>
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <textarea
                        value={formData.behaviors.performance}
                        onChange={(e) => updateBehavior('performance', e.target.value)}
                        className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        disabled={isSaving}
                        aria-label="Performance behavior examples"
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-gray-500">
                      <Sparkles className="w-4 h-4" />
                      <Typography variant="caption">
                        AI-generated draft based on goals and feedback. Edit as needed.
                      </Typography>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Potential Section */}
              <Card className="p-6 lg:p-8 transition-all duration-200 hover:shadow-lg">
                <Typography variant="h5" weight="bold" className="mb-6">
                  Potential
                </Typography>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <PerformanceRow
                        label="Ability"
                        description="Capability to perform in higher roles"
                        value={formData.ratings.potential.ability}
                        onChange={(value) => updatePotentialRating('ability', value)}
                        disabled={isSaving}
                      />
                      <PerformanceRow
                        label="Aspiration"
                        description="Desire for advancement and growth"
                        value={formData.ratings.potential.aspiration}
                        onChange={(value) => updatePotentialRating('aspiration', value)}
                        disabled={isSaving}
                      />
                      <PerformanceRow
                        label="Agility"
                        description="Adaptability to change and learning"
                        value={formData.ratings.potential.agility}
                        onChange={(value) => updatePotentialRating('agility', value)}
                        disabled={isSaving}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <Typography variant="h6" weight="bold" className="mb-3">
                          Proposed Rating
                        </Typography>
                        <RatingToggle
                          value={formData.ratings.proposed}
                          onChange={(value) => setFormData({
                            ...formData,
                            ratings: { ...formData.ratings, proposed: value }
                          })}
                          label="Proposed potential rating"
                          disabled={isSaving}
                        />
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <Typography variant="h6" weight="bold" className="mb-3">
                          Final Rating
                        </Typography>
                        <RatingToggle
                          value={formData.ratings.final}
                          onChange={(value) => setFormData({
                            ...formData,
                            ratings: { ...formData.ratings, final: value }
                          })}
                          label="Final potential rating"
                          disabled={isSaving}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Potential Behaviors */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Typography variant="body" weight="bold">
                        Potential Examples
                      </Typography>
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <textarea
                        value={formData.behaviors.potential}
                        onChange={(e) => updateBehavior('potential', e.target.value)}
                        className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        disabled={isSaving}
                        aria-label="Potential behavior examples"
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-gray-500">
                      <Sparkles className="w-4 h-4" />
                      <Typography variant="caption">
                        AI-generated draft based on goals and feedback. Edit as needed.
                      </Typography>
                    </div>
                  </div>
                </div>
              </Card>
            </main>
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="bg-white border-t border-gray-200 sticky bottom-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
                {formData.lastSaved && (
                  <Typography variant="caption" className="text-gray-500">
                    Last saved: {formData.lastSaved.toLocaleTimeString()}
                  </Typography>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="secondary"
                  onClick={handleSaveDraft}
                  disabled={isSaving}
                  className="transition-all duration-200 hover:shadow-sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Draft'}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleMarkCompleted}
                  disabled={isSaving}
                  className="transition-all duration-200 hover:shadow-md"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Mark as Completed'}
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageLayout>
  );
}
