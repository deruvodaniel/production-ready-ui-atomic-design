'use client';

import React from 'react';
import { PageLayout } from '@/components/templates/PageLayout/PageLayout';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Bot, Bell } from 'lucide-react';
import { getCurrentUser } from '@/data/config';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: 'home' | 'team' | 'game-changers' | 'feedback' | 'performance-review';
  showBackButton?: boolean;
  customHeader?: React.ReactNode;
  className?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  currentPage = 'home',
  showBackButton = false,
  customHeader,
  className = '',
}) => {
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  React.useEffect(() => {
    getCurrentUser().then(setCurrentUser);
  }, []);

  // Navigation configuration
  const getNavigationItems = () => [
    { 
      label: 'Home', 
      href: '/', 
      active: currentPage === 'home' 
    },
    { 
      label: 'My Team', 
      href: '/admin/team', 
      active: currentPage === 'team' 
    },
    { 
      label: 'Game Changers', 
      href: '/admin/game-changers', 
      active: currentPage === 'game-changers' 
    },
  ];

  // Company logo component
  const CompanyLogo = () => (
    <div className="w-15 h-15 bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-lg transform rotate-45 relative">
      <div className="absolute inset-2 bg-white rounded opacity-20" />
    </div>
  );

  // Right side header content
  const HeaderRightContent = () => (
    <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
      {/* Sony Assistant */}
      <div className="hidden sm:flex items-center gap-3 bg-neutral-200 rounded-full px-3 lg:px-4 py-2 transition-all duration-200 hover:bg-neutral-300">
        <div className="w-8 lg:w-10 h-8 lg:h-10 bg-neutral-600 rounded-full flex items-center justify-center">
          <Bot className="w-4 lg:w-6 h-4 lg:h-6 text-white" />
        </div>
        <span className="hidden lg:block text-neutral-600 font-semibold text-sm lg:text-base">
          Sony Assistant
        </span>
      </div>

      {/* Notifications */}
      <div className="relative">
        <div className="w-8 lg:w-10 h-8 lg:h-10 bg-neutral-100 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-neutral-200 cursor-pointer">
          <Bell className="w-4 lg:w-5 h-4 lg:h-5 text-neutral-800" />
        </div>
        {/* Notification badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-semibold">3</span>
        </div>
      </div>

      {/* User Avatar */}
      <Avatar 
        src={currentUser?.avatar || "/api/placeholder/48/48"} 
        fallback={currentUser?.name?.split(' ').map((n: string) => n[0]).join('') || "U"} 
        size="md"
        className="lg:w-12 lg:h-12 transition-transform duration-200 hover:scale-105"
      />
    </div>
  );

  return (
    <PageLayout
      header={{
        logo: <CompanyLogo />,
        title: '',
        navigation: getNavigationItems(),
        rightContent: <HeaderRightContent />,
        showSonyAssistant: true,
        showNotifications: true,
        notificationCount: 3,
        user: currentUser ? {
          name: currentUser.name,
          email: currentUser.email,
          avatar: currentUser.avatar
        } : undefined,
        showThemeToggle: false,
        showSettingsButton: false,
      }}
      className={className}
    >
      {customHeader}
      {children}
    </PageLayout>
  );
};

// Specific layout variations for common patterns
export const AdminDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AdminLayout currentPage="home">
    {children}
  </AdminLayout>
);

export const AdminTeamLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AdminLayout currentPage="team">
    {children}
  </AdminLayout>
);

export const AdminGameChangersLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AdminLayout currentPage="game-changers">
    {children}
  </AdminLayout>
);

export const AdminFeedbackLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AdminLayout currentPage="feedback">
    {children}
  </AdminLayout>
);

// Loading state component for admin pages
export const AdminLoadingState: React.FC<{ message?: string }> = ({ 
  message = "Loading..." 
}) => (
  <AdminLayout>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  </AdminLayout>
);

// Error state component for admin pages
export const AdminErrorState: React.FC<{ 
  error: string;
  onRetry?: () => void;
}> = ({ error, onRetry }) => (
  <AdminLayout>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  </AdminLayout>
);
