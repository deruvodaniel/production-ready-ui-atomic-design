'use client';

import React from 'react';
import { Header, HeaderProps } from '@/components/organisms/Header/Header';
import styles from './PageLayout.module.css';

export interface PageLayoutProps {
  children: React.ReactNode;
  header?: HeaderProps;
  showHeader?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  header,
  showHeader = true,
  maxWidth = 'xl',
}) => {
  return (
    <div className={styles.layout}>
      {showHeader && <Header {...header} />}
      
      <main 
        className={styles.main}
        role="main"
        id="main-content"
        tabIndex={-1}
      >
        <div className={styles[`maxWidth${maxWidth.charAt(0).toUpperCase() + maxWidth.slice(1)}`]}>
          {children}
        </div>
      </main>
    </div>
  );
};
