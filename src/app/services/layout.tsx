import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Engineering Capabilities & Digital Services',
  description:
    'Explore YJ DEVELOPERS services: high-performance websites, custom web applications, mobile app development, eCommerce platforms, and viral video editing.',
  alternates: {
    canonical: 'https://yjdevelopers.com/services',
  },
  openGraph: {
    title: 'Digital Services & Engineering Capabilities | YJ DEVELOPERS',
    description:
      'From bespoke web designs to complex cloud applications and viral video editing, YJ DEVELOPERS builds high-performance digital products engineered for long-term scalability.',
    url: 'https://yjdevelopers.com/services',
    type: 'website',
    images: [
      {
        url: '/landing-page.png',
        width: 1200,
        height: 630,
        alt: 'YJ DEVELOPERS Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Services & Engineering Capabilities | YJ DEVELOPERS',
    description:
      'High-performance websites, web apps, mobile applications, and post-production video editing.',
    images: ['/landing-page.png'],
  },
};

const servicesJsonLd = {
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
          name: 'Services',
          item: 'https://yjdevelopers.com/services',
        },
      ],
    },
    {
      '@type': 'Service',
      name: 'Website Design & Development',
      provider: {
        '@type': 'Organization',
        name: 'YJ DEVELOPERS',
        url: 'https://yjdevelopers.com',
      },
      description:
        'Custom high-performance websites built with Next.js, TypeScript, and modern CSS architecture.',
      serviceType: 'Web Development',
    },
    {
      '@type': 'Service',
      name: 'Mobile App Development',
      provider: {
        '@type': 'Organization',
        name: 'YJ DEVELOPERS',
        url: 'https://yjdevelopers.com',
      },
      description:
        'Cross-platform iOS and Android mobile applications engineered for fast performance and intuitive UX.',
      serviceType: 'Mobile Application Development',
    },
    {
      '@type': 'Service',
      name: 'Video Editing & Post Production',
      provider: {
        '@type': 'Organization',
        name: 'YJ DEVELOPERS',
        url: 'https://yjdevelopers.com',
      },
      description:
        'High-impact video editing, color grading, and motion graphics for ambitious brands and creators.',
      serviceType: 'Video Production & Editing',
    },
  ],
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      {children}
    </>
  );
}
