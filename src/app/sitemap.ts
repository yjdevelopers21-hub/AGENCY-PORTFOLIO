import { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/models/Project';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yjdevelopers.com';
  const now = new Date();

  // Core Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic Case Study Routes
  const projectSlugs = new Set<string>();
  projectsData.forEach((p) => {
    if (p.id) projectSlugs.add(p.id);
  });

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbProjects = await Project.find({}, 'slug _id updatedAt').lean();
      dbProjects.forEach((p) => {
        const slug = p.slug || p._id.toString();
        if (slug) projectSlugs.add(slug);
      });
    }
  } catch {
    // Fallback gracefully to static projectsData
  }

  const projectRoutes: MetadataRoute.Sitemap = Array.from(projectSlugs).map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}

