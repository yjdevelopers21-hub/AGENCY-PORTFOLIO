'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { testimonialsData } from '@/data/testimonials';
import { Quote } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container size="wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <Badge className="mb-4">WHAT CLIENTS SAY</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Trusted by amazing people
            </h2>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full flex flex-col justify-between p-8 bg-slate-50/50 border border-slate-200/60 hover:bg-white transition-colors duration-300">
                <div>
                  {/* Quote Icon */}
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                    <Quote className="w-5 h-5 fill-purple-600/30" />
                  </div>

                  {/* Quote Body */}
                  <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed italic mb-8">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/60">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.author}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
