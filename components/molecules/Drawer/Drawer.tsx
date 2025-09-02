'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import styles from './Drawer.module.css';

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
  side?: 'left' | 'right' | 'top' | 'bottom';
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onOpenChange,
  onClose,
  side = 'right',
  title,
  description,
  children,
}) => {
  const handleOpenChange = (next: boolean) => {
    if (!next) onClose?.();
    onOpenChange(next);
  };
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side={side} className={styles.content} role="dialog" aria-modal="true">
        {(title || description) && (
          <SheetHeader>
            {title && <SheetTitle className={styles.title}>{title}</SheetTitle>}
            {description && (
              <SheetDescription className={styles.description}>{description}</SheetDescription>
            )}
          </SheetHeader>
        )}
        <div className={styles.body}>{children}</div>
      </SheetContent>
    </Sheet>
  );
};
