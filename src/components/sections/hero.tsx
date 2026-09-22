'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeroVisual } from './hero-visual';
import { Layout, Smartphone, Zap, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenModal?: () => void;
}

export function Hero({ onOpenModal }: HeroProps) {
  const capabilities = [
    {
      icon: Smartphone,
      title: 'Responsive',
      subtitle: 'Mobile-First Design',
    },
    {
      icon: Zap,
      title: 'Performance',
      subtitle: 'Fast Core Web Vitals',
    },
    {
      icon: ShieldCheck,
      title: 'Scalable',
      subtitle: 'Modern Architecture',
    },
  ];

  return (
    <section id="main-content" className="relative pt-24 sm:pt-36 lg:pt-40 pb-12 sm:pb-24 lg:pb-28 overflow-hidden bg-white">
      {/* Background Subtle Grid & Ambient Radial Pattern */}
      <div className="absolute inset-0 -z-10 bhoot-grid-pattern opacity-40 pointer-events-none" />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline & Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow Label */}
            <div className="mb-4 sm:mb-6">
              <Badge>INVISIBLE COMPLEXITY. VISIBLE IMPACT.</Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] sm:leading-[1.12] mb-5 sm:mb-6">
              We Build Digital Experiences That Drive{' '}
              <span className="purple-gradient-text">Real Impact.</span>
            </h1>

            {/* Supporting Paragraph Copy */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mb-8 sm:mb-10">
              YJ DEVELOPERS designs and develops fast, modern and scalable websites,
              mobile applications and high-impact video editing for ambitious businesses.
            </p>

            {/* Action Buttons: Full width on small mobile screens for optimal ergonomics */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-10 sm:mb-14">
              <Button
                variant="dark"
                size="lg"
                showArrow
                onClick={onOpenModal}
                className="w-full sm:w-auto text-center justify-center py-3.5"
              >
                Start a Project
              </Button>

              <Link href="/work" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  icon={<Layout className="w-4 h-4 text-slate-600" />}
                  className="w-full sm:w-auto text-center justify-center py-3.5"
                >
                  Explore Our Work
                </Button>
              </Link>
            </div>

            {/* Honest Capability Highlights */}
            <div className="w-full grid grid-cols-3 gap-2 sm:gap-4 max-w-xl border-t border-slate-100 pt-6 sm:pt-8">
              {capabilities.map((cap) => {
                const IconComponent = cap.icon;
                return (
                  <div
                    key={cap.title}
                    className="flex flex-col items-center sm:items-start p-2.5 sm:p-4 rounded-xl bg-slate-50/60 border border-slate-100 bhoot-card-shadow hover:border-purple-200/60 transition-colors text-center sm:text-left"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-100/70 text-purple-700 flex items-center justify-center mb-2">
                      <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      {cap.title}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium hidden sm:inline-block mt-0.5">
                      {cap.subtitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Hero Visual */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
