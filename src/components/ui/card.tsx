import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({
  children,
  className,
  hoverEffect = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-100 p-6 md:p-8 bhoot-card-shadow transition-all duration-300',
        hoverEffect && 'bhoot-card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
