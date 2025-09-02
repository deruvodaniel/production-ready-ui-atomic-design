'use client';

import React from 'react';
import { PageLayout } from '@/components/templates/PageLayout/PageLayout';
import { Sidebar, type SidebarItem } from '@/components/organisms/Sidebar/Sidebar';

export interface DocsTemplateProps {
  title?: string;
  sidebarItems: SidebarItem[];
  children: React.ReactNode;
}

export const DocsTemplate: React.FC<DocsTemplateProps> = ({
  title = 'Design System',
  sidebarItems,
  children,
}) => {
  return (
    <PageLayout
      header={{
        title,
        navigation: [
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Storybook', href: '/storybook' },
        ],
      }}
      maxWidth="full"
    >
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar
          items={sidebarItems}
          currentPath="/components/atoms/button"
          className="sticky top-0 h-[calc(100vh-4rem)]"
          disableItemLinks
        />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </PageLayout>
  );
};
