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
import { ArrowLeft, ExternalLink, Zap, Shield, Code2, Globe, Calendar, Building2, CheckCircle2 } from 'lucide-react';

interface CaseStudyParams {
  params: Promise<{ id: string }>;
}

export default function CaseStudyPage({ params }: CaseStudyParams) {
  const { id } = use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fallbackProject = projectsData.find((p) => p.id === id);
  const [project, setProject] = useState(fallbackProject || null);
  const [loading, setLoading] = useState(!fallbackProject);

  React.useEffect(() => {
    fetch('/api/projects', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          const match = data.data.find(
            (p: { id?: string; _id?: string; slug?: string }) =>
              p.id === id || p._id === id || p.slug === id
          );
          if (match) {
            setProject(match);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (!project && !loading) {
    notFound();
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 rounded-full border-4 border-purple-600 border-t-transparent animate-spin" />
      </div>
    );
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
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge>{project.category}</Badge>
              {project.client && (
                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                  {project.client}
                </span>
              )}
              {project.timeline && (
                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                  {project.timeline}
                </span>
              )}
            </div>

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

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-purple-400" />
                  <span>Visit Live Site</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <Code2 className="w-3.5 h-3.5 text-slate-800" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Preview Showcase Banner */}
          <div className="w-full aspect-[16/9] rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 mb-16 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden">
            {project.image ? (
              <div className="absolute inset-0 z-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              </div>
            ) : (
              <div className="absolute inset-0 bhoot-grid-pattern opacity-20" />
            )}
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
                {project.longDescription || project.description || 'Engineered with ultra-fast server rendering, client-side state caching, and responsive micro-interactions.'}
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2">
              {(project.tags || []).map((tag) => (
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
                <p className="text-base text-slate-600 leading-relaxed whitespace-pre-line">
                  {project.challenge || 'The client required a modern, highly scalable platform capable of delivering sub-second page loads across mobile and desktop devices. Previous legacy architecture suffered from slow initial renders and conversion drop-offs.'}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  The Engineering Solution
                </h3>
                <p className="text-base text-slate-600 leading-relaxed mb-6 whitespace-pre-line">
                  {project.solution || 'YJ DEVELOPERS architected a modern Next.js solution leveraging React Server Components, custom Tailwind UI design tokens, dynamic image optimization, and edge infrastructure.'}
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

              {project.services && project.services.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Key Deliverables & Services
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.services.map((srv) => (
                      <div key={srv} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800">{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Results Card */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl border-slate-800 shadow-xl">
                <h4 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-4">
                  Key Metrics & Results
                </h4>

                <div className="space-y-6 mb-8">
                  {project.metrics && project.metrics.length > 0 ? (
                    project.metrics.map((m, idx) => (
                      <div key={idx}>
                        <span className="text-3xl font-extrabold text-purple-400 block">{m.value}</span>
                        <span className="text-xs text-slate-400 font-medium">{m.label}</span>
                      </div>
                    ))
                  ) : (
                    <>
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
                    </>
                  )}
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

              {/* Project Details Meta Card */}
              <Card className="p-6 bg-slate-50 border-slate-200/80 rounded-2xl space-y-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Project Overview</h5>
                <div className="space-y-3 text-xs">
                  {project.client && (
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                      <span className="text-slate-500">Client</span>
                      <span className="font-bold text-slate-900">{project.client}</span>
                    </div>
                  )}
                  {project.timeline && (
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                      <span className="text-slate-500">Timeline</span>
                      <span className="font-bold text-slate-900">{project.timeline}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                    <span className="text-slate-500">Category</span>
                    <span className="font-bold text-slate-900">{project.category}</span>
                  </div>
                  {project.liveUrl && (
                    <div className="pt-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Visit {project.title.split('—')[0].trim()}</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    </div>
                  )}
                </div>
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
