"use server";

import { prisma } from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function createPartner(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const displayOrder = parseInt(formData.get("displayOrder") as string) || 1;
    const file = formData.get("logo") as File;

    // 1. Cek apakah file benar-benar ada
    if (!file || file.size === 0) {
      return { error: "File gambar tidak ditemukan!" };
    }

    // 2. Ubah file jadi Buffer (Ini yang sering bikin gagal)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Upload ke Cloudinary
    const imageUrl = await uploadImageToCloudinary(buffer, "partners");

    // 4. Simpan ke database
    const newPartner = await prisma.partner.create({
      data: {
        name,
        logoUrl: imageUrl,
        displayOrder,
      },
    });

    revalidatePath("/about");
    return { success: true, message: "Partner berhasil diupload!", data: newPartner };

  } catch (error: any) {
    console.error("Upload Error:", error);
    return { error: "Gagal upload: " + error.message };
  }
}

export async function getPartners() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: {
        displayOrder: "asc",
      },
    });
    return partners;
  } catch (error: any) {
    console.error("Fetch Error:", error);
    return [];
  }
}