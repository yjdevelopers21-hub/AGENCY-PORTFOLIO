import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 rounded-lg p-1 transition-opacity hover:opacity-90',
        className
      )}
      aria-label="Bhoot Tech Home"
    >
      {/* Raw custom logo image */}
      <Image
        src="/black-logo.png"
        alt="Bhoot Tech Logo"
        width={36}
        height={36}
        className="h-8 sm:h-9 w-auto object-contain shrink-0"
        priority
      />

      {/* Brand Text on Right Side */}
      <div className="flex items-center tracking-tight">
        <span className="font-extrabold text-base sm:text-lg text-slate-900 uppercase tracking-wider">
          Bhoot
        </span>
        <span className="font-light text-base sm:text-lg text-slate-600 uppercase tracking-wider ml-1.5">
          Tech
        </span>
      </div>
    </Link>
  );
}
