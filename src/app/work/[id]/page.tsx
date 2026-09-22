'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProjectModal } from '@/components/ui/project-modal';
import { projectsData } from '@/data/projects';
import { ArrowLeft, ExternalLink, Zap, Shield } from 'lucide-react';

interface CaseStudyParams {
  params: Promise<{ id: string }>;
}

export default function CaseStudyPage({ params }: CaseStudyParams) {
  const { id } = use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-purple-500 selection:text-white">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        <Container size="wide">
          {/* Back to Work Link */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-purple-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          {/* Case Study Hero */}
          <div className="max-w-4xl mb-12">
            <Badge className="mb-4">{project.category}</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="md"
                showArrow
                onClick={() => setIsModalOpen(true)}
              >
                Inquire For Similar Project
              </Button>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                <span>Visit Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Project Preview Showcase Banner */}
          <div className="w-full aspect-[16/9] rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 mb-16 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bhoot-grid-pattern opacity-20" />
            <div className="relative z-10 flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                Case Study Overview — {project.title}
              </span>
              <span className="text-xs bg-purple-600/30 text-purple-300 border border-purple-500/40 px-3 py-1 rounded-full font-medium">
                Production Release
              </span>
            </div>

            <div className="relative z-10 max-w-xl my-auto py-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
                High-Performance Architecture
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Engineered with ultra-fast server rendering, client-side state caching, and responsive micro-interactions.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold bg-slate-800/80 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Details Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  The Client Challenge
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  The client required a modern, highly scalable platform capable of delivering sub-second page loads across mobile and desktop devices. Previous legacy architecture suffered from slow initial renders and conversion drop-offs.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  The Engineering Solution
                </h3>
                <p className="text-base text-slate-600 leading-relaxed mb-6">
                  YJ DEVELOPERS architected a modern Next.js solution leveraging React Server Components, custom Tailwind UI design tokens, dynamic image optimization, and edge infrastructure.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="p-4 bg-slate-50 border-slate-200/80">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <h4 className="font-bold text-slate-900 text-sm">Sub-Second Speed</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Optimized Core Web Vitals resulting in 98+ Lighthouse performance scores.
                    </p>
                  </Card>

                  <Card className="p-4 bg-slate-50 border-slate-200/80">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="w-5 h-5 text-purple-600" />
                      <h4 className="font-bold text-slate-900 text-sm">WCAG AA Compliant</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Accessible contrast ratios, keyboard navigation, and semantic HTML5.
                    </p>
                  </Card>
                </div>
              </div>
            </div>

            {/* Sidebar Results Card */}
            <div className="lg:col-span-4">
              <Card className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl border-slate-800 shadow-xl">
                <h4 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-4">
                  Key Metrics & Results
                </h4>

                <div className="space-y-6 mb-8">
                  <div>
                    <span className="text-3xl font-extrabold text-purple-400 block">99/100</span>
                    <span className="text-xs text-slate-400 font-medium">Lighthouse Performance</span>
                  </div>

                  <div>
                    <span className="text-3xl font-extrabold text-white block">+140%</span>
                    <span className="text-xs text-slate-400 font-medium">User Engagement Increase</span>
                  </div>

                  <div>
                    <span className="text-3xl font-extrabold text-purple-400 block">&lt; 0.8s</span>
                    <span className="text-xs text-slate-400 font-medium">First Contentful Paint</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full"
                >
                  Start Your Case Study
                </Button>
              </Card>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
