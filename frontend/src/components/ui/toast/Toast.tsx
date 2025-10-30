"use client";

import { HTMLAttributes, ReactNode, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  status?: 'success' | 'error' | 'warning' | 'pending';
  icon?: ReactNode;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export function Toast({
  className,
  title,
  message,
  status = 'pending',
  icon,
  onClose,
  autoClose = true,
  duration = 5000,
  ...props
}: ToastProps) {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const borderColors = {
    success: 'border-l-green-600',
    error: 'border-l-red-600',
    warning: 'border-l-yellow-600',
    pending: 'border-l-blue-600',
  };

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 min-w-80 max-w-md bg-white rounded-xl shadow-xl border-l-4 p-4 flex items-start gap-3 animate-slideIn z-50',
        borderColors[status],
        className
      )}
      {...props}
    >
      {icon && <div className="shrink-0 mt-0.5">{icon}</div>}
      <div className="flex-1 min-w-0">
        {title && <div className="text-sm font-semibold text-gray-900 mb-1">{title}</div>}
        <div className="text-sm text-gray-600">{message}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close notification">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}