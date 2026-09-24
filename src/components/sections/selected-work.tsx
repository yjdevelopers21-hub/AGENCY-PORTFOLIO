'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { projectsData } from '@/data/projects';
import { ProjectItem } from '@/types';
import { ArrowRight } from 'lucide-react';

export function SelectedWork() {
  const [projects, setProjects] = React.useState<ProjectItem[]>(projectsData);

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


  return (
    <section id="work" className="py-16 sm:py-28 bg-slate-50/50">
      <Container size="wide">
        <SectionHeading
          eyebrow="OUR WORK"
          title="Selected Projects"
          description="Explore a selection of recent web products, eCommerce stores, and digital applications engineered for impact."
          actionHref="/work"
          actionText="View All Projects"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => {
            const projectKey = project.id || (project as { _id?: string; slug?: string })._id || (project as { _id?: string; slug?: string }).slug || `project-${index}`;
            return (
              <motion.div
                key={projectKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/work/${project.id || projectKey}`}>

                <Card className="h-full flex flex-col justify-between overflow-hidden p-0 group border border-slate-200/80 bg-white cursor-pointer bhoot-card-hover">
                  {/* Project Banner Mockup */}
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


                  {/* Card Content Details */}
                  <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Category Pill Tag */}
                      <span className="text-[11px] font-bold text-purple-600 uppercase tracking-widest block mb-2">
                        {project.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Arrow Action */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-purple-600 font-semibold group-hover:underline">
                        View Case Study
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
            );
          })}
        </div>
      </Container>

    </section>
  );
}
