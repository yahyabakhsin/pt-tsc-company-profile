"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function createPartner(formData: FormData) {
  try {
    const name = formData.get("name")?.toString();
    const logoFile = formData.get("logoFile") as File | null;

    if (!name || !logoFile || logoFile.size === 0) {
      return { error: "Nama partner dan file logo wajib diisi" };
    }

    const buffer = Buffer.from(await logoFile.arrayBuffer());
    const logoUrl = await uploadImageToCloudinary(buffer, "partners");

    await prisma.partner.create({
      data: {
        name,
        logoUrl,
      },
    });

    revalidatePath("/about");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Partner berhasil ditambahkan" };
  } catch (error) {
    console.error("Error createPartner:", error);
    return { error: "Gagal menambahkan partner" };
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
  } catch (error) {
    console.error("Error getPartners:", error);
    return [];
  }
}

export async function updatePartnerOrder(id: string, newOrder: number) {
  try {
    await prisma.partner.update({
      where: { id },
      data: { displayOrder: newOrder },
    });
    revalidatePath("/about");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Urutan partner diperbarui" };
  } catch (error) {
    console.error("Error updatePartnerOrder:", error);
    return { error: "Gagal memperbarui urutan partner" };
  }
}

export async function deletePartner(id: string) {
  try {
    await prisma.partner.delete({
      where: { id },
    });
    revalidatePath("/about");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Partner berhasil dihapus" };
  } catch (error) {
    console.error("Error deletePartner:", error);
    return { error: "Gagal menghapus partner" };
  }
}
