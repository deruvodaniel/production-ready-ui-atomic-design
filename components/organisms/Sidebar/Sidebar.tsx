'use client';

import React from 'react';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Badge } from '@/components/atoms/Badge/Badge';
import { cn } from '@/lib/utils';
import { Home, Settings, Users, BarChart3, FileText } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/molecules/Accordion/Accordion';
import styles from './Sidebar.module.css';

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: {
    text: string;
    variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  };
  children?: SidebarItem[];
}

export interface SidebarProps {
  items: SidebarItem[];
  currentPath?: string;
  collapsed?: boolean;
  className?: string;
  disableItemLinks?: boolean; // items are not clickable (component gallery)
}

const defaultItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: <Home />,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: <BarChart3 />,
    badge: { text: 'New', variant: 'primary' },
  },
  {
    id: 'users',
    label: 'Users',
    href: '/users',
    icon: <Users />,
    children: [
      { id: 'all-users', label: 'All Users', href: '/users' },
      { id: 'user-roles', label: 'Roles', href: '/users/roles' },
      { id: 'user-permissions', label: 'Permissions', href: '/users/permissions' },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    href: '/content',
    icon: <FileText />,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: <Settings />,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  items = defaultItems,
  currentPath = '/',
  collapsed = false,
  className,
  disableItemLinks = true,
}) => {
  const isActive = (href: string) => currentPath === href;

  return (
    <aside
      className={cn(styles.sidebar, collapsed && styles.sidebarCollapsed, className)}
      aria-label="Main navigation"
    >
      <nav className={styles.navigation} role="navigation">
        <Accordion type="multiple" className={styles.list}>
          {items.map(item => {
            const hasChildren = item.children && item.children.length > 0;
            const active = isActive(item.href);
            if (hasChildren) {
              return (
                <AccordionItem key={item.id} value={item.id} className={styles.listItem}>
                  <AccordionTrigger
                    className={cn(
                      styles.item,
                      active && styles.active,
                      collapsed && styles.collapsed
                    )}
                  >
                    {item.icon && (
                      <span className={styles.icon} aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    {!collapsed && (
                      <>
                        <Typography variant="caption" weight="medium" className={styles.label}>
                          {item.label}
                        </Typography>
                        {item.badge && (
                          <Badge variant={item.badge.variant} size="sm" className={styles.badge}>
                            {item.badge.text}
                          </Badge>
                        )}
                      </>
                    )}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className={styles.subList} role="list">
                      {item.children!.map(child => (
                        <li key={child.id} className={styles.listItem}>
                          <div
                            className={cn(
                              styles.item,
                              styles.subItem,
                              isActive(child.href) && styles.active
                            )}
                            role="button"
                            tabIndex={0}
                          >
                            {child.icon && (
                              <span className={styles.icon} aria-hidden="true">
                                {child.icon}
                              </span>
                            )}
                            {!collapsed && (
                              <Typography
                                variant="caption"
                                weight="medium"
                                className={styles.label}
                              >
                                {child.label}
                              </Typography>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            }
            return (
              <div key={item.id} className={styles.listItem}>
                <div
                  className={cn(styles.item, active && styles.active)}
                  role={disableItemLinks ? 'button' : undefined}
                  tabIndex={disableItemLinks ? 0 : -1}
                >
                  {item.icon && (
                    <span className={styles.icon} aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  {!collapsed && (
                    <Typography variant="caption" weight="medium" className={styles.label}>
                      {item.label}
                    </Typography>
                  )}
                </div>
              </div>
            );
          })}
        </Accordion>
      </nav>
    </aside>
  );
};
