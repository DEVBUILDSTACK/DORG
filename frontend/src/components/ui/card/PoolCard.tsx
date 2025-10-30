"use client";

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Card } from './Card';

export interface PoolCardProps extends HTMLAttributes<HTMLDivElement> {
  poolName: string;
  apy: number;
  tvl: string;
  status?: 'active' | 'inactive';
}

const PoolCard = forwardRef<HTMLDivElement, PoolCardProps>(
  ({ className, poolName, apy, tvl, status = 'active', ...props }, ref) => {
    return (
      <Card ref={ref} variant="elevated" hoverable className={cn('', className)} {...props}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{poolName}</h3>
            <span className={cn('text-xs font-medium px-2 py-1 rounded-full', status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600')}>
              {status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">APY</div>
            <div className="text-2xl font-bold text-[#0A4A7A] tabular-nums">
              {apy}%
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">TVL</div>
            <div className="text-2xl font-bold text-gray-900 tabular-nums">
              {tvl}
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

PoolCard.displayName = 'PoolCard';

export { PoolCard };