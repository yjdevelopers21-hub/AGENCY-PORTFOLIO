import type { Metadata } from 'next';
import React from 'react';
import { projectsData } from '@/data/projects';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/models/Project';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  let title = 'Case Study';
  let description = 'High-performance digital project engineered by YJ DEVELOPERS.';
  let image = '/landing-page.png';

  const fallback = projectsData.find((p) => p.id === id);
  if (fallback) {
    title = fallback.title;
    description = fallback.description;
    image = fallback.image || image;
  }

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      const query = isValidObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id };
      const dbProject = await Project.findOne(query);
      if (dbProject) {
        title = dbProject.title;
        description = dbProject.description;
        if (dbProject.image && !dbProject.image.startsWith('data:')) {
          image = dbProject.image;
        }
      }
    }
  } catch {
    // Graceful fallback to static data
  }

  const cleanTitle = `${title} — Case Study`;

  return {
    title: cleanTitle,
    description,
    alternates: {
      canonical: `https://yjdevelopers.com/work/${id}`,
    },
    openGraph: {
      title: `${cleanTitle} | YJ DEVELOPERS`,
      description,
      url: `https://yjdevelopers.com/work/${id}`,
      type: 'article',
      images: [
        {
          url: image.startsWith('http') ? image : `https://yjdevelopers.com${image.startsWith('/') ? '' : '/'}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cleanTitle} | YJ DEVELOPERS`,
      description,
      images: [image],
    },
  };
}

export default async function CaseStudyLayout({
  children,
  params,
}: LayoutProps) {
  const { id } = await params;
  const breadcrumbJsonLd = {
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
        name: 'Work',
        item: 'https://yjdevelopers.com/work',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Case Study',
        item: `https://yjdevelopers.com/work/${id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
