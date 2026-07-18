import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    return NextResponse.redirect(new URL("/admin/login", req.url));
}

export async function GET(req: Request) {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    return NextResponse.redirect(new URL("/admin/login", req.url));
}