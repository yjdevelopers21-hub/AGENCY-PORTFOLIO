'use client';

import React from 'react';
import { Container } from '@/components/ui/container';
import { motion } from 'framer-motion';

export function TrustStrip() {
  const brands = [
    { name: 'Lumina', font: 'font-serif tracking-widest text-lg' },
    { name: 'Furniqa', font: 'font-sans font-semibold tracking-wider text-lg' },
    { name: 'CROWD.', font: 'font-mono font-extrabold tracking-tighter text-xl' },
    { name: 'solidestate', font: 'font-sans font-bold tracking-tight text-lg' },
    { name: 'nyoko', font: 'font-serif italic font-medium text-lg' },
    { name: 'Jobify', font: 'font-sans font-extrabold tracking-wide text-lg' },
  ];

  return (
    <section className="py-12 sm:py-16 border-y border-slate-100 bg-slate-50/40">
      <Container size="wide">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            TRUSTED BY BUSINESSES OF ALL SIZES
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex items-center justify-center p-2 text-slate-800 hover:text-purple-600 transition-colors cursor-pointer"
            >
              <span className={brand.font}>{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
