'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { processData } from '@/data/process';

export function Process() {
  return (
    <section id="process" className="py-20 sm:py-28 bg-white">
      <Container size="wide">
        <SectionHeading
          eyebrow="OUR PROCESS"
          title="A Simple Process. Powerful Results."
          description="A transparent, four-step engineering methodology that turns complex requirements into high-performing digital solutions."
        />

        {/* Process Steps Timeline */}
        <div className="relative mt-12 sm:mt-16">
          {/* Horizontal Connecting Dotted Line for Desktop */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-purple-200 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {processData.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="flex flex-col items-start lg:items-center text-left lg:text-center group"
              >
                {/* Step Circle Badge */}
                <div className="w-14 h-14 rounded-full bg-white border-2 border-purple-600 text-purple-700 font-extrabold text-base flex items-center justify-center mb-6 shadow-md group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                  {step.step}
                </div>

                {/* Step Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
