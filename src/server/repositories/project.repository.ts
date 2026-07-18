import { prisma } from "../db/prisma";
import { Prisma } from "@prisma/client";

/**
 * Data access repository for the Project model.
 */
export class ProjectRepository {
  async findAll(options?: {
    take?: number;
    skip?: number;
  }) {
    return prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: options?.take,
      skip: options?.skip,
    });
  }

  async findById(id: string) {
    return prisma.project.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string) {
    return prisma.project.findUnique({
      where: { slug },
    });
  }

  async create(data: Prisma.ProjectCreateInput) {
    return prisma.project.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ProjectUpdateInput) {
    return prisma.project.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.project.delete({
      where: { id },
    });
  }
}

export const projectRepository = new ProjectRepository();
