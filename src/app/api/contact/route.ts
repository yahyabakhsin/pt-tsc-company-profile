import { NextResponse } from "next/server";
import { contactService } from "@/server/services/contact.service";

/**
 * Route handler for POST /api/contact
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lead = await contactService.submitContactForm(body);

    return NextResponse.json({
      success: true,
      message: "Lead inquiry captured successfully",
      data: { id: lead.id },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process message" },
      { status: 400 }
    );
  }
}
