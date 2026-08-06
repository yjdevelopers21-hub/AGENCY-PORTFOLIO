'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  onOpenModal?: () => void;
}

export function CTASection({ onOpenModal }: CTASectionProps) {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-white">
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100 border border-purple-200/80 p-8 sm:p-12 lg:p-16 shadow-2xl bhoot-card-shadow overflow-hidden"
        >
          {/* Radial Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Ready to bring your idea to life?
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-normal">
                Let&apos;s build something extraordinary together.
              </p>
            </div>

            <div className="shrink-0">
              <Button
                variant="dark"
                size="lg"
                showArrow
                onClick={onOpenModal}
                className="px-8 py-4 text-base"
              >
                Start Your Project
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
