import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Service } from '@/models/Service';
import { servicesData } from '@/data/services';
import { getAuthenticatedAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;


// GET: Return all services (Public & Admin)
export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const services = await Service.find({ active: true }).sort({ order: 1 });
      if (services.length > 0) {
        const formatted = services.map((s) => ({
          id: s.slug || s._id.toString(),
          _id: s._id.toString(),
          slug: s.slug,
          title: s.title,
          iconName: s.iconName || 'Monitor',
          description: s.shortDescription || s.fullDescription || '',
          shortDescription: s.shortDescription,
          fullDescription: s.fullDescription,
          features: s.features || [],
          scopeOptions: s.scopeOptions || [],
          href: `/services`,
          order: s.order || 0,
          active: s.active,
        }));
        return NextResponse.json({
          success: true,
          data: formatted,
          source: 'mongodb_atlas',
        });
      }

    }

    return NextResponse.json({
      success: true,
      data: servicesData,
      source: 'local_fallback',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json(
      { success: false, data: servicesData, error: msg },
      { status: 200 }
    );
  }
}

// POST: Create a new service (Admin Only)
export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, iconName, description, shortDescription, fullDescription, features, scopeOptions, order } = body;

    if (!title) {
      return NextResponse.json({ success: false, error: 'Title is required.' }, { status: 400 });
    }

    const serviceSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const conn = await connectToDatabase();
    if (conn) {
      const newService = await Service.create({
        title,
        slug: serviceSlug,
        iconName: iconName || 'Globe',
        shortDescription: shortDescription || description || '',
        fullDescription: fullDescription || '',
        features: features || [],
        scopeOptions: scopeOptions || [
          { tier: 'Starter / MVP', description: 'Essential setup', typicalTimeline: '2-3 Weeks' },
          { tier: 'Growth / Scale', description: 'Advanced features', typicalTimeline: '4-6 Weeks' },
        ],
        order: order || 0,
        active: true,
      });

      return NextResponse.json({
        success: true,
        message: 'Service created successfully in MongoDB Atlas',
        data: newService,
      });
    }

    return NextResponse.json({
      success: false,
      error: 'MongoDB Atlas not connected',
    }, { status: 503 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
