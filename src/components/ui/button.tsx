import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
}

export function Button({
  variant = 'dark',
  size = 'md',
  showArrow = false,
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    dark: 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg shadow-slate-900/10',
    primary:
      'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg shadow-purple-600/20',
    outline:
      'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-xs',
    secondary:
      'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/60',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-base px-8 py-4 gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
      )}
    </button>
  );
}
