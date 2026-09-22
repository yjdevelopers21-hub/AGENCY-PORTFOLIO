import { NextRequest, NextResponse } from 'next/server';
import {
  signAdminToken,
  comparePassword,
  getAuthenticatedAdmin,
  getDefaultAdminCredentials,
  AUTH_COOKIE_OPTIONS,
} from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { Admin } from '@/models/Admin';

// GET: Verify currently logged in admin session
export async function GET() {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      admin: {
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ authenticated: false, error: message }, { status: 500 });
  }
}

// POST: Login endpoint
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const defaultCreds = getDefaultAdminCredentials();
    let isValid = false;
    let userRole = 'superadmin';

    // 1. Check MongoDB Admin collection if DB connected
    const conn = await connectToDatabase();
    if (conn) {
      const dbAdmin = await Admin.findOne({ email: email.toLowerCase().trim() });
      if (dbAdmin) {
        isValid = comparePassword(password, dbAdmin.passwordHash);
        userRole = dbAdmin.role || 'superadmin';
      }
    }

    // 2. Check default master credentials from env/fallback
    if (!isValid) {
      if (
        email.toLowerCase().trim() === defaultCreds.email.toLowerCase().trim() &&
        password === defaultCreds.password
      ) {
        isValid = true;
        userRole = 'superadmin';
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin email or password.' },
        { status: 401 }
      );
    }

    // Generate signed JWT token
    const token = signAdminToken({ email: email.toLowerCase().trim(), role: userRole });

    const response = NextResponse.json({
      success: true,
      message: 'Admin authentication successful',
      admin: {
        email: email.toLowerCase().trim(),
        role: userRole,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      ...AUTH_COOKIE_OPTIONS,
      value: token,
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE: Logout endpoint
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  response.cookies.set({
    ...AUTH_COOKIE_OPTIONS,
    value: '',
    maxAge: 0,
  });

  return response;
}
