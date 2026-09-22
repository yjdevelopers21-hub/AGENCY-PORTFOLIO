import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'yj_developers_default_jwt_secret_key_2026';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yjdevelopers.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123456';
const TOKEN_COOKIE_NAME = 'yj_admin_token';

export interface AdminPayload {
  email: string;
  role: 'superadmin' | 'admin';
  iat?: number;
  exp?: number;
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function signAdminToken(payload: { email: string; role?: string }): string {
  return jwt.sign(
    {
      email: payload.email,
      role: payload.role || 'superadmin',
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    return decoded;
  } catch {
    return null;
  }
}

export async function getAuthenticatedAdmin(): Promise<AdminPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

    if (!token) return null;
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}

export function getDefaultAdminCredentials() {
  return {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  };
}

export const AUTH_COOKIE_OPTIONS = {
  name: TOKEN_COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
};
