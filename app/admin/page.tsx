'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/molecules/Card/Card';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import {
  Users,
  Target,
  TrendingUp,
  Clock,
  Star,
  Calendar,
  MessageSquare,
  BarChart3,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
  Plus,
} from 'lucide-react';
import {
  getDashboardData,
  getCurrentUser,
  getRecentActivity,
  type DashboardMetric,
  type ActivityItem,
  type CurrentUser,
} from '@/data/config';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { AdminLayout } from '@/components/templates/AdminLayout/AdminLayout';
import Link from 'next/link';

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<any>> = {
  Users,
  Target,
  TrendingUp,
  Clock,
  Star,
  Calendar,
  MessageSquare,
  BarChart3,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
};

// Metric Card Component
const MetricCard = ({ metric }: { metric: DashboardMetric }) => {
  const IconComponent = iconMap[metric.icon];
  const isPositive = metric.change.direction === 'up';
  const isNegative = metric.change.direction === 'down';

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-100 text-green-600 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    red: 'bg-red-100 text-red-600 border-red-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
  };

  return (
    <Card className="p-6 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${colorClasses[metric.color]}`}>
              {IconComponent && <IconComponent className="w-5 h-5" />}
            </div>
            <Typography variant="body" color="muted" className="text-sm">
              {metric.title}
            </Typography>
          </div>
          <Typography variant="h3" weight="bold" className="mb-2">
            {metric.value}
          </Typography>
          <div className="flex items-center gap-2">
            {isPositive && <ArrowUp className="w-4 h-4 text-green-500" />}
            {isNegative && <ArrowDown className="w-4 h-4 text-red-500" />}
            <Typography
              variant="caption"
              className={
                isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
              }
            >
              {metric.change.value}% {metric.change.period}
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Quick Action Card Component
const QuickActionCard = ({ action }: { action: any }) => {
  const IconComponent = iconMap[action.icon];

  return (
    <Link href={action.href}>
      <Card className="p-6 h-full transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer group">
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-lg bg-${action.color}-100 text-${action.color}-600 group-hover:scale-110 transition-transform duration-200`}
          >
            {IconComponent && <IconComponent className="w-6 h-6" />}
          </div>
          <div className="flex-1">
            <Typography
              variant="h6"
              weight="bold"
              className="mb-2 group-hover:text-blue-600 transition-colors duration-200"
            >
              {action.title}
            </Typography>
            <Typography variant="body" color="muted" className="text-sm">
              {action.description}
            </Typography>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
        </div>
      </Card>
    </Link>
  );
};

// Activity Item Component
const ActivityItemComponent = ({ activity }: { activity: ActivityItem }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'feedback':
        return MessageSquare;
      case 'review':
        return Star;
      case 'goal':
        return Target;
      case 'achievement':
        return CheckCircle;
      case 'system':
        return Info;
      default:
        return Info;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'feedback':
        return 'text-blue-500';
      case 'review':
        return 'text-purple-500';
      case 'goal':
        return 'text-green-500';
      case 'achievement':
        return 'text-yellow-500';
      case 'system':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const ActivityIcon = getActivityIcon(activity.type);
  const timeAgo = new Date().getTime() - activity.timestamp.getTime();
  const hours = Math.floor(timeAgo / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
      <Avatar
        src={activity.user.avatar}
        fallback={activity.user.name
          .split(' ')
          .map(n => n[0])
          .join('')}
        size="sm"
        className="flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <ActivityIcon className={`w-4 h-4 ${getActivityColor(activity.type)}`} />
          <Typography variant="body" className="text-sm">
            <span className="font-semibold">{activity.user.name}</span> {activity.action}
            {activity.target && <span className="text-gray-600"> - {activity.target}</span>}
          </Typography>
        </div>
        <Typography variant="caption" color="muted">
          {days > 0
            ? `${days} day${days > 1 ? 's' : ''} ago`
            : hours > 0
              ? `${hours} hour${hours > 1 ? 's' : ''} ago`
              : 'Just now'}
        </Typography>
      </div>
    </div>
  );
};

// Performance Chart Component
const PerformanceChart = () => {
  const data = [
    { month: 'Jul', score: 82 },
    { month: 'Aug', score: 85 },
    { month: 'Sep', score: 83 },
    { month: 'Oct', score: 87 },
    { month: 'Nov', score: 89 },
    { month: 'Dec', score: 91 },
  ];

  return (
    <div className="h-64 w-full">
      <ChartContainer
        config={{ score: { label: 'Performance', color: 'hsl(var(--chart-1))' } }}
        className="w-full h-full"
      >
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

// Team Distribution Chart
const TeamDistributionChart = () => {
  const data = [
    { name: 'Available', value: 5, color: '#10b981' },
    { name: 'PR In Progress', value: 3, color: '#f59e0b' },
    { name: 'On Leave', value: 0, color: '#ef4444' },
  ];

  return (
    <div className="h-48 w-full">
      <ChartContainer config={{}} className="w-full h-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0];
                  return (
                    <div className="bg-white p-3 border rounded-lg shadow-lg">
                      <p className="font-medium">{data.payload.name}</p>
                      <p className="text-sm text-gray-600">{data.value} members</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load dashboard data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [dashboard, user, activity] = await Promise.all([
          getDashboardData(),
          getCurrentUser(),
          getRecentActivity(5),
        ]);

        setDashboardData(dashboard);
        setCurrentUser(user);
        setRecentActivity(activity);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <AdminLayout currentPage="home">
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-600 mx-auto"></div>
            <Typography variant="body" className="mt-4 text-gray-600">
              Loading dashboard...
            </Typography>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout currentPage="home">
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <Typography variant="h5" className="text-red-600 mb-2">
              Error loading dashboard
            </Typography>
            <Typography variant="body" className="text-gray-600">
              {error}
            </Typography>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="home">
      <div className="bg-gray-50 min-h-screen">
        {/* Welcome Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <Typography variant="h2" weight="bold" className="text-gray-900 mb-2">
                  Welcome back, {currentUser?.name.split(' ')[0]}! 👋
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  Here's what's happening with your team today
                </Typography>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule 1:1
                </Button>
                <Button variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Review
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Key Metrics */}
          <section className="mb-8">
            <Typography variant="h4" weight="bold" className="mb-6">
              Key Metrics
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardData.metrics.map((metric: DashboardMetric) => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </div>
          </section>

          {/* Charts and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Performance Trend */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <Typography variant="h5" weight="bold">
                    Team Performance Trend
                  </Typography>
                  <Badge variant="success">+5% this quarter</Badge>
                </div>
                <PerformanceChart />
              </Card>
            </div>

            {/* Team Distribution */}
            <div>
              <Card className="p-6">
                <Typography variant="h5" weight="bold" className="mb-6">
                  Team Status
                </Typography>
                <TeamDistributionChart />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Available</span>
                    </div>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>In Progress</span>
                    </div>
                    <span className="font-semibold">3</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <section className="mb-8">
            <Typography variant="h4" weight="bold" className="mb-6">
              Quick Actions
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardData.quickActions.map((action: any) => (
                <QuickActionCard key={action.id} action={action} />
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Typography variant="h4" weight="bold">
                  Recent Activity
                </Typography>
                <Link href="/admin/feedback">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-2">
                {recentActivity.map(activity => (
                  <ActivityItemComponent key={activity.id} activity={activity} />
                ))}
              </div>
            </Card>
          </section>
        </main>
      </div>
    </AdminLayout>
  );
}
