"use server";

import { projectSchema } from "@/lib/validations/project";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function createProject(formData: FormData) {
  try {
    // Extract thumbnail
    const thumbnailFile = formData.get("thumbnailFile") as File | null;
    let thumbnailUrl = "";
    
    if (thumbnailFile && thumbnailFile.size > 0) {
      const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
      thumbnailUrl = await uploadImageToCloudinary(buffer, "projects/thumbnails");
    }

    // Extract galleries
    const galleryFiles = formData.getAll("galleryFiles") as File[];
    const galleryImages: string[] = [];
    
    for (const file of galleryFiles) {
      if (file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const url = await uploadImageToCloudinary(buffer, "projects/galleries");
        galleryImages.push(url);
      }
    }

    const data = {
      title: formData.get("title")?.toString() || "",
      slug: formData.get("slug")?.toString() || "",
      overview: formData.get("overview")?.toString() || "",
      location: formData.get("location")?.toString() || "",
      projectYear: parseInt(formData.get("projectYear")?.toString() || "0", 10),
      industryType: formData.get("industryType")?.toString() || "",
      applicationType: formData.get("applicationType")?.toString() || "",
      projectType: formData.get("projectType")?.toString() || "",
      services: formData.get("services")?.toString() || "",
      challenge: formData.get("challenge")?.toString() || "",
      solution: formData.get("solution")?.toString() || "",
      result: formData.get("result")?.toString() || "",
      highlights: formData.getAll("highlights").map(h => h.toString()),
      thumbnailImage: thumbnailUrl || formData.get("thumbnailImage")?.toString() || "",
      galleryImages: galleryImages.length > 0 ? galleryImages : formData.getAll("galleryImages").map(g => g.toString()),
    };

    const validatedData = projectSchema.safeParse(data);

    if (!validatedData.success) {
      return { 
        error: "Validasi gagal", 
        details: validatedData.error.flatten().fieldErrors 
      };
    }

    await prisma.project.create({
      data: validatedData.data,
    });

    revalidatePath("/projects");
    revalidatePath("/admin/dashboard");

    return { success: true, message: "Proyek berhasil dibuat" };
  } catch (error) {
    console.error("Error di createProject:", error);
    return { error: "Terjadi kesalahan saat menyimpan proyek." };
  }
}

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      }
    });
    return projects;
  } catch (error) {
    console.error("Error getProjects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });
    if (project?.deletedAt) return null;
    return project;
  } catch (error) {
    console.error("Error getProjectBySlug:", error);
    return null;
  }
}

export async function updateProject(id: string, data: any) {
  try {
    await prisma.project.update({
      where: { id },
      data,
    });
    revalidatePath("/projects");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Proyek berhasil diperbarui" };
  } catch (error) {
    console.error("Error updateProject:", error);
    return { error: "Terjadi kesalahan saat memperbarui proyek" };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
    revalidatePath("/projects");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Proyek berhasil dihapus" };
  } catch (error) {
    console.error("Error deleteProject:", error);
    return { error: "Terjadi kesalahan saat menghapus proyek" };
  }
}
