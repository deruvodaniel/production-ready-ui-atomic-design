'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button/Button';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Dropdown } from '@/components/molecules/Dropdown/Dropdown';
import { useTheme } from '@/theme/theme-provider';
import { Moon, Sun, Settings, User, LogOut, Bell } from 'lucide-react';
import styles from './Header.module.css';

export interface HeaderProps {
  logo?: React.ReactNode;
  title?: string;
  navigation?: { label: string; href: string }[];
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
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  title = 'UI Starter',
  navigation = [],
  showThemeToggle = true,
  showSettingsButton = true,
  onSettingsClick,
  user,
  showNotifications = false,
  notificationCount = 0,
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
        {/* Logo and Title */}
        <div className={styles.brand}>
          {logo && <div className={styles.logo}>{logo}</div>}
          <Typography variant="h5" weight="bold" color="default">
            {title}
          </Typography>
        </div>

        {/* Navigation */}
        {navigation.length > 0 && (
          <nav className={styles.navigation} role="navigation" aria-label="Main navigation">
            <ul className={styles.navigationList}>
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(item.href);
                    }}
                    className={styles.navigationLink}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          {showNotifications && (
            <div className={styles.notificationWrapper}>
              <Button
                variant="ghost"
                size="sm"
                aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount})` : ''}`}
              >
                <Bell />
              </Button>
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
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettingsClick}
              aria-label="Open settings"
            >
              <Settings />
            </Button>
          )}
          
          {user && (
            <div className={styles.userMenu}>
              <Dropdown
                items={userMenuItems}
                placeholder={
                  <div className={styles.userTrigger}>
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      fallback={user.name.charAt(0)}
                      size="sm"
                    />
                    <span className={styles.userName}>{user.name}</span>
                  </div>
                }
                onSelect={(item) => {
                  if (item.value === 'profile') {
                    router.push('/profile');
                  } else if (item.value === 'settings') {
                    router.push('/settings');
                  } else if (item.value === 'logout') {
                    // Handle logout
                    console.log('Logout clicked');
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};