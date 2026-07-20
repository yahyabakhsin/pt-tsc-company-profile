"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitQuoteRequest(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    
    // Fallback opsional
    const companyName = (formData.get("companyName") as string) || "Tidak disebutkan";
    const phone = (formData.get("phone") as string) || "Tidak disebutkan";
    
    // UBAH DISINI: Gabungkan serviceType dan message ke dalam projectScope
    const serviceType = (formData.get("serviceType") as string) || "Lain-lain";
    const projectScope = `Layanan: ${serviceType}\n\nDetail:\n${message}`;

    // Validasi manual sederhana
    if (!fullName || !email || !message) {
      return { error: "Nama, Email, dan Pesan wajib diisi!" };
    }

    // Simpan ke Database
    const newQuote = await prisma.quoteRequest.create({
      data: {
        fullName,
        email,
        companyName,
        phone,
        projectScope,
      },
    });

    // Refresh tampilan admin
    revalidatePath("/admin/dashboard");
    
    return { success: true, message: "Quote berhasil dikirim!", data: newQuote };

  } catch (error: any) {
    console.error("Quote Error:", error);
    return { error: "Gagal mengirim quote: " + error.message };
  }
}