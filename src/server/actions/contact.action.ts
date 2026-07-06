"use server";

import { contactSchema } from "../validators/contact.validator";
import { contactService } from "../services/contact.service";
import { ActionResponse } from "./auth.action";

/**
 * Server action to handle public lead inquiries
 */
export async function submitContactAction(
  prevState: any,
  formData: FormData
): Promise<ActionResponse<any>> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    company: formData.get("company") as string,
    phone: formData.get("phone") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const validation = contactSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      message: "Please correct the mistakes in the form",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const lead = await contactService.submitContactForm(validation.data);
    return {
      success: true,
      message: "Your message has been sent successfully. Our team will contact you shortly.",
      data: { id: lead.id },
    };
  } catch (error: any) {
    console.error("Contact Form Action Error:", error);
    return {
      success: false,
      message: error.message || "Something went wrong while sending your message. Please try again.",
    };
  }
}
