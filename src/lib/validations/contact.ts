import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  companyName: z.string().optional(),
  email: z.string().email("Email tidak valid"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subjek minimal 5 karakter"),
  serviceType: z.string().optional(),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
