'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/templates/AdminLayout/AdminLayout';
import { Card } from '@/components/molecules/Card/Card';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import { useChatContext } from '@/components/providers/ChatProvider';
import {
  Calendar,
  ArrowRight,
  Plus,
  Search,
  List,
  Grid,
  ArrowUpLeft,
  ExpandIcon,
  ArrowUpRight,
} from 'lucide-react';
import { employeesData, getEmployeeById } from '@/data/employees';

// Main tabs for the Game Changers section
const mainTabs = [
  { id: 'goals', label: 'Goals', active: true },
  { id: 'checkins', label: 'Check-ins', active: false },
  { id: 'feedback', label: 'Feedback', active: false },
  { id: 'performance', label: 'Performance', active: false },
  { id: 'talent-plan', label: 'Talent Plan', active: false },
];

// Sub tabs for Team Goals section
const teamGoalsTabs = [
  { id: 'middle-range', label: 'Middle Range Plans', active: false },
  { id: 'my-goals', label: 'My Goals', active: false },
  { id: 'team-goals', label: 'Team Goals', active: true },
];

// Mock goal data based on Figma design
const teamGoals = [
  {
    id: 1,
    title: '2026 Artificial intelligence Technology Adoption',
    progress: 50,
    status: 'On Track',
    assignee: {
      name: 'Perform AI Trainings',
      avatar: '/api/placeholder/36/36',
    },
    badges: ['Personal Goal', 'Approved'],
  },
  {
    id: 2,
    title: '2026 Artificial intelligence Technology Adoption',
    progress: 50,
    status: 'On Track',
    assignee: {
      name: 'Perform AI Trainings',
      avatar: '/api/placeholder/36/36',
    },
    badges: ['Personal Goal', 'Approved'],
  },
  {
    id: 3,
    title: '2026 Artificial intelligence Technology Adoption',
    progress: 50,
    status: 'On Track',
    assignee: {
      name: 'Perform AI Trainings',
      avatar: '/api/placeholder/36/36',
    },
    badges: ['Personal Goal', 'Approved'],
  },
  {
    id: 4,
    title: '2026 Artificial intelligence Technology Adoption',
    progress: 50,
    status: 'On Track',
    assignee: {
      name: 'Perform AI Trainings',
      avatar: '/api/placeholder/36/36',
    },
    badges: ['Personal Goal', 'Approved'],
  },
  {
    id: 5,
    title: '2026 Artificial intelligence Technology Adoption',
    progress: 50,
    status: 'On Track',
    assignee: {
      name: 'Perform AI Trainings',
      avatar: '/api/placeholder/36/36',
    },
    badges: ['Personal Goal', 'Approved'],
  },
];

// Performance metrics component
const PerformanceMetrics = () => {
  return (
    <div className="flex items-center gap-8">
      {/* Circular Progress Chart */}
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle cx="50" cy="50" r="35" stroke="#CBCEE1" strokeWidth="8" fill="none" />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="35"
            stroke="#9498B8"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${25 * 2.2} ${100 * 2.2}`}
            className="transition-all duration-1000 ease-out"
          />
          {/* Inner progress segment */}
          <circle
            cx="50"
            cy="50"
            r="28"
            stroke="#CBCEE1"
            strokeWidth="6"
            fill="none"
            strokeDasharray={`${15 * 1.8} ${100 * 1.8}`}
            strokeDashoffset={`${-10 * 1.8}`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">25%</div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">20</div>
          <div className="text-xs text-gray-500">Goals</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">15</div>
          <div className="text-xs text-gray-500">On Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">5</div>
          <div className="text-xs text-gray-500">Pending</div>
        </div>
      </div>

      {/* New Goal Button */}
      <Button variant="primary" size="sm" className="ml-auto">
        <Plus className="w-4 h-4 mr-2" />
        New Goal
      </Button>
    </div>
  );
};

// Goal Card Component
const GoalCard = ({ goal }: { goal: any }) => {
  return (
    <Card className="p-6 hover:shadow-md transition-all duration-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <ArrowUpLeft className="w-4 h-4 text-gray-600" />
          <Typography variant="body" weight="semibold" className="flex-1">
            {goal.title}
          </Typography>
          <div className="flex items-center gap-2">
            {goal.badges.map((badge: string, index: number) => (
              <Badge key={index} variant="secondary" size="sm">
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${goal.progress}%` }}
            />
          </div>
          <Typography variant="body" weight="semibold" className="text-sm">
            {goal.progress}% ({goal.status})
          </Typography>
        </div>

        {/* Assignee */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={goal.assignee.avatar} fallback="PA" size="sm" />
            <Typography variant="body" className="text-sm">
              {goal.assignee.name}
            </Typography>
          </div>
          <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ExpandIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </Card>
  );
};

// Content component that uses ChatContext (inside AdminLayout)
const GameChangersContent = () => {
  const [activeMainTab, setActiveMainTab] = useState('goals');
  const [activeSubTab, setActiveSubTab] = useState('team-goals');
  const { openChat } = useChatContext();

  const handleChatClick = () => {
    openChat();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="py-8">
            <Typography variant="h2" weight="bold" className="text-gray-900">
              Game Changers
            </Typography>
          </div>

          {/* My Journey Section */}
          <div className="py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-4 py-2">
                <Avatar src="/api/placeholder/32/32" fallback="AR" size="sm" />
                <Typography variant="body" weight="bold">
                  My Journey
                </Typography>
                <ArrowRight className="w-4 h-4 text-gray-600" />
              </div>

              {/* Step Navigation */}
              <div className="flex items-center gap-4">
                {mainTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveMainTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 ${
                      activeMainTab === tab.id
                        ? 'bg-gray-200 border-gray-300 text-gray-900'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-semibold">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="py-6">
            <PerformanceMetrics />
          </div>

          {/* Team Goals Tabs */}
          <div className="flex items-center border-b border-gray-200">
            {teamGoalsTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-4 py-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
                  activeSubTab === tab.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Team Goals Section */}
        <div className="space-y-6">
          {/* Section Header */}
          <div className="space-y-6">
            <Typography variant="h4" weight="bold">
              Team Goals
            </Typography>

            {/* Search and Controls */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <List className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Grid className="w-5 h-5 text-gray-600" />
              </button>
              <Button variant="secondary" size="sm">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </div>
          </div>

          {/* Goals Grid */}
          <div className="grid grid-cols-1 gap-4">
            {teamGoals.map((goal, index) => (
              <div
                key={goal.id}
                className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <GoalCard goal={goal} />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action for AI Chat */}
        <Card className="p-8 mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-2xl mx-auto">
            <Typography variant="h5" weight="bold" className="mb-3">
              Need insights about team performance?
            </Typography>
            <Typography variant="body" className="text-gray-600 mb-6">
              Use our AI assistant to analyze goal progress, team performance metrics, and get
              actionable recommendations.
            </Typography>
            <Button variant="primary" size="lg" onClick={handleChatClick}>
              Ask Sony AI Assistant
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

// Main page component
export default function GameChangersPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <AdminLayout currentPage="game-changers">
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <Typography variant="body" className="text-gray-600">
              Loading Game Changers...
            </Typography>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="game-changers">
      <GameChangersContent />
    </AdminLayout>
  );
}
