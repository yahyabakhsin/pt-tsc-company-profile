import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Validasi Input Dasar
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    // 2. Cek User di Database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 3. Verifikasi Kredensial (Gunakan pesan seragam demi keamanan / Mencegah Email Enumeration)
    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, error: "Kredensial tidak valid." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Kredensial tidak valid." },
        { status: 401 }
      );
    }

    // 4. Pastikan Secret Key Tersedia
    const secret = process.env.AUTH_SECRET;
    if (!secret) {
      console.error("[AUTH_ERROR] Missing AUTH_SECRET in environment variables.");
      return NextResponse.json(
        { success: false, error: "Terjadi kesalahan konfigurasi server." },
        { status: 500 }
      );
    }

    // 5. Generate Token
    const token = sign(
      { id: user.id, email: user.email, role: "admin" },
      secret,
      { expiresIn: "7d" }
    );

    // 6. Set HttpOnly Cookie (Aman dari XSS)
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: "/",
    });

    // 7. Response Berhasil
    return NextResponse.json({
      success: true,
      message: "Login berhasil",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: "admin",
      },
    });

  } catch (error) {
    console.error("[LOGIN_CRITICAL_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}