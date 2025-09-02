'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/atoms/Button/Button';
import styles from './Modal.module.css';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  primaryAction?: { label: string; onClick: () => void; disabled?: boolean };
  secondaryAction?: { label: string; onClick: () => void; disabled?: boolean };
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.content} aria-modal="true" role="dialog">
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle className={styles.title}>{title}</DialogTitle>}
            {description && (
              <DialogDescription className={styles.description}>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {children && <div className={styles.body}>{children}</div>}
        {(primaryAction || secondaryAction) && (
          <DialogFooter className={styles.footer}>
            {secondaryAction && (
              <Button variant="outline" onClick={secondaryAction.onClick} disabled={secondaryAction.disabled}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button onClick={primaryAction.onClick} disabled={primaryAction.disabled}>
                {primaryAction.label}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
