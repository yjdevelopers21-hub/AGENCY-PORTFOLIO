'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Process } from '@/components/sections/process';
import { WhyUs } from '@/components/sections/why-us';
import { ProjectModal } from '@/components/ui/project-modal';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, Layers } from 'lucide-react';

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const techStack = [
    { name: 'Next.js 16', cat: 'Framework' },
    { name: 'React 19', cat: 'UI Library' },
    { name: 'TypeScript 5', cat: 'Language' },
    { name: 'Tailwind CSS v4', cat: 'Styling' },
    { name: 'Framer Motion', cat: 'Animation' },
    { name: 'Node.js', cat: 'Backend' },
    { name: 'PostgreSQL', cat: 'Database' },
    { name: 'Vercel / AWS', cat: 'Infrastructure' },
  ];

  const values = [
    {
      icon: Zap,
      title: 'Performance First',
      desc: 'We optimize every kilobyte, rendering route, and database query for sub-second load times.',
    },
    {
      icon: Layers,
      title: 'Invisible Complexity',
      desc: 'We engineer complex backend & state logic under the hood so your users experience absolute simplicity.',
    },
    {
      icon: ShieldCheck,
      title: 'Built For Scale',
      desc: 'Strict TypeScript typing and clean modular architecture ensure your codebase grows gracefully.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-purple-500 selection:text-white">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        <Container size="wide">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">ABOUT YJ DEVELOPERS</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6">
              Engineering Invisible Complexity Into{' '}
              <span className="purple-gradient-text">Visible Impact.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              YJ DEVELOPERS is a premier modern digital agency. We help ambitious businesses design, build, and scale world-class web applications, mobile apps, and high-impact video editing experiences.
            </p>
          </div>

          {/* Philosophy Banner */}
          <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 mb-20 shadow-2xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">
                  Our Engineering Philosophy
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  &ldquo;YJ DEVELOPERS&rdquo; represents precision & impact.
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Great software feels effortless. The immense complexity of server architecture, database indexing, edge caching, and multimedia post-production remains invisible to the end user—leaving only visible impact and delight.
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <Button
                  variant="primary"
                  size="lg"
                  showArrow
                  onClick={() => setIsModalOpen(true)}
                >
                  Work With Us
                </Button>
              </div>
            </div>
          </div>

          {/* Core Values Grid */}
          <div className="mb-20">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900">
                Our Core Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, idx) => {
                const IconComp = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <Card className="h-full p-8 bg-slate-50/50 border-slate-200/80">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {v.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {v.desc}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div className="mb-20">
            <div className="text-center max-w-xl mx-auto mb-12">
              <Badge className="mb-3">MODERN STACK</Badge>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Technologies We Master
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center text-center hover:border-purple-300 transition-colors"
                >
                  <Cpu className="w-5 h-5 text-purple-600 mb-2" />
                  <span className="text-sm font-bold text-slate-900">{tech.name}</span>
                  <span className="text-[11px] text-slate-500 font-medium">{tech.cat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Timeline */}
          <Process />

          {/* Why Us Checklist */}
          <WhyUs />
        </Container>
      </main>

      <Footer />
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
