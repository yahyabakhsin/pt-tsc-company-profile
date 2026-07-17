"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const quoteRequestSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  companyName: z.string().min(2, "Nama perusahaan minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(5, "Nomor telepon minimal 5 karakter"),
  projectScope: z.string().min(10, "Deskripsi kebutuhan minimal 10 karakter"),
});

export async function getContactMessages() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return messages;
  } catch (error) {
    console.error("Error getContactMessages:", error);
    return [];
  }
}

export async function getQuoteRequests() {
  try {
    const quotes = await prisma.quoteRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return quotes;
  } catch (error) {
    console.error("Error getQuoteRequests:", error);
    return [];
  }
}

export async function deleteContactMessage(id: string) {
  try {
    await prisma.contactMessage.delete({
      where: { id },
    });
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Pesan kontak berhasil dihapus" };
  } catch (error) {
    console.error("Error deleteContactMessage:", error);
    return { error: "Gagal menghapus pesan kontak" };
  }
}

export async function deleteQuoteRequest(id: string) {
  try {
    await prisma.quoteRequest.delete({
      where: { id },
    });
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Permintaan quote berhasil dihapus" };
  } catch (error) {
    console.error("Error deleteQuoteRequest:", error);
    return { error: "Gagal menghapus permintaan quote" };
  }
}

export async function submitQuoteRequest(data: any) {
  try {
    const validatedData = quoteRequestSchema.safeParse(data);

    if (!validatedData.success) {
      return { 
        error: "Validasi gagal", 
        details: validatedData.error.flatten().fieldErrors 
      };
    }

    await prisma.quoteRequest.create({
      data: validatedData.data,
    });

    return { success: true, message: "Permintaan quote berhasil dikirim" };
  } catch (error) {
    console.error("Error submitQuoteRequest:", error);
    return { error: "Terjadi kesalahan server saat mengirim quote" };
  }
}
