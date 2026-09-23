import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { SiteSetting } from '@/models/SiteSetting';
import { companyData } from '@/data/company';
import { getAuthenticatedAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;


// GET: Return site settings
export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const setting = await SiteSetting.findOne();
      if (setting) {
        return NextResponse.json({
          success: true,
          data: setting,
          source: 'mongodb_atlas',
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: companyData,
      source: 'local_fallback',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json(
      { success: false, data: companyData, error: msg },
      { status: 200 }
    );
  }
}

// PUT: Update site settings (Admin Only)
export async function PUT(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const conn = await connectToDatabase();
    if (conn) {
      let setting = await SiteSetting.findOne();
      if (!setting) {
        setting = await SiteSetting.create(body);
      } else {
        setting = await SiteSetting.findByIdAndUpdate(setting._id, body, { new: true });
      }

      return NextResponse.json({
        success: true,
        message: 'Settings updated successfully in MongoDB Atlas',
        data: setting,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Settings updated locally (Mock mode)',
      data: body,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
