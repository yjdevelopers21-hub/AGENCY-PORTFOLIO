import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { Service } from '@/models/Service';
import { Testimonial } from '@/models/Testimonial';
import { SiteSetting } from '@/models/SiteSetting';
import { Admin } from '@/models/Admin';
import { projectsData } from '@/data/projects';
import { servicesData } from '@/data/services';
import { testimonialsData } from '@/data/testimonials';
import { companyData } from '@/data/company';
import { hashPassword, getDefaultAdminCredentials, getAuthenticatedAdmin } from '@/lib/auth';

export async function POST() {
  try {
    const adminAuth = await getAuthenticatedAdmin();
    if (!adminAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized. Please login first.' }, { status: 401 });
    }

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        success: false,
        error: 'MongoDB Atlas is not connected. Please add your MONGODB_URI in .env.local to seed data.',
      }, { status: 503 });
    }

    // 1. Seed Projects
    const existingProjects = await Project.countDocuments();
    if (existingProjects === 0) {
      const formattedProjects = projectsData.map((p, idx) => ({
        title: p.title,
        slug: p.id,
        category: p.category,
        description: p.description,
        longDescription: `Comprehensive ${p.category.toLowerCase()} solution built with Next.js, TypeScript, and modern edge infrastructure.`,
        client: p.title + ' Client',
        timeline: '4-6 Weeks',
        services: [p.category],
        image: p.image,
        tags: p.tags || [p.category],
        featured: true,
        order: idx,
      }));
      await Project.insertMany(formattedProjects);
    }

    // 2. Seed Services
    const existingServices = await Service.countDocuments();
    if (existingServices === 0) {
      const formattedServices = servicesData.map((s, idx) => ({
        title: s.title,
        slug: s.id,
        iconName: s.iconName,
        shortDescription: s.description,
        fullDescription: s.description,
        features: ['Custom Tailored Architecture', 'Production-grade Quality', 'Rapid Turnaround'],
        scopeOptions: [
          { tier: 'Starter / MVP', description: 'Essential setup and launch', typicalTimeline: '2-3 Weeks' },
          { tier: 'Growth / Scale', description: 'Complete feature suite and optimizations', typicalTimeline: '4-6 Weeks' },
        ],
        order: idx,
        active: true,
      }));
      await Service.insertMany(formattedServices);
    }

    // 3. Seed Testimonials
    const existingTestimonials = await Testimonial.countDocuments();
    if (existingTestimonials === 0) {
      const formattedTestimonials = testimonialsData.map((t, idx) => ({
        quote: t.quote,
        author: t.author,
        role: t.role,
        company: t.company,
        avatar: t.avatar || '',
        rating: 5,
        featured: true,
        order: idx,
      }));
      await Testimonial.insertMany(formattedTestimonials);
    }

    // 4. Seed Site Setting
    const existingSettings = await SiteSetting.countDocuments();
    if (existingSettings === 0) {
      await SiteSetting.create({
        name: companyData.name,
        tagline: companyData.tagline,
        subtagline: companyData.subtagline,
        email: companyData.email,
        phone: companyData.phone,
        copyrightYear: companyData.copyrightYear,
        socials: companyData.socials,
        heroEyebrow: 'INVISIBLE COMPLEXITY. VISIBLE IMPACT.',
        heroHeadline: 'We Build Digital Experiences That Drive Real Impact.',
      });
    }

    // 5. Seed Admin User
    const defaultCreds = getDefaultAdminCredentials();
    const existingAdmin = await Admin.findOne({ email: defaultCreds.email.toLowerCase() });
    if (!existingAdmin) {
      await Admin.create({
        email: defaultCreds.email.toLowerCase(),
        passwordHash: hashPassword(defaultCreds.password),
        name: 'Master Admin',
        role: 'superadmin',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'MongoDB Atlas successfully populated with initial YJ DEVELOPERS data!',
      details: {
        projectsSeeded: existingProjects === 0,
        servicesSeeded: existingServices === 0,
        testimonialsSeeded: existingTestimonials === 0,
        settingsSeeded: existingSettings === 0,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
