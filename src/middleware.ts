import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil token dari cookie yang diset oleh API Login tadi
  const token = request.cookies.get('admin_token')?.value;
  const { pathname } = request.nextUrl;

  const isAccessingDashboard = pathname.startsWith('/admin/dashboard');
  const isAccessingLogin = pathname === '/admin/login';

  // Skenario 1: Belum login tapi maksa masuk halaman dashboard -> Lempar ke Login
  if (isAccessingDashboard && !token) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Skenario 2: Sudah login (punya token) tapi malah buka halaman login -> Lempar ke Dashboard
  if (isAccessingLogin && token) {
    const dashboardUrl = new URL('/admin/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Lanjutkan perjalanan jika tidak ada masalah
  return NextResponse.next();
}

// Konfigurasi: Middleware ini hanya berjaga di rute yang berawalan /admin
export const config = {
  matcher: ['/admin/:path*'],
};