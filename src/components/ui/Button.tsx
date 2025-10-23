"use client";

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          
          // Variant styles
          variant === 'primary' && 'bg-foreground text-background hover:bg-foreground/90 hover:scale-105 hover:shadow-lg focus-visible:ring-foreground',
          variant === 'secondary' && 'bg-foreground/10 text-foreground hover:bg-foreground/20 hover:scale-[1.02] focus-visible:ring-foreground/50',
          variant === 'outline' && 'border-2 border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground hover:text-background hover:scale-[1.02] focus-visible:ring-foreground/50',
          
          // Size styles
          size === 'sm' && 'h-9 px-4 text-sm',
          size === 'md' && 'h-12 px-6 text-base',
          size === 'lg' && 'h-14 px-8 text-lg',
          
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
