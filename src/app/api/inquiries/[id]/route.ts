import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Inquiry } from '@/models/Inquiry';
import { getAuthenticatedAdmin } from '@/lib/auth';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await req.json();
    const { status, notes } = body;

    const conn = await connectToDatabase();
    if (conn) {
      const updated = await Inquiry.findByIdAndUpdate(
        id,
        { ...(status && { status }), ...(notes !== undefined && { notes }) },
        { new: true }
      );
      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ success: true, message: 'Status updated (Mock mode)' });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const conn = await connectToDatabase();
    if (conn) {
      await Inquiry.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: 'Inquiry deleted' });
    }

    return NextResponse.json({ success: true, message: 'Inquiry deleted (Mock mode)' });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
