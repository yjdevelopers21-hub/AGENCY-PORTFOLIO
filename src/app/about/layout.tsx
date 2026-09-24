import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About Us — Digital Agency & Engineering Philosophy',
  description:
    'Discover YJ DEVELOPERS: our engineering philosophy, modern technology stack, core principles, and how we turn invisible complexity into visible business impact.',
  alternates: {
    canonical: 'https://yjdevelopers.com/about',
  },
  openGraph: {
    title: 'About Us — Digital Agency & Engineering Philosophy | YJ DEVELOPERS',
    description:
      'Engineering invisible complexity into visible impact. Learn about YJ DEVELOPERS philosophy, technologies, and high-performance development processes.',
    url: 'https://yjdevelopers.com/about',
    type: 'website',
    images: [
      {
        url: '/landing-page.png',
        width: 1200,
        height: 630,
        alt: 'About YJ DEVELOPERS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | YJ DEVELOPERS',
    description:
      'Discover our engineering philosophy and high-performance digital capabilities.',
    images: ['/landing-page.png'],
  },
};

const aboutBreadcrumbsJsonLd = {
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
      name: 'About Us',
      item: 'https://yjdevelopers.com/about',
    },
  ],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumbsJsonLd) }}
      />
      {children}
    </>
  );
}
