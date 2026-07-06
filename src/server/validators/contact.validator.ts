import { z } from "zod";

/**
 * Zod validation schema for contact message / lead inquiries
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Must be a valid email address"),
  company: z
    .string()
    .max(100, "Company name must be under 100 characters")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .max(20, "Phone number must be under 20 characters")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .max(150, "Subject must be under 150 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;
