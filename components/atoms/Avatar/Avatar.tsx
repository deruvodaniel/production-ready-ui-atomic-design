'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import styles from './Avatar.module.css';

const avatarVariants = cva(styles.avatar, {
  variants: {
    size: {
      xs: styles.xs,
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
      xl: styles.xl,
      '2xl': styles['2xl'],
    },
    variant: {
      circular: styles.circular,
      rounded: styles.rounded,
      square: styles.square,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'circular',
  },
});

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  showFallback?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  showFallback = true,
  size,
  variant,
  className,
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const showImage = src && !imageError;
  const showFallbackContent = !showImage && showFallback;

  return (
    <div
      className={cn(avatarVariants({ size, variant, className }))}
      {...props}
    >
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || 'Avatar'}
          className={cn(styles.image, !imageLoaded && styles.loading)}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}
      
      {showFallbackContent && (
        <div className={styles.fallback}>
          {fallback ? (
            <span className={styles.fallbackText}>{fallback}</span>
          ) : (
            <User className={styles.fallbackIcon} />
          )}
        </div>
      )}
    </div>
  );
};