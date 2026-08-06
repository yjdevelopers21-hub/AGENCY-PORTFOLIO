'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Hero } from '@/components/sections/hero';
import { TrustStrip } from '@/components/sections/trust-strip';
import { Services } from '@/components/sections/services';
import { SelectedWork } from '@/components/sections/selected-work';
import { Process } from '@/components/sections/process';
import { WhyUs } from '@/components/sections/why-us';
import { Testimonials } from '@/components/sections/testimonials';
import { CTASection } from '@/components/sections/cta-section';
import { Footer } from '@/components/layout/footer';
import { ProjectModal } from '@/components/ui/project-modal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Main Homepage Flow */}
      <main className="flex-1">
        <Hero onOpenModal={handleOpenModal} />
        <TrustStrip />
        <Services />
        <SelectedWork />
        <Process />
        <WhyUs />
        <Testimonials />
        <CTASection onOpenModal={handleOpenModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Inquiry Modal */}
      <ProjectModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
