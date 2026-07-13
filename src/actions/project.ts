"use server";

import { projectSchema } from "@/lib/validations/project";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData | any) {
  try {
    let data;
    if (formData instanceof FormData) {
      data = {
        ...Object.fromEntries(formData.entries()),
        highlights: formData.getAll("highlights"),
        galleryImages: formData.getAll("galleryImages"),
      };
    } else {
      data = formData;
    }

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

    return { success: true, message: "Proyek berhasil dibuat" };
  } catch (error) {
    console.error("Error di createProject:", error);
    return { error: "Terjadi kesalahan saat menyimpan proyek." };
  }
}
