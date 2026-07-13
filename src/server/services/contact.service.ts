import { contactRepository } from "../repositories/contact.repository";
import { contactSchema, ContactInput } from "../validators/contact.validator";

/**
 * Service handling lead capturing and status operations.
 */
export class ContactService {
  async getInquiries() {
    return contactRepository.findAll();
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
      fullName: validatedData.fullName,
      email: validatedData.email,
      companyName: validatedData.companyName || null,
      phone: validatedData.phone || null,
      subject: validatedData.subject,
      serviceType: validatedData.serviceType || null,
      message: validatedData.message,
    });
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
