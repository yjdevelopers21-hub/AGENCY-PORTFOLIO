'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { navItems } from '@/data/navigation';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MobileMenu } from './mobile-menu';
import { Menu } from 'lucide-react';

interface NavbarProps {
  onOpenModal?: () => void;
}

export function Navbar({ onOpenModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/60 shadow-2xs py-3.5'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg"
      >
        Skip to main content
      </a>

      <Container size="wide">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-slate-50/80 border border-slate-200/50 backdrop-blur-xs"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.label;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveSection(item.label)}
                  className={`relative text-xs lg:text-sm font-medium px-3.5 py-1.5 rounded-full transition-colors duration-200 ${
                    isActive
                      ? 'text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-purple-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              variant="dark"
              size="sm"
              showArrow
              onClick={onOpenModal}
              className="hidden sm:inline-flex"
            >
              Start a Project
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenModal={onOpenModal}
      />
    </header>
  );
}
