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
    <section id="main-content" className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 lg:pb-28 overflow-hidden bg-white">
      {/* Background Subtle Grid & Ambient Radial Pattern */}
      <div className="absolute inset-0 -z-10 bhoot-grid-pattern opacity-40 pointer-events-none" />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow Label */}
            <div className="mb-6">
              <Badge>INVISIBLE COMPLEXITY. VISIBLE IMPACT.</Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6">
              We Build Digital Experiences That Drive{' '}
              <span className="purple-gradient-text">Real Impact.</span>
            </h1>

            {/* Supporting Paragraph Copy */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mb-8 sm:mb-10">
              Bhoot Tech designs and develops fast, modern and scalable websites,
              web applications and eCommerce experiences for ambitious businesses.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12 sm:mb-14">
              <Button variant="dark" size="lg" showArrow onClick={onOpenModal}>
                Start a Project
              </Button>

              <Link href="#work">
                <Button
                  variant="outline"
                  size="lg"
                  icon={<Layout className="w-4 h-4 text-slate-600" />}
                >
                  Explore Our Work
                </Button>
              </Link>
            </div>

            {/* Honest Capability Highlights */}
            <div className="w-full grid grid-cols-3 gap-3 sm:gap-4 max-w-xl border-t border-slate-100 pt-8">
              {capabilities.map((cap) => {
                const IconComponent = cap.icon;
                return (
                  <div
                    key={cap.title}
                    className="flex flex-col items-start p-3 sm:p-4 rounded-xl bg-slate-50/60 border border-slate-100 bhoot-card-shadow hover:border-purple-200/60 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100/70 text-purple-700 flex items-center justify-center mb-2.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">
                      {cap.title}
                    </span>
                    <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
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
