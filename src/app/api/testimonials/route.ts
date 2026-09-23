import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Testimonial } from '@/models/Testimonial';
import { testimonialsData } from '@/data/testimonials';
import { getAuthenticatedAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;


// GET: Return all testimonials
export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
      if (testimonials.length > 0) {
        const formatted = testimonials.map((t) => ({
          id: t._id.toString(),
          _id: t._id.toString(),
          quote: t.quote,
          author: t.author,
          role: t.role,
          company: t.company,
          avatar: t.avatar,
          rating: t.rating,
          featured: t.featured,
          order: t.order || 0,
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
      data: testimonialsData,
      source: 'local_fallback',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json(
      { success: false, data: testimonialsData, error: msg },
      { status: 200 }
    );
  }
}

// POST: Create a new testimonial (Admin Only)
export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { quote, author, role, company, avatar, rating, featured, order } = body;

    if (!quote || !author || !company) {
      return NextResponse.json(
        { success: false, error: 'Quote, author, and company are required.' },
        { status: 400 }
      );
    }

    const conn = await connectToDatabase();
    if (conn) {
      const newTestimonial = await Testimonial.create({
        quote,
        author,
        role: role || 'Client',
        company,
        avatar: avatar || '',
        rating: rating || 5,
        featured: featured !== undefined ? featured : true,
        order: order || 0,
      });

      return NextResponse.json({
        success: true,
        message: 'Testimonial created successfully in MongoDB Atlas',
        data: newTestimonial,
      });
    }

    return NextResponse.json({ success: false, error: 'Database not connected' }, { status: 503 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
