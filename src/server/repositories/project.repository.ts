import { prisma } from "../db/prisma";
import { Prisma } from "@prisma/client";

/**
 * Data access repository for the Project model.
 */
export class ProjectRepository {
  async findAll(options?: {
    serviceId?: string;
    isActive?: boolean;
    take?: number;
    skip?: number;
  }) {
    const where: Prisma.ProjectWhereInput = {};

    if (options?.serviceId) {
      where.serviceId = options.serviceId;
    }

    return prisma.project.findMany({
      where,
      include: {
        images: true,
        service: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        applicationAreas: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        completedAt: "desc",
      },
      take: options?.take,
      skip: options?.skip,
    });
  }

  async findById(id: string) {
    return prisma.project.findUnique({
      where: { id },
      include: {
        images: true,
        service: true,
        applicationAreas: true,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.project.findUnique({
      where: { slug },
      include: {
        images: true,
        service: true,
        applicationAreas: true,
      },
    });
  }

  async create(data: Prisma.ProjectCreateInput) {
    return prisma.project.create({
      data,
      include: {
        images: true,
      },
    });
  }

  async update(id: string, data: Prisma.ProjectUpdateInput) {
    return prisma.project.update({
      where: { id },
      data,
      include: {
        images: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.project.delete({
      where: { id },
    });
  }
}

export const projectRepository = new ProjectRepository();
