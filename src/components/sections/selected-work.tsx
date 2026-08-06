'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { projectsData } from '@/data/projects';
import { ArrowRight } from 'lucide-react';

export function SelectedWork() {
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
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/work/${project.id}`}>
                <Card className="h-full flex flex-col justify-between overflow-hidden p-0 group border border-slate-200/80 bg-white cursor-pointer bhoot-card-hover">
                  {/* Project Banner Mockup */}
                  <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                    {/* Decorative Project Cover Mockup */}
                    {project.id === 'furniqa' && (
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-stone-200 flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500">
                        <div className="w-full h-full bg-white/80 rounded-xl shadow-lg border border-amber-200/60 p-4 flex flex-col justify-between">
                          <div className="flex justify-between items-center">
                            <span className="font-extrabold text-amber-900 text-sm tracking-wider">
                              Furniqa.
                            </span>
                            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                              Store
                            </span>
                          </div>
                          <div className="flex gap-2 my-auto">
                            <div className="w-1/2 aspect-square rounded-lg bg-amber-200/60" />
                            <div className="w-1/2 aspect-square rounded-lg bg-stone-300/60" />
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === 'solidestate' && (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500">
                        <div className="w-full h-full bg-slate-900/90 rounded-xl border border-slate-700/80 p-4 flex flex-col justify-between text-white">
                          <span className="text-xs text-blue-400 font-semibold uppercase tracking-widest">
                            Real Estate
                          </span>
                          <h4 className="text-lg font-bold text-white tracking-tight">
                            Find your perfect space.
                          </h4>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div className="w-3/4 h-full bg-blue-500" />
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === 'skilly' && (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-purple-50 to-indigo-100 flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500">
                        <div className="w-full h-full bg-white/90 rounded-xl shadow-lg border border-purple-200/80 p-4 flex flex-col justify-between">
                          <span className="text-xs text-purple-600 font-bold uppercase tracking-wider">
                            Education
                          </span>
                          <h4 className="text-base font-extrabold text-slate-900">
                            Learn skills that move you forward
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                              S
                            </div>
                            <span className="text-xs text-slate-600 font-medium">
                              Interactive LMS
                            </span>
                          </div>
                        </div>
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
          ))}
        </div>
      </Container>
    </section>
  );
}
