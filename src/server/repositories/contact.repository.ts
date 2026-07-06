import { prisma } from "../db/prisma";
import { Prisma, MessageStatus } from "@prisma/client";

/**
 * Data access repository for contact messages (leads).
 */
export class ContactRepository {
  async findAll(status?: MessageStatus) {
    return prisma.contactMessage.findMany({
      where: status ? { status } : {},
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.contactMessage.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ContactMessageCreateInput) {
    return prisma.contactMessage.create({
      data,
    });
  }

  async updateStatus(id: string, status: MessageStatus) {
    return prisma.contactMessage.update({
      where: { id },
      data: { status },
    });
  }

  async delete(id: string) {
    return prisma.contactMessage.delete({
      where: { id },
    });
  }
}

export const contactRepository = new ContactRepository();
