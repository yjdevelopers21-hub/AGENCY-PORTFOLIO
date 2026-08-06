import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlightText?: string;
  description?: string;
  actionHref?: string;
  actionText?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  highlightText,
  description,
  actionHref,
  actionText,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16',
        align === 'center' && 'md:flex-col md:items-center text-center',
        className
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && <Badge className="mb-4">{eyebrow}</Badge>}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
          {title}{' '}
          {highlightText && (
            <span className="purple-gradient-text">{highlightText}</span>
          )}
        </h2>
        {description && (
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionHref && actionText && (
        <div className="shrink-0">
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:text-purple-600 hover:border-purple-200 transition-all duration-200 group"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
}
