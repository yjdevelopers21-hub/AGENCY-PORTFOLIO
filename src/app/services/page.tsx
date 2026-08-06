'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProjectEstimator } from '@/components/ui/project-estimator';
import { ProjectModal } from '@/components/ui/project-modal';
import { servicesData } from '@/data/services';
import { motion } from 'framer-motion';
import {
  Monitor,
  Code,
  ShoppingBag,
  Sparkles,
  Layers,
  Headphones,
  CheckCircle2,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Code,
  ShoppingBag,
  Sparkles,
  Layers,
  Headphones,
};

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterCategories = [
    'All',
    'Website Design',
    'Web Development',
    'eCommerce Solutions',
    'Web Applications',
    'UI/UX Design',
  ];

  const filteredServices =
    selectedFilter === 'All'
      ? servicesData
      : servicesData.filter((s) => s.title === selectedFilter);

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-purple-500 selection:text-white">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Page Hero Header */}
        <Container size="wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">ENGINEERING CAPABILITIES</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6">
              Digital Solutions Built For{' '}
              <span className="purple-gradient-text">Real Impact.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              From bespoke web designs to complex cloud applications, Bhoot Tech builds high-performance digital products engineered for long-term scalability.
            </p>
          </div>

          {/* Service Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all border ${
                  selectedFilter === cat
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredServices.map((service, index) => {
              const IconComponent = iconMap[service.iconName] || Monitor;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Card className="h-full flex flex-col justify-between p-8 bg-white border border-slate-200/80 hover:border-purple-300 transition-all duration-300 bhoot-card-hover">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mb-6">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Deliverables Checklist */}
                      <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                        <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                          <span>Custom Architecture & Clean Code</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                          <span>Core Web Vitals Performance 95+</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                          <span>WCAG Accessibility & SEO Suite</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsModalOpen(true)}
                      className="w-full"
                    >
                      Inquire For This Service
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Estimator Calculator */}
          <SectionHeading
            eyebrow="ESTIMATE YOUR PROJECT"
            title="Instant Scope & Budget Calculator"
            description="Use our interactive scope calculator to estimate your project budget and timeline instantly."
            align="center"
          />
          <ProjectEstimator onOpenModal={() => setIsModalOpen(true)} />
        </Container>
      </main>

      <Footer />
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
