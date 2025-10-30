"use client";

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant = 'default', hoverable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl p-6 transition-all duration-300',
          variant === 'default' && 'bg-white border border-gray-200',
          variant === 'elevated' && 'bg-white shadow-md',
          variant === 'outlined' && 'bg-transparent border-2 border-gray-300',
          hoverable && 'hover:-translate-y-1 hover:shadow-lg cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };