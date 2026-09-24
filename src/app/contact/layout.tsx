import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Us — Start Your Next Digital Project',
  description:
    'Have a new website, mobile app, redesign, or video editing inquiry? Contact YJ DEVELOPERS. Email: hello@yjdevelopers.com, Phone: +91 90765 43210. Fast 24h response.',
  alternates: {
    canonical: 'https://yjdevelopers.com/contact',
  },
  openGraph: {
    title: 'Contact Us — Start Your Project | YJ DEVELOPERS',
    description:
      'Start your next digital project with YJ DEVELOPERS. Reach out directly for project scoping, estimates, and consultations.',
    url: 'https://yjdevelopers.com/contact',
    type: 'website',
    images: [
      {
        url: '/landing-page.png',
        width: 1200,
        height: 630,
        alt: 'Contact YJ DEVELOPERS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | YJ DEVELOPERS',
    description:
      'Get in touch with YJ DEVELOPERS for custom web & mobile development inquiries.',
    images: ['/landing-page.png'],
  },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://yjdevelopers.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact Us',
          item: 'https://yjdevelopers.com/contact',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is your typical project timeline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Standard website designs usually take 2 to 4 weeks. Complex web applications or custom eCommerce platforms take 4 to 8 weeks depending on integration requirements.',
          },
        },
        {
          '@type': 'Question',
          name: 'What technologies do you specialize in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We specialize in Next.js, React, TypeScript, Tailwind CSS, Node.js, and cloud platforms like Vercel and AWS.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you provide ongoing support after launch?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we provide ongoing maintenance, Core Web Vitals monitoring, security updates, and feature enhancements.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do project estimates and billing work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We work on transparent fixed-price milestone agreements or dedicated sprint iterations so there are never hidden costs.',
          },
        },
      ],
    },
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {children}
    </>
  );
}
