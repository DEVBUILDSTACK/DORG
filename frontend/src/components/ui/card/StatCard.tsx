"use client";

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card } from './Card';

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: number;
  icon?: ReactNode;
}

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, change, icon, ...props }, ref) => {
    return (
      <Card ref={ref} variant="elevated" hoverable className={cn('', className)} {...props}>
        <div className="flex items-start justify-between mb-4">
          <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">{label}</span>
          {icon && <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0A4A7A]">{icon}</div>}
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-2 tabular-nums">
          {value}
        </div>
        {change !== undefined && (
          <div className={cn('text-sm font-medium flex items-center gap-1', change >= 0 ? 'text-green-600' : 'text-red-600')}>
            <span>{change >= 0 ? '↑' : '↓'}</span>
            <span className="tabular-nums">{Math.abs(change)}%</span>
          </div>
        )}
      </Card>
    );
  }
);

StatCard.displayName = 'StatCard';

export { StatCard };