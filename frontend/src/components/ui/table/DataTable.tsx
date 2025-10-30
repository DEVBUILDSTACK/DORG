"use client";

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  header: string;
  accessor: (item: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
  numeric?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export function DataTable<T>({ data, columns, className }: DataTableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-xl border border-gray-200', className)}>
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200',
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right'
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    'px-6 py-4 text-sm text-gray-900',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.numeric && 'font-mono'
                  )}
                >
                  {column.accessor(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}