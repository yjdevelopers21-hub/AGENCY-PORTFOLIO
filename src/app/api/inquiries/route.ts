import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Inquiry } from '@/models/Inquiry';
import { getAuthenticatedAdmin } from '@/lib/auth';

// In-memory fallback for local testing when Atlas is not yet connected
const inMemoryInquiries: Array<{
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  scopeLevel?: string;
  timeline?: string;
  subject?: string;
  message: string;
  status: string;
  source?: string;
  createdAt: string;
}> = [
  {
    _id: 'demo-inquiry-1',
    name: 'Aarav Patel',
    email: 'aarav@techventure.in',
    phone: '+91 98765 12345',
    service: 'Website Development',
    scopeLevel: 'Growth / Scale',
    timeline: '3-4 Weeks',
    subject: 'SaaS Platform Redesign',
    message: 'We are looking to modernize our customer dashboard and build a high-performance Next.js marketing website.',
    status: 'new',
    source: 'project_estimator',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    _id: 'demo-inquiry-2',
    name: 'Pooja Deshmukh',
    email: 'pooja@fashionhub.com',
    phone: '+91 91234 56789',
    service: 'App Development',
    scopeLevel: 'Starter / MVP',
    timeline: '4-6 Weeks',
    subject: 'React Native Mobile App',
    message: 'Need a cross-platform iOS/Android mobile app for our direct-to-consumer fashion eCommerce store.',
    status: 'contacted',
    source: 'contact_page',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
];

// POST: Public submission from Contact page or ProjectModal
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, scopeLevel, timeline, subject, message, source } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const conn = await connectToDatabase();
    if (conn) {
      const newInquiry = await Inquiry.create({
        name,
        email,
        phone: phone || '',
        service: service || 'General Inquiry',
        scopeLevel: scopeLevel || 'Custom / Flexible',
        timeline: timeline || 'Flexible',
        subject: subject || 'New Project Inquiry',
        message,
        status: 'new',
        source: source || 'general',
      });

      return NextResponse.json({
        success: true,
        message: 'Inquiry submitted successfully!',
        data: newInquiry,
        savedTo: 'mongodb_atlas',
      });
    }

    // Fallback: In-memory store
    const fallbackItem = {
      _id: 'inq-' + Date.now(),
      name,
      email,
      phone: phone || '',
      service: service || 'General Inquiry',
      scopeLevel: scopeLevel || 'Custom / Flexible',
      timeline: timeline || 'Flexible',
      subject: subject || 'New Project Inquiry',
      message,
      status: 'new',
      source: source || 'general',
      createdAt: new Date().toISOString(),
    };
    inMemoryInquiries.unshift(fallbackItem);

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully! (Saved to local store)',
      data: fallbackItem,
      savedTo: 'in_memory_fallback',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

// GET: Admin-protected retrieval of all inquiries
export async function GET() {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized access.' },
        { status: 401 }
      );
    }

    const conn = await connectToDatabase();
    if (conn) {
      const inquiries = await Inquiry.find().sort({ createdAt: -1 });
      return NextResponse.json({
        success: true,
        data: inquiries,
        source: 'mongodb_atlas',
      });
    }

    return NextResponse.json({
      success: true,
      data: inMemoryInquiries,
      source: 'in_memory_fallback',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
