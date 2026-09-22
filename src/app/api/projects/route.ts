import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { projectsData } from '@/data/projects';
import { getAuthenticatedAdmin } from '@/lib/auth';

// GET: Return all projects (Public & Admin)
export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const projects = await Project.find().sort({ order: 1, createdAt: -1 });
      if (projects.length > 0) {
        return NextResponse.json({
          success: true,
          data: projects,
          source: 'mongodb_atlas',
        });
      }
    }

    // Fallback data
    return NextResponse.json({
      success: true,
      data: projectsData,
      source: 'local_fallback',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json(
      { success: false, data: projectsData, error: msg },
      { status: 200 }
    );
  }
}

// POST: Create a new project (Admin Only)
export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, category, description, longDescription, client, timeline, services, image, tags, featured, order, liveUrl, githubUrl } = body;

    if (!title || !category || !description) {
      return NextResponse.json(
        { success: false, error: 'Title, category, and description are required.' },
        { status: 400 }
      );
    }

    const projectSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const conn = await connectToDatabase();
    if (conn) {
      const newProject = await Project.create({
        title,
        slug: projectSlug,
        category,
        description,
        longDescription: longDescription || description,
        client: client || '',
        timeline: timeline || '4-6 Weeks',
        services: services || [category],
        image: image || '/landing-page.png',
        tags: tags || [category],
        featured: featured !== undefined ? featured : true,
        order: order || 0,
        liveUrl: liveUrl || '',
        githubUrl: githubUrl || '',
      });

      return NextResponse.json({
        success: true,
        message: 'Project created successfully in MongoDB Atlas',
        data: newProject,
      });
    }

    return NextResponse.json({
      success: false,
      error: 'MongoDB Atlas is not connected. Configure MONGODB_URI in .env.local to persist projects.',
    }, { status: 503 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
