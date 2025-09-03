'use client';

import React from 'react';
import { Card } from '@/components/molecules/Card/Card';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Users,
  Target,
  Clock,
  Star,
  MessageSquare,
  CheckCircle,
  Info,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<any>> = {
  Users,
  Target,
  TrendingUp,
  Clock,
  Star,
  MessageSquare,
  CheckCircle,
  Info,
  AlertCircle,
  Calendar,
};

// Metric Card Component
export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    period: string;
  };
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'orange';
  description?: string;
  className?: string;
}

export const AdminMetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
  description,
  className = '',
}) => {
  const IconComponent = iconMap[icon];
  const isPositive = change?.direction === 'up';
  const isNegative = change?.direction === 'down';

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-100 text-green-600 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    red: 'bg-red-100 text-red-600 border-red-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
  };

  return (
    <Card className={`p-6 transition-all duration-200 hover:shadow-lg ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
              {IconComponent && <IconComponent className="w-5 h-5" />}
            </div>
            <Typography variant="body" color="muted" className="text-sm">
              {title}
            </Typography>
          </div>
          <Typography variant="h3" weight="bold" className="mb-2">
            {value}
          </Typography>
          {change && (
            <div className="flex items-center gap-2">
              {isPositive && <ArrowUp className="w-4 h-4 text-green-500" />}
              {isNegative && <ArrowDown className="w-4 h-4 text-red-500" />}
              <Typography
                variant="caption"
                className={
                  isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
                }
              >
                {change.value}% {change.period}
              </Typography>
            </div>
          )}
          {description && (
            <Typography variant="caption" color="muted" className="mt-1">
              {description}
            </Typography>
          )}
        </div>
      </div>
    </Card>
  );
};

// Activity Item Component
export interface ActivityItemProps {
  id: string;
  type: 'feedback' | 'review' | 'goal' | 'achievement' | 'system';
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  action: string;
  target?: string;
  timestamp: Date;
  onClick?: () => void;
  className?: string;
}

export const AdminActivityItem: React.FC<ActivityItemProps> = ({
  type,
  user,
  action,
  target,
  timestamp,
  onClick,
  className = '',
}) => {
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

  const ActivityIcon = getActivityIcon(type);
  const timeAgo = Date.now() - timestamp.getTime();
  const hours = Math.floor(timeAgo / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  const formatTimeAgo = () => {
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <Avatar
        src={user.avatar}
        fallback={user.name
          .split(' ')
          .map(n => n[0])
          .join('')}
        size="sm"
        className="flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <ActivityIcon className={`w-4 h-4 ${getActivityColor(type)}`} />
          <Typography variant="body" className="text-sm">
            <span className="font-semibold">{user.name}</span> {action}
            {target && <span className="text-gray-600"> - {target}</span>}
          </Typography>
        </div>
        <Typography variant="caption" color="muted">
          {formatTimeAgo()}
        </Typography>
      </div>
    </div>
  );
};

// Quick Action Card Component
export interface QuickActionProps {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
  priority?: 'high' | 'medium' | 'low';
  onClick?: () => void;
  className?: string;
}

export const AdminQuickAction: React.FC<QuickActionProps> = ({
  title,
  description,
  href,
  icon,
  color,
  priority,
  onClick,
  className = '',
}) => {
  const IconComponent = iconMap[icon];

  const content = (
    <Card
      className={`p-6 h-full transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer group ${className}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-lg bg-${color}-100 text-${color}-600 group-hover:scale-110 transition-transform duration-200`}
        >
          {IconComponent && <IconComponent className="w-6 h-6" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Typography
              variant="h6"
              weight="bold"
              className="group-hover:text-blue-600 transition-colors duration-200"
            >
              {title}
            </Typography>
            {priority === 'high' && (
              <Badge variant="error" size="sm">
                High
              </Badge>
            )}
          </div>
          <Typography variant="body" color="muted" className="text-sm">
            {description}
          </Typography>
        </div>
      </div>
    </Card>
  );

  if (onClick) {
    return <div onClick={onClick}>{content}</div>;
  }

  return <Link href={href}>{content}</Link>;
};

// Team Member Card Component
export interface TeamMemberCardProps {
  employee: Employee;
  onClick?: () => void;
  showPerformance?: boolean;
  showProject?: boolean;
  className?: string;
}

export const AdminTeamMemberCard: React.FC<TeamMemberCardProps> = ({
  employee,
  onClick,
  showPerformance = false,
  showProject = false,
  className = '',
}) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Available':
        return 'success';
      case 'On Leave':
        return 'warning';
      case 'Busy':
        return 'error';
      default:
        return 'secondary';
    }
  };

  const isRecentlyActive = employee.lastActivity
    ? new Date() - employee.lastActivity < 24 * 60 * 60 * 1000
    : false;

  const content = (
    <Card
      className={`p-6 transition-all duration-300 cursor-pointer relative overflow-hidden group hover:shadow-xl ${className}`}
      role="article"
      aria-label={`Team member ${employee.name}, ${employee.role}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <Avatar
            src={employee.avatar}
            fallback={employee.name
              .split(' ')
              .map(n => n[0])
              .join('')}
            size="lg"
            className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          />
          {isRecentlyActive && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <Typography
            variant="h5"
            weight="bold"
            className="text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors"
          >
            {employee.name}
          </Typography>
          <Typography variant="body" className="text-gray-600 mb-2 truncate">
            {employee.role}
          </Typography>
          <Badge variant={getStatusVariant(employee.status)} size="sm" className="inline-flex">
            {employee.status}
          </Badge>
        </div>
      </div>

      {showPerformance && employee.performanceScore && (
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <Typography variant="caption" className="text-gray-500">
              Performance Score
            </Typography>
            <Typography variant="caption" className="font-semibold">
              {employee.performanceScore}%
            </Typography>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                employee.performanceScore >= 90
                  ? 'bg-green-500'
                  : employee.performanceScore >= 80
                    ? 'bg-blue-500'
                    : employee.performanceScore >= 70
                      ? 'bg-yellow-500'
                      : 'bg-orange-500'
              }`}
              style={{ width: `${employee.performanceScore}%` }}
            />
          </div>
        </div>
      )}

      {showProject && employee.currentProject && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Typography variant="caption" className="text-gray-500 block mb-1">
            Current Project
          </Typography>
          <Typography variant="body" className="text-gray-900 font-medium truncate">
            {employee.currentProject}
          </Typography>
        </div>
      )}

      {employee.team && (
        <div className="absolute bottom-4 right-4">
          <Typography variant="caption" className="text-gray-500">
            {employee.team}
          </Typography>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );

  if (onClick) {
    return <div onClick={onClick}>{content}</div>;
  }

  return <Link href={`/admin/profile/${employee.id}`}>{content}</Link>;
};

// Page Header Component
export interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
  className?: string;
}

export const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className = '',
}) => (
  <header className={`bg-white border-b border-gray-200 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          {breadcrumbs && (
            <nav className="flex items-center gap-2 mb-2">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-900 font-medium">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && <span className="text-gray-400">/</span>}
                </React.Fragment>
              ))}
            </nav>
          )}
          <Typography variant="h2" weight="bold" className="text-gray-900 mb-2">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body" className="text-gray-600">
              {subtitle}
            </Typography>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  </header>
);

// Section Component
export interface AdminSectionProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const AdminSection: React.FC<AdminSectionProps> = ({
  title,
  subtitle,
  action,
  children,
  className = '',
}) => (
  <section className={`mb-8 ${className}`}>
    {(title || action) && (
      <div className="flex items-center justify-between mb-6">
        <div>
          {title && (
            <Typography variant="h4" weight="bold" className="mb-2">
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body" color="muted">
              {subtitle}
            </Typography>
          )}
        </div>
        {action}
      </div>
    )}
    {children}
  </section>
);
