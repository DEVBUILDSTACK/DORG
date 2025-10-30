"use client";

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', width, height, ...props }, ref) => {
    const widthValue = width || (variant === 'circular' ? height : undefined);
    
    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 bg-size-[200%_100%]',
          variant === 'text' && 'h-4 rounded',
          variant === 'circular' && 'rounded-full',
          variant === 'rectangular' && 'rounded-lg',
          widthValue && `w-[${widthValue}]`,
          height && `h-[${height}]`,
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };