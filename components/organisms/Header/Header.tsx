'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button/Button';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Dropdown } from '@/components/molecules/Dropdown/Dropdown';
import { useTheme } from '@/theme/theme-provider';
import { Moon, Sun, Settings, User, LogOut, Bell, Bot } from 'lucide-react';
import styles from './Header.module.css';
import { cn } from '@/lib/utils';

export interface HeaderProps {
  logo?: React.ReactNode;
  title?: string;
  navigation?: { label: string; href: string; active?: boolean }[];
  showThemeToggle?: boolean;
  showSettingsButton?: boolean;
  onSettingsClick?: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  showNotifications?: boolean;
  notificationCount?: number;
  showSonyAssistant?: boolean;
  onSonyAssistantClick?: () => void;
  rightContent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  title = 'UI Starter',
  navigation = [],
  showThemeToggle = false,
  showSettingsButton = false,
  onSettingsClick,
  user,
  showNotifications = true,
  notificationCount = 0,
  showSonyAssistant = true,
  onSonyAssistantClick,
  rightContent,
}) => {
  const { isDark, toggleDarkMode } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const userMenuItems = [
    {
      id: 'profile',
      label: 'Profile',
      value: 'profile',
      icon: <User className="w-4 h-4" />,
    },
    {
      id: 'settings',
      label: 'Settings',
      value: 'settings',
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: 'logout',
      label: 'Sign out',
      value: 'logout',
      icon: <LogOut className="w-4 h-4" />,
    },
  ];

  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoSection}>
          {logo && <div className={styles.logo}>{logo}</div>}
        </div>

        {/* Navigation Pills */}
        {navigation.length > 0 && (
          <nav className={styles.navigation} role="navigation" aria-label="Main navigation">
            <div className={styles.navigationContainer}>
              {navigation.map(item => {
                const isActive = item.active || pathname === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className={cn(styles.navigationPill, isActive && styles.navigationPillActive)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Typography
                      variant="body"
                      weight="semibold"
                      className={cn(
                        styles.navigationLabel,
                        isActive && styles.navigationLabelActive
                      )}
                    >
                      {item.label}
                    </Typography>
                  </button>
                );
              })}
            </div>
          </nav>
        )}

        {/* Right Actions */}
        <div className={styles.actions}>
          {showSonyAssistant && (
            <button
              className={styles.sonyAssistant}
              onClick={onSonyAssistantClick}
              aria-label="Open Sony AI Assistant chat"
              type="button"
            >
              <div className={styles.assistantIcon}>
                <Bot className={styles.botIcon} />
              </div>
              <Typography variant="body" weight="semibold" className={styles.assistantText}>
                Sony Assistant
              </Typography>
            </button>
          )}

          {showNotifications && (
            <div className={styles.notificationWrapper}>
              <div className={styles.notificationIcon}>
                <Bell className={styles.bellIcon} />
              </div>
              {notificationCount > 0 && (
                <span className={styles.notificationBadge}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </div>
          )}

          {showThemeToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun /> : <Moon />}
            </Button>
          )}

          {showSettingsButton && (
            <Button variant="ghost" size="sm" onClick={onSettingsClick} aria-label="Open settings">
              <Settings />
            </Button>
          )}

          {user && (
            <div className={styles.userAvatar}>
              <Avatar src={user.avatar} alt={user.name} fallback={user.name.charAt(0)} size="md" />
            </div>
          )}

          {rightContent}
        </div>
      </div>
    </header>
  );
};
