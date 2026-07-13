import { prisma } from "../db/prisma";
import { Prisma } from "@prisma/client";

/**
 * Data access repository for contact messages (leads).
 */
export class ContactRepository {
  async findAll() {
    return prisma.contactMessage.findMany({
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

  async delete(id: string) {
    return prisma.contactMessage.delete({
      where: { id },
    });
  }
}

export const contactRepository = new ContactRepository();
