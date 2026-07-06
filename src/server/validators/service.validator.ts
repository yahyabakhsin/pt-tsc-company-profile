import { z } from "zod";

/**
 * Zod validation schema for service CRUD operations
 */
export const serviceSchema = z.object({
  name: z
    .string()
    .min(3, "Service name must be at least 3 characters")
    .max(100, "Service name must be under 100 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase alphanumeric characters and hyphens")
    .max(100, "Slug must be under 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be under 500 characters"),
  content: z
    .string()
    .optional()
    .or(z.literal("")),
  icon: z
    .string()
    .optional()
    .or(z.literal("")),
  isActive: z
    .boolean()
    .default(true),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
