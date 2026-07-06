import { projectRepository } from "../repositories/project.repository";
import { projectSchema, ProjectInput } from "../validators/project.validator";
import { Prisma } from "@prisma/client";

/**
 * Service handling business logic for Projects.
 */
export class ProjectService {
  async getAllProjects(filters?: { serviceId?: string; take?: number; skip?: number }) {
    return projectRepository.findAll(filters);
  }

  async getProjectBySlug(slug: string) {
    const project = await projectRepository.findBySlug(slug);
    if (!project) {
      throw new Error(`Project with slug "${slug}" not found`);
    }
    return project;
  }

  async getProjectById(id: string) {
    const project = await projectRepository.findById(id);
    if (!project) {
      throw new Error(`Project with ID "${id}" not found`);
    }
    return project;
  }

  async createProject(input: ProjectInput) {
    // Validate input using Zod
    const validatedData = projectSchema.parse(input);

    // Check slug uniqueness
    const existing = await projectRepository.findBySlug(validatedData.slug);
    if (existing) {
      throw new Error(`A project with slug "${validatedData.slug}" already exists`);
    }

    // Map input to Prisma create parameters
    const createData: Prisma.ProjectCreateInput = {
      title: validatedData.title,
      slug: validatedData.slug,
      description: validatedData.description,
      content: validatedData.content,
      client: validatedData.client,
      location: validatedData.location,
      completedAt: validatedData.completedAt ? new Date(validatedData.completedAt) : null,
      status: validatedData.status,
      service: validatedData.serviceId
        ? { connect: { id: validatedData.serviceId } }
        : undefined,
      images: validatedData.imageUrls.length > 0
        ? {
            create: validatedData.imageUrls.map((url, index) => ({
              url,
              isFeatured: index === 0,
            })),
          }
        : undefined,
      applicationAreas: validatedData.applicationAreaIds.length > 0
        ? {
            connect: validatedData.applicationAreaIds.map((id) => ({ id })),
          }
        : undefined,
    };

    return projectRepository.create(createData);
  }

  async updateProject(id: string, input: Partial<ProjectInput>) {
    const project = await projectRepository.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }

    // Validate input partial schema
    const validatedData = projectSchema.partial().parse(input);

    if (validatedData.slug && validatedData.slug !== project.slug) {
      const existing = await projectRepository.findBySlug(validatedData.slug);
      if (existing) {
        throw new Error(`A project with slug "${validatedData.slug}" already exists`);
      }
    }

    // Prepare updates
    const updateData: Prisma.ProjectUpdateInput = {
      title: validatedData.title,
      slug: validatedData.slug,
      description: validatedData.description,
      content: validatedData.content,
      client: validatedData.client,
      location: validatedData.location,
      completedAt: validatedData.completedAt
        ? new Date(validatedData.completedAt)
        : validatedData.completedAt === ""
        ? null
        : undefined,
      status: validatedData.status,
      service: validatedData.serviceId !== undefined
        ? validatedData.serviceId
          ? { connect: { id: validatedData.serviceId } }
          : { disconnect: true }
        : undefined,
      // More complex relationships like images can be handled via repository extension
    };

    return projectRepository.update(id, updateData);
  }

  async deleteProject(id: string) {
    const project = await projectRepository.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }
    return projectRepository.delete(id);
  }
}

export const projectService = new ProjectService();
