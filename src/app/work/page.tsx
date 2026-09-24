'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ProjectModal } from '@/components/ui/project-modal';
import { projectsData } from '@/data/projects';
import { ProjectItem } from '@/types';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

export default function WorkPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<ProjectItem[]>(projectsData);

  React.useEffect(() => {
    fetch('/api/projects', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          setProjects(data.data);
        }
      })
      .catch(() => {});
  }, []);


  const categories = ['All', 'Website Development', 'App Development', 'Video Editing', 'E-COMMERCE', 'REAL ESTATE', 'EDUCATION'];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      activeCategory === 'All' ||
      (p.category || '').toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags || []).some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-purple-500 selection:text-white">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        <Container size="wide">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">SELECTED WORK</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6">
              Engineering Excellence in{' '}
              <span className="purple-gradient-text">Action.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore our portfolio of web applications, eCommerce stores, and digital products crafted for high-performance businesses.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 border-b border-slate-100 pb-8">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full transition-all border ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
              />
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => {
                const projectKey = project.id || (project as { _id?: string; slug?: string })._id || (project as { _id?: string; slug?: string }).slug || `project-${index}`;
                return (
                  <motion.div
                    key={projectKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link href={`/work/${project.id || projectKey}`}>

                    <Card className="h-full flex flex-col justify-between overflow-hidden p-0 group border border-slate-200/80 bg-white cursor-pointer bhoot-card-hover">
                      {/* Project Cover Mockup */}
                      <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden">
                        {project.image ? (
                          <div className="relative w-full h-full">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-900/40 via-slate-900 to-indigo-950 flex items-center justify-center p-6 text-center">
                            <span className="text-white font-bold text-base tracking-wide">{project.title}</span>
                          </div>
                        )}
                      </div>


                      {/* Content Details */}
                      <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-purple-600 uppercase tracking-widest block mb-2">
                            {project.category}
                          </span>
                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            {project.description}
                          </p>

                          {/* Tech Stack Tags */}
                          {project.tags && (
                            <div className="flex flex-wrap gap-1.5 mb-6">
                              {project.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-purple-600 font-medium text-xs">
                          <span>View Full Case Study</span>
                          <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover:bg-purple-600 group-hover:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
                );
              })}
            </div>
          ) : (

            <div className="text-center py-16 text-slate-500">
              No projects found matching your search. Try resetting filters.
            </div>
          )}
        </Container>
      </main>

      <Footer />
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
