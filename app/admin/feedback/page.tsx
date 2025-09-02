'use client';

import React from 'react';
import './feedback.css';
import { Card } from '@/components/molecules/Card/Card';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import { PageLayout } from '@/components/templates/PageLayout/PageLayout';
import {
  ArrowRight,
  MoreHorizontal,
  CheckCircle,
  Circle,
  Plus,
  Bot,
  Bell
} from 'lucide-react';
import { getEmployeeById, activitiesData, employeesData } from '@/data/employees';

// Get manager data from the employees data
const managerData = getEmployeeById('alex-ruiz')!;

// Mock data based on the Figma design
const mockData = {
  manager: {
    name: managerData.name,
    title: managerData.role,
    avatar: managerData.avatar,
    activeGoals: 75,
    teamSize: employeesData.filter(emp => emp.manager === 'alex-ruiz').length,
    goalsStatus: {
      onTrack: 45,
      inProgress: 30,
      offTrack: 15,
      notUpdated: 10
    }
  },
  feedbackRequests: {
    completed: 3,
    total: 5
  },
  activities: activitiesData.map(activity => {
    const employee = getEmployeeById(activity.employeeId);
    return {
      id: activity.id,
      user: employee?.name.split(' ')[0] || 'Unknown',
      avatar: employee?.avatar || '/api/placeholder/36/36',
      message: activity.message,
      timestamp: activity.timestamp
    };
  }),
  todos: [
    {
      id: 1,
      title: 'Year End Feedback Rachel, G.',
      status: 'pending',
      action: 'Schedule 1:1',
      completed: false
    },
    {
      id: 2,
      title: 'Performance Review Rachel, G.',
      status: 'pending',
      action: 'Start Performance Review',
      completed: false
    },
    {
      id: 3,
      title: 'Self Assessment',
      status: 'completed',
      completedDate: 'MARCH 26, 2025',
      completed: true
    }
  ]
};

// Chart component for donut charts
const DonutChart = ({ data, size = 164 }: { data: any; size?: number }) => {
  const total = Object.values(data).reduce((a: any, b: any) => a + b, 0);
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 10}
          fill="none"
          stroke="#F8F8FC"
          strokeWidth="20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 10}
          fill="none"
          stroke="#333455"
          strokeWidth="20"
          strokeDasharray={`${(data.onTrack / total) * 100} 100`}
          strokeDashoffset="0"
        />
      </svg>
    </div>
  );
};

// Progress bar component for vertical bars
const VerticalProgressBar = ({ value, maxValue, className }: { value: number; maxValue: number; className?: string }) => {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className={`w-8 h-72 bg-neutral-200 rounded-full relative ${className}`}>
      <div 
        className="absolute bottom-0 w-full bg-neutral-700 rounded-full transition-all duration-300"
        style={{ height: `${percentage}%` }}
      />
    </div>
  );
};

export default function FeedbackAdminPage() {
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
          { label: 'Home', href: '/admin/feedback', active: true },
          { label: 'My Team', href: '/admin/team' },
          { label: 'Game Changers', href: '/admin/game-changers' },
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
      <div className="bg-feedback-background min-h-screen">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Left Sidebar */}
            <div className="w-full lg:w-96 space-y-6 lg:space-y-10">
              {/* Manager Info Card */}
              <Card className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 text-center sm:text-left">
                  <Avatar 
                    src={mockData.manager.avatar}
                    fallback="AR"
                    size="2xl"
                  />
                  <div>
                    <Typography variant="h4" weight="bold">
                      {mockData.manager.name}
                    </Typography>
                    <Typography variant="body" color="muted">
                      {mockData.manager.title}
                    </Typography>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Typography variant="body" color="muted" className="mb-4">
                      Active Goals
                    </Typography>
                    <div className="flex justify-center mb-4">
                      <VerticalProgressBar value={75} maxValue={100} />
                    </div>
                  </div>

                  <div>
                    <Typography variant="body" color="muted" className="mb-4">
                      God of War Team
                    </Typography>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border-2 border-white"
                            style={{ 
                              backgroundColor: i === 1 ? '#474B69' : i === 2 ? '#CBCEE1' : i === 3 ? '#EBEBF5' : '#F8F8FC' 
                            }}
                          />
                        ))}
                      </div>
                      <Typography variant="h6" weight="bold">
                        {mockData.manager.teamSize} employees
                      </Typography>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Team Goals Status */}
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <Typography variant="h6" weight="bold">
                    Team Goals status
                  </Typography>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                  <DonutChart data={mockData.manager.goalsStatus} />
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-neutral-700 rounded-sm" />
                      <Typography variant="caption">On track</Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-neutral-200 rounded-sm" />
                      <Typography variant="caption">In Progress</Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-neutral-400 rounded-sm" />
                      <Typography variant="caption">Off Track</Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-neutral-200 rounded-sm" />
                      <Typography variant="caption">Not updated</Typography>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="bg-neutral-100">
                  See Goals
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>

              {/* Pending Feedback Requests */}
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <Typography variant="h6" weight="bold">
                    Pending Feedback Requests
                  </Typography>
                </div>

                <Typography variant="body" color="muted" className="mb-4">
                  Completed {mockData.feedbackRequests.completed} of {mockData.feedbackRequests.total}
                </Typography>

                <div className="flex justify-center mb-6">
                  <VerticalProgressBar value={60} maxValue={100} />
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white"
                        style={{ 
                          backgroundColor: i <= 3 ? '#333455' : i === 4 ? '#64698B' : '#EBEBF5' 
                        }}
                      />
                    ))}
                  </div>
                  <Typography variant="body">5 Requested</Typography>
                </div>

                <Button variant="ghost" size="sm" className="bg-neutral-100">
                  Give Feedback
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 space-y-10">
              {/* What's been happening */}
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <Typography variant="h5" weight="bold">
                    What's been happening
                  </Typography>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockData.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-feedback-50 rounded-xl border border-feedback-100 gap-4 sm:gap-0"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <Avatar
                          src={activity.avatar}
                          fallback={activity.user[0]}
                          size="md"
                        />
                        <Typography variant="body" className="flex-1">
                          {activity.message}
                        </Typography>
                      </div>
                      <MoreHorizontal className="w-6 h-6 text-neutral-600 self-end sm:self-auto" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* To Do */}
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <Typography variant="h5" weight="bold">
                    To Do
                  </Typography>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockData.todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-feedback-50 rounded-xl border border-feedback-100 gap-4 sm:gap-0"
                    >
                      <div className="flex items-start gap-4 flex-1 w-full sm:w-auto">
                        {todo.completed ? (
                          <CheckCircle className="w-6 h-6 text-neutral-700 fill-current flex-shrink-0 mt-1" />
                        ) : (
                          <Circle className="w-6 h-6 text-neutral-600 flex-shrink-0 mt-1" />
                        )}

                        <div className="flex-1 min-w-0">
                          {todo.completed && (
                            <Typography variant="caption" color="muted" className="uppercase tracking-wide block">
                              {todo.completedDate}
                            </Typography>
                          )}
                          <Typography variant="body" weight={todo.completed ? "bold" : "normal"} className="block">
                            {todo.title}
                          </Typography>
                          {!todo.completed && todo.action && (
                            <Button variant="outline" size="sm" className="mt-2">
                              {todo.action}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-auto">
                        <Badge
                          variant={todo.completed ? "success" : "secondary"}
                        >
                          {todo.completed ? 'Completed' : 'Pending'}
                        </Badge>
                        <MoreHorizontal className="w-6 h-6 text-neutral-600" />
                      </div>
                    </div>
                  ))}

                  {/* Add new reminder */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-feedback-50 rounded-xl border border-feedback-100 gap-4 sm:gap-0">
                    <div className="flex items-center gap-4">
                      <Plus className="w-6 h-6 text-neutral-700" />
                      <Typography variant="body" color="muted">
                        Add a New Reminder
                      </Typography>
                    </div>
                    <div className="px-3 py-1 bg-neutral-300 rounded text-sm uppercase tracking-wide self-end sm:self-auto">
                      Pending
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
