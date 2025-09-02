'use client';

import React, { useState, useEffect } from 'react';
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
  Bell,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';
import { getEmployeeById, activitiesData, employeesData } from '@/data/employees';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// Simulated API functions
const simulateAPICall = <T,>(data: T, delay: number = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Get manager data from the employees data
const managerData = getEmployeeById('alex-ruiz')!;

// Enhanced mock data with better API simulation
const createMockData = () => ({
  manager: {
    id: managerData.id,
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
    },
    teamPerformance: [
      { month: 'Jan', score: 85 },
      { month: 'Feb', score: 87 },
      { month: 'Mar', score: 90 },
      { month: 'Apr', score: 88 },
      { month: 'May', score: 92 },
      { month: 'Jun', score: 89 }
    ]
  },
  feedbackRequests: {
    completed: 3,
    total: 5,
    pending: 2,
    overdue: 0
  },
  activities: activitiesData.map(activity => {
    const employee = getEmployeeById(activity.employeeId);
    return {
      id: activity.id,
      user: employee?.name.split(' ')[0] || 'Unknown',
      avatar: employee?.avatar || '/api/placeholder/36/36',
      message: activity.message,
      timestamp: activity.timestamp,
      type: activity.type,
      status: activity.status
    };
  }),
  todos: [
    {
      id: 1,
      title: 'Year End Feedback Rachel, G.',
      status: 'pending',
      action: 'Schedule 1:1',
      completed: false,
      priority: 'high',
      dueDate: '2024-02-15'
    },
    {
      id: 2,
      title: 'Performance Review Rachel, G.',
      status: 'pending',
      action: 'Start Performance Review',
      completed: false,
      priority: 'medium',
      dueDate: '2024-02-20'
    },
    {
      id: 3,
      title: 'Self Assessment',
      status: 'completed',
      completedDate: 'MARCH 26, 2025',
      completed: true,
      priority: 'low'
    }
  ],
  metrics: {
    totalGoals: 100,
    completedGoals: 75,
    teamSatisfaction: 4.2,
    avgResponseTime: '2.3 days'
  }
});

// Chart configurations for recharts
const goalsChartConfig = {
  onTrack: {
    label: 'On Track',
    color: 'hsl(var(--chart-1))'
  },
  inProgress: {
    label: 'In Progress', 
    color: 'hsl(var(--chart-2))'
  },
  offTrack: {
    label: 'Off Track',
    color: 'hsl(var(--chart-3))'
  },
  notUpdated: {
    label: 'Not Updated',
    color: 'hsl(var(--chart-4))'
  }
};

const performanceChartConfig = {
  score: {
    label: 'Performance Score',
    color: 'hsl(var(--chart-1))'
  }
};

// Enhanced Donut Chart with recharts
const GoalsDonutChart = ({ data }: { data: any }) => {
  const chartData = [
    { name: 'onTrack', value: data.onTrack, fill: '#333455' },
    { name: 'inProgress', value: data.inProgress, fill: '#474B69' },
    { name: 'offTrack', value: data.offTrack, fill: '#64698B' },
    { name: 'notUpdated', value: data.notUpdated, fill: '#EBEBF5' }
  ];

  const total = Object.values(data).reduce((a: number, b: any) => a + Number(b), 0);

  return (
    <div className="relative w-40 h-40 mx-auto" role="img" aria-label={`Goals distribution chart. Total: ${total}`}>
      <ChartContainer config={goalsChartConfig} className="w-full h-full">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <ChartTooltip 
            content={<ChartTooltipContent hideLabel />}
            cursor={{ fill: 'transparent' }}
          />
        </PieChart>
      </ChartContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Typography variant="h5" weight="bold" className="text-gray-900">
            {total}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            Total Goals
          </Typography>
        </div>
      </div>
    </div>
  );
};

// Enhanced Progress Bar with animation
const ProgressBar = ({ 
  value, 
  maxValue, 
  label, 
  className = "",
  showAnimation = true 
}: { 
  value: number; 
  maxValue: number; 
  label?: string;
  className?: string;
  showAnimation?: boolean;
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = (value / maxValue) * 100;
  
  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => setAnimatedValue(percentage), 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(percentage);
    }
  }, [percentage, showAnimation]);

  return (
    <div className={`w-8 h-32 ${className}`} role="progressbar" aria-valuenow={value} aria-valuemax={maxValue} aria-label={label}>
      <div className="w-full h-full bg-neutral-200 rounded-full relative overflow-hidden">
        <div 
          className="absolute bottom-0 w-full bg-gradient-to-t from-neutral-700 to-neutral-600 rounded-full transition-all duration-1000 ease-out"
          style={{ height: `${animatedValue}%` }}
        />
      </div>
      <Typography variant="caption" className="block text-center mt-2 text-gray-600">
        {value}%
      </Typography>
    </div>
  );
};

// Performance Chart Component
const PerformanceChart = ({ data }: { data: any[] }) => (
  <div className="h-32 w-full" role="img" aria-label="Team performance over time">
    <ChartContainer config={performanceChartConfig} className="w-full h-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
          <YAxis hide />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="score" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  </div>
);

export default function FeedbackAdminPage() {
  const [mockData, setMockData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate API data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await simulateAPICall(createMockData(), 800);
        setMockData(data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Data loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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
        <div className="bg-feedback-background min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-600 mx-auto"></div>
            <Typography variant="body" className="mt-4 text-gray-600">
              Loading dashboard...
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
            { label: 'Home', href: '/admin/feedback', active: true },
            { label: 'My Team', href: '/admin/team' },
            { label: 'Game Changers', href: '/admin/game-changers' },
          ],
        }}
      >
        <div className="bg-feedback-background min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Typography variant="h5" className="text-red-600 mb-2">
              Error loading dashboard
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
        {/* Page Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h3" weight="bold" className="text-gray-900">
                  Team Dashboard
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  Overview of your team's performance and feedback
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-5 h-5" />
                  <Typography variant="body" weight="semibold">
                    +12% this month
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="flex flex-col xl:flex-row gap-6 lg:gap-10">
            {/* Left Sidebar */}
            <aside className="w-full xl:w-96 space-y-6 lg:space-y-8" role="complementary" aria-label="Team statistics and metrics">
              {/* Manager Info Card */}
              <Card className="p-4 sm:p-6 lg:p-8 transition-all duration-200 hover:shadow-lg">
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 text-center sm:text-left">
                  <Avatar 
                    src={mockData.manager.avatar}
                    fallback="AR"
                    size="2xl"
                    className="transition-transform duration-200 hover:scale-105"
                  />
                  <div>
                    <Typography variant="h4" weight="bold">
                      {mockData.manager.name}
                    </Typography>
                    <Typography variant="body" color="muted">
                      {mockData.manager.title}
                    </Typography>
                    <div className="flex items-center gap-2 mt-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <Typography variant="caption" className="text-gray-500">
                        Managing {mockData.manager.teamSize} people
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-4 h-4 text-gray-500" />
                      <Typography variant="body" color="muted">
                        Active Goals Progress
                      </Typography>
                    </div>
                    <div className="flex justify-center mb-4">
                      <ProgressBar 
                        value={mockData.manager.activeGoals} 
                        maxValue={100}
                        label="Active goals progress"
                      />
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
                            className="w-6 h-6 rounded-full border-2 border-white transition-transform duration-200 hover:scale-110"
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

                  {/* Performance Chart */}
                  <div>
                    <Typography variant="body" color="muted" className="mb-4">
                      Team Performance Trend
                    </Typography>
                    <PerformanceChart data={mockData.manager.teamPerformance} />
                  </div>
                </div>
              </Card>

              {/* Team Goals Status */}
              <Card className="p-6 lg:p-8 transition-all duration-200 hover:shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <Typography variant="h6" weight="bold">
                    Team Goals Status
                  </Typography>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                  <GoalsDonutChart data={mockData.manager.goalsStatus} />
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-neutral-700 rounded-sm" />
                      <Typography variant="caption">On track ({mockData.manager.goalsStatus.onTrack})</Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-neutral-500 rounded-sm" />
                      <Typography variant="caption">In Progress ({mockData.manager.goalsStatus.inProgress})</Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-neutral-400 rounded-sm" />
                      <Typography variant="caption">Off Track ({mockData.manager.goalsStatus.offTrack})</Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-neutral-200 rounded-sm" />
                      <Typography variant="caption">Not updated ({mockData.manager.goalsStatus.notUpdated})</Typography>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200">
                  See Goals
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>

              {/* Pending Feedback Requests */}
              <Card className="p-6 lg:p-8 transition-all duration-200 hover:shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <Typography variant="h6" weight="bold">
                    Feedback Requests
                  </Typography>
                </div>

                <Typography variant="body" color="muted" className="mb-4">
                  Completed {mockData.feedbackRequests.completed} of {mockData.feedbackRequests.total}
                </Typography>

                <div className="flex justify-center mb-6">
                  <ProgressBar 
                    value={(mockData.feedbackRequests.completed / mockData.feedbackRequests.total) * 100} 
                    maxValue={100}
                    label="Feedback completion progress"
                  />
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white transition-transform duration-200 hover:scale-110"
                        style={{ 
                          backgroundColor: i <= mockData.feedbackRequests.completed ? '#333455' : i === 4 ? '#64698B' : '#EBEBF5' 
                        }}
                      />
                    ))}
                  </div>
                  <Typography variant="body">{mockData.feedbackRequests.total} Requested</Typography>
                </div>

                <Button variant="ghost" size="sm" className="bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200">
                  Give Feedback
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 space-y-8 lg:space-y-10" role="main">
              {/* What's been happening */}
              <section aria-labelledby="activity-heading">
                <Card className="p-6 lg:p-8 transition-all duration-200 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <Typography id="activity-heading" variant="h5" weight="bold">
                      Recent Activity
                    </Typography>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
                      View All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {mockData.activities.map((activity: any, index: number) => (
                      <div
                        key={activity.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-feedback-50 rounded-xl border border-feedback-100 gap-4 sm:gap-0 transition-all duration-200 hover:shadow-md hover:border-feedback-200 group"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: 'fadeInUp 0.5s ease-out forwards'
                        }}
                      >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <Avatar
                            src={activity.avatar}
                            fallback={activity.user[0]}
                            size="md"
                            className="transition-transform duration-200 group-hover:scale-105"
                          />
                          <div className="flex-1">
                            <Typography variant="body">
                              <span className="font-semibold">{activity.user}</span> {activity.message}
                            </Typography>
                            <Typography variant="caption" className="text-gray-500">
                              {activity.timestamp.toLocaleDateString()}
                            </Typography>
                          </div>
                        </div>
                        <button 
                          className="self-end sm:self-auto p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          aria-label="More options"
                        >
                          <MoreHorizontal className="w-5 h-5 text-neutral-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>

              {/* To Do */}
              <section aria-labelledby="todo-heading">
                <Card className="p-6 lg:p-8 transition-all duration-200 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <Typography id="todo-heading" variant="h5" weight="bold">
                      To Do
                    </Typography>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
                      View All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {mockData.todos.map((todo: any, index: number) => (
                      <div
                        key={todo.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-feedback-50 rounded-xl border border-feedback-100 gap-4 sm:gap-0 transition-all duration-200 hover:shadow-md hover:border-feedback-200 group"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: 'fadeInUp 0.5s ease-out forwards'
                        }}
                      >
                        <div className="flex items-start gap-4 flex-1 w-full sm:w-auto">
                          <button 
                            className="p-1 transition-transform duration-200 hover:scale-110"
                            aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                          >
                            {todo.completed ? (
                              <CheckCircle className="w-6 h-6 text-green-600 fill-current" />
                            ) : (
                              <Circle className="w-6 h-6 text-neutral-600" />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            {todo.completed && (
                              <Typography variant="caption" color="muted" className="uppercase tracking-wide block">
                                {todo.completedDate}
                              </Typography>
                            )}
                            <Typography 
                              variant="body" 
                              weight={todo.completed ? "bold" : "normal"} 
                              className={`block ${todo.completed ? 'line-through text-gray-500' : ''}`}
                            >
                              {todo.title}
                            </Typography>
                            {!todo.completed && todo.action && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-2 transition-all duration-200 hover:shadow-sm"
                              >
                                {todo.action}
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            )}
                            {todo.dueDate && !todo.completed && (
                              <Typography variant="caption" className="text-gray-500 block mt-1">
                                Due: {new Date(todo.dueDate).toLocaleDateString()}
                              </Typography>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-auto">
                          {todo.priority && !todo.completed && (
                            <Badge
                              variant={todo.priority === 'high' ? 'error' : todo.priority === 'medium' ? 'warning' : 'secondary'}
                              size="sm"
                            >
                              {todo.priority}
                            </Badge>
                          )}
                          <Badge
                            variant={todo.completed ? "success" : "secondary"}
                          >
                            {todo.completed ? 'Completed' : 'Pending'}
                          </Badge>
                          <button 
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            aria-label="More options"
                          >
                            <MoreHorizontal className="w-5 h-5 text-neutral-600" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Add new reminder */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-feedback-50 rounded-xl border border-dashed border-feedback-200 gap-4 sm:gap-0 transition-all duration-200 hover:bg-feedback-100 hover:border-feedback-300 cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <Plus className="w-6 h-6 text-neutral-700 transition-transform duration-200 group-hover:scale-110" />
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
              </section>
            </main>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </PageLayout>
  );
}
