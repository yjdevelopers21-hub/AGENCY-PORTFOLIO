'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { whyUsData } from '@/data/why-us';
import { CheckCircle2 } from 'lucide-react';

export function WhyUs() {
  return (
    <section id="why-us" className="py-20 sm:py-28 bg-slate-50/60 overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Checklist */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <Badge className="mb-4">WHY CHOOSE US</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-8">
              More than just a development company.
            </h2>

            {/* Checklist */}
            <div className="space-y-4 w-full">
              {whyUsData.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="flex items-center gap-3.5 p-3 sm:p-4 rounded-xl bg-white border border-slate-200/70 shadow-2xs hover:border-purple-200 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 fill-purple-600 text-white" />
                  </div>
                  <span className="text-base font-semibold text-slate-800">
                    {item.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3D Mascot / Brand Identity Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div className="relative w-full max-w-[460px] rounded-3xl bg-gradient-to-br from-purple-100 via-purple-50 to-indigo-100 border border-purple-200/80 p-8 sm:p-10 shadow-2xl bhoot-card-shadow overflow-hidden group">
              {/* Radial Ambient Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl -z-10" />

              {/* 3D Ghost Mascot Illustration */}
              <div className="relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center mb-6">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative flex items-center justify-center"
                >
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-purple-600 to-indigo-900 flex items-center justify-center shadow-2xl border-4 border-white/60 p-4">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-20 h-20 sm:w-24 sm:h-24 text-white drop-shadow-xl"
                    >
                      <path
                        d="M12 3C7.58172 3 4 6.58172 4 11V18.5C4 19.3284 4.67157 20 5.5 20C6.01235 20 6.47648 19.742 6.75 19.3333L8.25 17.0833L9.75 19.3333C10.0235 19.742 10.4877 20 11 20H13C13.5123 20 13.9765 19.742 14.25 19.3333L15.75 17.0833L17.25 19.3333C17.5235 19.742 17.9877 20 18.5 20C19.3284 20 20 19.3284 20 18.5V11C20 6.58172 16.4183 3 12 3Z"
                        fill="currentColor"
                      />
                      <circle cx="9.5" cy="10" r="1.25" fill="#7C3AED" />
                      <circle cx="14.5" cy="10" r="1.25" fill="#7C3AED" />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Callout Quote */}
              <div className="text-center pt-4 border-t border-purple-200/60">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  We don&apos;t just build websites, we build{' '}
                  <span className="purple-gradient-text">growth engines.</span>
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
