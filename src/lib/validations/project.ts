import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Judul diperlukan"),
  slug: z.string().min(1, "Slug diperlukan"),
  overview: z.string().min(1, "Overview diperlukan"),
  location: z.string().min(1, "Lokasi diperlukan"),
  projectYear: z.coerce.number().int().min(1900, "Tahun proyek tidak valid"),
  industryType: z.string().min(1, "Tipe industri diperlukan"),
  applicationType: z.string().min(1, "Tipe aplikasi diperlukan"),
  projectType: z.string().min(1, "Tipe proyek diperlukan"),
  services: z.string().min(1, "Layanan diperlukan"),
  challenge: z.string().min(1, "Tantangan diperlukan"),
  solution: z.string().min(1, "Solusi diperlukan"),
  result: z.string().min(1, "Hasil diperlukan"),
  highlights: z.array(z.string()).default([]),
  thumbnailImage: z.string().url("URL thumbnail tidak valid"),
  galleryImages: z.array(z.string().url("URL galeri tidak valid")).default([]),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
