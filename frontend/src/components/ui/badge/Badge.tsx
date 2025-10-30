"use client";

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium',
          variant === 'success' && 'bg-green-100 text-green-700',
          variant === 'warning' && 'bg-yellow-100 text-yellow-700',
          variant === 'error' && 'bg-red-100 text-red-700',
          variant === 'info' && 'bg-blue-100 text-blue-700',
          variant === 'default' && 'bg-gray-100 text-gray-700',
          size === 'sm' && 'px-2 py-0.5 text-xs',
          size === 'md' && 'px-2.5 py-1 text-sm',
          size === 'lg' && 'px-3 py-1.5 text-base',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };