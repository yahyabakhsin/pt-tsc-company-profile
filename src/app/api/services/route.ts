import { NextResponse } from "next/server";
import { serviceService } from "@/server/services/service.service";

/**
 * Route handler for GET /api/services
 */

export async function GET() {
  try {
    const services = await serviceService.getAllServices(true);
    
    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch services" },
      { status: 500 }
    );
  }
}
