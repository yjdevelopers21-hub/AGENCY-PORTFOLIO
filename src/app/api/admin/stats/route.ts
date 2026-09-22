import { NextResponse } from 'next/server';
import { connectToDatabase, getDatabaseState } from '@/lib/mongodb';
import { Inquiry, IInquiry } from '@/models/Inquiry';
import { Project } from '@/models/Project';
import { Service } from '@/models/Service';
import { Testimonial } from '@/models/Testimonial';
import { getAuthenticatedAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const dbState = getDatabaseState();
    const conn = await connectToDatabase();

    let stats = {
      totalInquiries: 2,
      newInquiries: 1,
      totalProjects: 3,
      totalServices: 3,
      totalTestimonials: 3,
      dbState,
      recentInquiries: [] as IInquiry[],
    };

    if (conn) {
      const [inquiryCount, newCount, projectCount, serviceCount, testimonialCount, recent] =
        await Promise.all([
          Inquiry.countDocuments(),
          Inquiry.countDocuments({ status: 'new' }),
          Project.countDocuments(),
          Service.countDocuments(),
          Testimonial.countDocuments(),
          Inquiry.find().sort({ createdAt: -1 }).limit(5),
        ]);

      stats = {
        totalInquiries: inquiryCount,
        newInquiries: newCount,
        totalProjects: projectCount,
        totalServices: serviceCount,
        totalTestimonials: testimonialCount,
        dbState: getDatabaseState(),
        recentInquiries: recent,
      };
    }

    return NextResponse.json({ success: true, data: stats });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
