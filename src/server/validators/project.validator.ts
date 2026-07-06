import { z } from "zod";

/**
 * Zod validation schema for project CRUD operations
 */
export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title must be under 150 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase alphanumeric characters and hyphens")
    .max(150, "Slug must be under 150 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be under 500 characters"),
  content: z
    .string()
    .optional()
    .or(z.literal("")),
  client: z
    .string()
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .optional()
    .or(z.literal("")),
  completedAt: z
    .string()
    .datetime({ message: "Completed date must be a valid ISO date" })
    .optional()
    .or(z.literal("")),
  status: z
    .enum(["COMPLETED", "IN_PROGRESS", "PLANNED"])
    .default("COMPLETED"),
  serviceId: z
    .string()
    .uuid("Invalid Service ID")
    .optional()
    .or(z.literal("")),
  imageUrls: z
    .array(z.string().url("Invalid image URL"))
    .optional()
    .default([]),
  applicationAreaIds: z
    .array(z.string().uuid("Invalid Application Area ID"))
    .optional()
    .default([]),
});

export type ProjectInput = z.infer<typeof projectSchema>;
