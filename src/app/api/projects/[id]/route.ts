import { NextResponse } from "next/server";
import { projectService } from "@/server/services/project.service";

/**
 * Route handler for /api/projects/[id]
 */

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await projectService.getProjectById(id);
    
    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Project not found" },
      { status: 404 }
    );
  }
}
