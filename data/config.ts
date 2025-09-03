// Centralized configuration for the entire admin system
// Simulates API responses and provides all data for the application

import { employeesData, Employee } from './employees';

// Application configuration
export interface AppConfig {
  app: {
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
  };
  company: {
    name: string;
    logo: {
      svg: string;
      alt: string;
    };
  };
  navigation: {
    main: NavigationItem[];
    admin: NavigationItem[];
  };
  dashboard: {
    metrics: DashboardMetric[];
    quickActions: QuickAction[];
    recentActivity: ActivityItem[];
  };
  team: {
    overview: TeamOverview;
    goals: TeamGoals;
    performance: PerformanceData;
  };
  users: {
    currentUser: CurrentUser;
    employees: Employee[];
  };
  notifications: NotificationItem[];
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
  icon?: string;
  description?: string;
}

export interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  change: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    period: string;
  };
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  description?: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ActivityItem {
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
  metadata?: Record<string, any>;
}

export interface TeamOverview {
  totalMembers: number;
  activeMembers: number;
  newJoiners: number;
  avgPerformance: number;
  teamSatisfaction: number;
  retentionRate: number;
}

export interface TeamGoals {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
  categories: {
    individual: number;
    team: number;
    company: number;
  };
}

export interface PerformanceData {
  overall: {
    score: number;
    trend: 'up' | 'down' | 'stable';
    period: string;
  };
  byRole: Array<{
    role: string;
    score: number;
    count: number;
  }>;
  distribution: Array<{
    range: string;
    count: number;
    percentage: number;
  }>;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  permissions: string[];
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
    language: string;
  };
}

export interface NotificationItem {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

// Simulated API delay
export const simulateAPICall = <T>(data: T, delay: number = 800): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delay);
  });
};

// Main configuration object
export const appConfig: AppConfig = {
  app: {
    name: 'Sony Interactive Entertainment',
    version: '2.1.0',
    environment: 'production',
  },
  company: {
    name: 'Sony Interactive Entertainment',
    logo: {
      svg: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30.0005" width="42.4264" height="42.4264" rx="4" transform="rotate(45 30.0005 0)" fill="#9498B8"/>
        <path opacity="0.8" d="M30.0269 30.052L40.6335 40.6586L30.0269 51.2652V30.052Z" fill="url(#paint0_linear_2023_23862)"/>
        <path opacity="0.8" d="M30.0269 8.83887L19.4203 19.4455L30.0269 30.0521V8.83887Z" fill="url(#paint1_linear_2023_23862)"/>
        <defs>
          <linearGradient id="paint0_linear_2023_23862" x1="30.053" y1="40.6586" x2="40.6596" y2="40.6586" gradientUnits="userSpaceOnUse">
            <stop stopOpacity="0"/>
            <stop offset="1"/>
          </linearGradient>
          <linearGradient id="paint1_linear_2023_23862" x1="19.4464" y1="19.4455" x2="30.053" y2="19.4455" gradientUnits="userSpaceOnUse">
            <stop/>
            <stop offset="1" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>`,
      alt: 'Sony Interactive Entertainment Logo',
    },
  },
  navigation: {
    main: [
      {
        id: 'home',
        label: 'Home',
        href: '/',
        active: true,
        description: 'Dashboard overview',
      },
      {
        id: 'team',
        label: 'My Team',
        href: '/admin/team',
        description: 'Team management and insights',
      },
      {
        id: 'game-changers',
        label: 'Game Changers',
        href: '/admin/game-changers',
        description: 'Performance evaluations',
      },
    ],
    admin: [
      {
        id: 'feedback',
        label: 'Feedback',
        href: '/admin/feedback',
        description: 'Feedback management',
      },
      {
        id: 'performance',
        label: 'Performance Reviews',
        href: '/admin/performance-review',
        description: 'Performance review system',
      },
      {
        id: 'analytics',
        label: 'Analytics',
        href: '/admin/analytics',
        description: 'Team analytics and insights',
      },
    ],
  },
  dashboard: {
    metrics: [
      {
        id: 'team-size',
        title: 'Team Members',
        value: employeesData.length,
        change: {
          value: 12,
          direction: 'up',
          period: 'this quarter',
        },
        icon: 'Users',
        color: 'blue',
        description: 'Total active team members',
      },
      {
        id: 'active-goals',
        title: 'Active Goals',
        value: 47,
        change: {
          value: 8,
          direction: 'up',
          period: 'this month',
        },
        icon: 'Target',
        color: 'green',
        description: 'Goals currently in progress',
      },
      {
        id: 'avg-performance',
        title: 'Avg Performance',
        value: '87%',
        change: {
          value: 5,
          direction: 'up',
          period: 'this quarter',
        },
        icon: 'TrendingUp',
        color: 'purple',
        description: 'Team average performance score',
      },
      {
        id: 'pending-reviews',
        title: 'Pending Reviews',
        value: 3,
        change: {
          value: 2,
          direction: 'down',
          period: 'this week',
        },
        icon: 'Clock',
        color: 'yellow',
        description: 'Performance reviews awaiting completion',
      },
    ],
    quickActions: [
      {
        id: 'start-review',
        title: 'Start Performance Review',
        description: 'Begin a new performance evaluation',
        href: '/admin/performance-review',
        icon: 'Star',
        color: 'blue',
        priority: 'high',
      },
      {
        id: 'schedule-1on1',
        title: 'Schedule 1:1 Meeting',
        description: 'Book time with team members',
        href: '/admin/meetings',
        icon: 'Calendar',
        color: 'green',
        priority: 'medium',
      },
      {
        id: 'give-feedback',
        title: 'Give Feedback',
        description: 'Provide feedback to team members',
        href: '/admin/feedback',
        icon: 'MessageSquare',
        color: 'purple',
        priority: 'medium',
      },
      {
        id: 'view-analytics',
        title: 'Team Analytics',
        description: 'Review team performance insights',
        href: '/admin/analytics',
        icon: 'BarChart3',
        color: 'orange',
        priority: 'low',
      },
    ],
    recentActivity: [
      {
        id: '1',
        type: 'feedback',
        user: {
          id: 'rachel-green',
          name: 'Rachel Green',
          avatar:
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        },
        action: 'completed her self-assessment',
        timestamp: new Date('2024-01-15T10:30:00'),
      },
      {
        id: '2',
        type: 'review',
        user: {
          id: 'julia-harvey',
          name: 'Julia Harvey',
          avatar:
            'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face',
        },
        action: 'submitted performance review',
        target: 'Q4 2024',
        timestamp: new Date('2024-01-14T15:45:00'),
      },
      {
        id: '3',
        type: 'goal',
        user: {
          id: 'jonah-smith',
          name: 'Jonah Smith',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        },
        action: 'achieved goal',
        target: 'Complete React 18 migration',
        timestamp: new Date('2024-01-13T09:15:00'),
      },
      {
        id: '4',
        type: 'achievement',
        user: {
          id: 'jim-andrada',
          name: 'Jim Andrada',
          avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        },
        action: 'earned certification',
        target: 'AWS Solutions Architect',
        timestamp: new Date('2024-01-12T14:20:00'),
      },
      {
        id: '5',
        type: 'system',
        user: {
          id: 'alex-ruiz',
          name: 'Alex Ruiz',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        },
        action: 'updated team objectives',
        target: 'Q1 2024 OKRs',
        timestamp: new Date('2024-01-11T11:00:00'),
      },
    ],
  },
  team: {
    overview: {
      totalMembers: employeesData.length,
      activeMembers: employeesData.filter(emp => emp.status === 'Available').length,
      newJoiners: employeesData.filter(
        emp => new Date(emp.joinDate) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
      ).length,
      avgPerformance: 87,
      teamSatisfaction: 4.2,
      retentionRate: 94,
    },
    goals: {
      total: 50,
      completed: 32,
      inProgress: 15,
      overdue: 3,
      categories: {
        individual: 30,
        team: 15,
        company: 5,
      },
    },
    performance: {
      overall: {
        score: 87,
        trend: 'up',
        period: 'Q4 2024',
      },
      byRole: [
        { role: 'Frontend Developer', score: 89, count: 5 },
        { role: 'Engineering Manager', score: 92, count: 1 },
        { role: 'Full Stack Developer', score: 85, count: 2 },
      ],
      distribution: [
        { range: '90-100', count: 3, percentage: 37.5 },
        { range: '80-89', count: 4, percentage: 50 },
        { range: '70-79', count: 1, percentage: 12.5 },
        { range: '60-69', count: 0, percentage: 0 },
      ],
    },
  },
  users: {
    currentUser: {
      id: 'alex-ruiz',
      name: 'Alex Ruiz',
      email: 'alex.ruiz@sie.com',
      role: 'Engineering Manager',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      permissions: ['admin', 'team-lead', 'performance-review'],
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en',
      },
    },
    employees: employeesData,
  },
  notifications: [
    {
      id: '1',
      type: 'warning',
      title: 'Performance Review Due',
      message: "Rachel Green's performance review is due in 2 days",
      timestamp: new Date('2024-01-15T09:00:00'),
      read: false,
      actionUrl: '/admin/performance-review/rachel-green',
      actionText: 'Start Review',
    },
    {
      id: '2',
      type: 'success',
      title: 'Goal Completed',
      message: 'Team has achieved 90% of Q4 objectives',
      timestamp: new Date('2024-01-14T16:30:00'),
      read: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'New Team Member',
      message: 'Welcome Jessica Wright to the team',
      timestamp: new Date('2024-01-13T08:00:00'),
      read: true,
    },
  ],
};

// API simulation functions
export const getAppConfig = () => simulateAPICall(appConfig);
export const getDashboardData = () => simulateAPICall(appConfig.dashboard);
export const getTeamData = () => simulateAPICall(appConfig.team);
export const getUserData = () => simulateAPICall(appConfig.users);
export const getNotifications = () => simulateAPICall(appConfig.notifications);
export const getCurrentUser = () => simulateAPICall(appConfig.users.currentUser);

// Utility functions
export const getNavigationForUser = (userRole: string) => {
  // Return navigation based on user permissions
  return simulateAPICall(appConfig.navigation);
};

export const getMetricsForDashboard = () => {
  return simulateAPICall(appConfig.dashboard.metrics);
};

export const getRecentActivity = (limit: number = 5) => {
  return simulateAPICall(appConfig.dashboard.recentActivity.slice(0, limit));
};
