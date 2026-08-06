'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Logo } from './logo';
import {
  footerServices,
  footerCompany,
  footerQuickLinks,
} from '@/data/navigation';
import { companyData } from '@/data/company';
import { Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 text-slate-600">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-slate-100">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-6">
            <Logo className="mb-4" />
            <p className="text-sm font-semibold text-purple-700 tracking-wide mb-3">
              {companyData.tagline}
            </p>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm mb-6">
              {companyData.subtagline}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {companyData.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-200 transition-colors text-xs font-bold"
                  aria-label={social.platform}
                >
                  {social.platform.substring(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Column 1: Services */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerServices.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 hover:text-purple-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerCompany.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 hover:text-purple-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Let's Talk / Contact */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Let&apos;s Talk
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Have a project in mind? Let&apos;s create something amazing.
            </p>
            <div className="space-y-2.5">
              <a
                href={`mailto:${companyData.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 hover:text-purple-600 transition-colors"
              >
                <Mail className="w-4 h-4 text-purple-600 shrink-0" />
                <span>{companyData.email}</span>
              </a>
              <a
                href={`tel:${companyData.phone}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 hover:text-purple-600 transition-colors block"
              >
                <Phone className="w-4 h-4 text-purple-600 shrink-0" />
                <span>{companyData.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {companyData.copyrightYear} Bhoot Tech. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {footerQuickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-purple-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
