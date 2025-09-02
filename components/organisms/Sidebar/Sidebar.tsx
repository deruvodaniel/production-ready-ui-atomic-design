'use client';

import React from 'react';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import { cn } from '@/lib/utils';
import { ChevronRight, Home, Settings, Users, BarChart3, FileText } from 'lucide-react';
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
  onToggle?: () => void;
  className?: string;
  disableItemLinks?: boolean; // when true, items are not clickable (used in component gallery)
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
  onToggle,
  className,
  disableItemLinks = false,
}) => {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) newSet.delete(itemId);
      else newSet.add(itemId);
      return newSet;
    });
  };

  const isActive = (href: string) => currentPath === href;
  const isExpanded = (itemId: string) => expandedItems.has(itemId);

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const active = isActive(item.href);
    const expanded = isExpanded(item.id);

    const ItemWrapper: React.ElementType = disableItemLinks ? 'div' : 'a';
    const itemWrapperProps = disableItemLinks
      ? { role: 'button', tabIndex: -1 }
      : { href: item.href };

    return (
      <li key={item.id} className={styles.listItem}>
        <div className={styles.itemContainer}>
          <ItemWrapper
            {...itemWrapperProps}
            className={cn(
              styles.item,
              level > 0 && styles.subItem,
              active && styles.active,
              collapsed && styles.collapsed
            )}
            aria-current={active ? 'page' : undefined}
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
          </ItemWrapper>

          {hasChildren && !collapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleExpanded(item.id)}
              className={styles.expandButton}
              aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.label}`}
              aria-expanded={expanded}
            >
              <ChevronRight className={cn(styles.expandIcon, expanded && styles.expandIconRotated)} />
            </Button>
          )}
        </div>

        {hasChildren && !collapsed && expanded && (
          <ul className={styles.subList} role="list">
            {item.children!.map(child => renderSidebarItem(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside className={cn(styles.sidebar, collapsed && styles.sidebarCollapsed, className)} aria-label="Main navigation">
      <nav className={styles.navigation} role="navigation">
        <ul className={styles.list} role="list">
          {items.map(item => renderSidebarItem(item))}
        </ul>
      </nav>
    </aside>
  );
};
