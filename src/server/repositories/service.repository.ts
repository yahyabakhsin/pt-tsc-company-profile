import { prisma } from "../db/prisma";
import { Prisma } from "@prisma/client";

/**
 * Data access repository for the Service model.
 */
export class ServiceRepository {
  async findAll(onlyActive: boolean = true) {
    return prisma.service.findMany({
      where: onlyActive ? { isActive: true } : {},
      include: {
        _count: {
          select: { projects: true },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.service.findUnique({
      where: { id },
      include: {
        projects: {
          include: {
            images: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.service.findUnique({
      where: { slug },
      include: {
        projects: {
          include: {
            images: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.ServiceCreateInput) {
    return prisma.service.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ServiceUpdateInput) {
    return prisma.service.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.service.delete({
      where: { id },
    });
  }
}

export const serviceRepository = new ServiceRepository();
