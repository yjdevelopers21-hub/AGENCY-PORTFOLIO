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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Homepage Flow */}
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Services />
        <SelectedWork />
        <Process />
        <WhyUs />
        <Testimonials />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
