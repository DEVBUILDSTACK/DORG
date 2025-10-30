"use client";

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-250 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed relative',
          variant === 'primary' && 'bg-linear-to-r from-[#FF6B35] to-[#E65A2D] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
          variant === 'secondary' && 'bg-[#2E865F] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
          variant === 'outline' && 'border-2 border-[#FF6B35]/30 text-[#FF6B35] hover:border-[#FF6B35] hover:bg-[#FF6B35]/5',
          variant === 'ghost' && 'text-[#FF6B35] hover:bg-[#FF6B35]/10',
          size === 'sm' && 'h-9 px-4 text-sm',
          size === 'md' && 'h-12 px-6 text-base',
          size === 'lg' && 'h-14 px-8 text-lg',
          loading && 'text-transparent pointer-events-none',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-3 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
