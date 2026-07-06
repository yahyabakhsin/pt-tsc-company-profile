import { contactRepository } from "../repositories/contact.repository";
import { contactSchema, ContactInput } from "../validators/contact.validator";
import { MessageStatus } from "@prisma/client";

/**
 * Service handling lead capturing and status operations.
 */
export class ContactService {
  async getInquiries(status?: MessageStatus) {
    return contactRepository.findAll(status);
  }

  async getInquiryById(id: string) {
    const inquiry = await contactRepository.findById(id);
    if (!inquiry) {
      throw new Error("Inquiry message not found");
    }
    return inquiry;
  }

  async submitContactForm(input: ContactInput) {
    // Validate inputs
    const validatedData = contactSchema.parse(input);

    // Save message to database
    return contactRepository.create({
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company || null,
      phone: validatedData.phone || null,
      subject: validatedData.subject || "Lead Inquiry from PT TSC website",
      message: validatedData.message,
      status: "UNREAD",
    });
  }

  async updateInquiryStatus(id: string, status: MessageStatus) {
    const inquiry = await contactRepository.findById(id);
    if (!inquiry) {
      throw new Error("Inquiry message not found");
    }
    return contactRepository.updateStatus(id, status);
  }

  async deleteInquiry(id: string) {
    const inquiry = await contactRepository.findById(id);
    if (!inquiry) {
      throw new Error("Inquiry message not found");
    }
    return contactRepository.delete(id);
  }
}

export const contactService = new ContactService();
