import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Selected Work & Portfolio Case Studies',
  description:
    'Browse our portfolio of custom websites, web applications, and video editing case studies delivered for ambitious businesses and fast-growing brands.',
  alternates: {
    canonical: 'https://yjdevelopers.com/work',
  },
  openGraph: {
    title: 'Selected Work & Portfolio Case Studies | YJ DEVELOPERS',
    description:
      'Engineering excellence in action. Browse live production websites, SaaS platforms, and mobile apps built by YJ DEVELOPERS.',
    url: 'https://yjdevelopers.com/work',
    type: 'website',
    images: [
      {
        url: '/landing-page.png',
        width: 1200,
        height: 630,
        alt: 'YJ DEVELOPERS Portfolio Work',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selected Work & Portfolio Case Studies | YJ DEVELOPERS',
    description:
      'Browse our latest case studies and production digital platforms.',
    images: ['/landing-page.png'],
  },
};

const workBreadcrumbsJsonLd = {
  '@context': 'https://schema.org',
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
      name: 'Selected Work',
      item: 'https://yjdevelopers.com/work',
    },
  ],
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workBreadcrumbsJsonLd) }}
      />
      {children}
    </>
  );
}
