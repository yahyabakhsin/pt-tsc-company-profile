import { serviceRepository } from "../repositories/service.repository";
import { serviceSchema, ServiceInput } from "../validators/service.validator";
import { Prisma } from "@prisma/client";

/**
 * Service handling business logic for Services.
 */
export class ServiceService {
  async getAllServices(onlyActive: boolean = true) {
    return serviceRepository.findAll(onlyActive);
  }

  async getServiceBySlug(slug: string) {
    const service = await serviceRepository.findBySlug(slug);
    if (!service) {
      throw new Error(`Service with slug "${slug}" not found`);
    }
    return service;
  }

  async getServiceById(id: string) {
    const service = await serviceRepository.findById(id);
    if (!service) {
      throw new Error(`Service with ID "${id}" not found`);
    }
    return service;
  }

  async createService(input: ServiceInput) {
    const validatedData = serviceSchema.parse(input);

    const existing = await serviceRepository.findBySlug(validatedData.slug);
    if (existing) {
      throw new Error(`Service with slug "${validatedData.slug}" already exists`);
    }

    const createData: Prisma.ServiceCreateInput = {
      name: validatedData.name,
      slug: validatedData.slug,
      description: validatedData.description,
      content: validatedData.content,
      icon: validatedData.icon,
      isActive: validatedData.isActive,
    };

    return serviceRepository.create(createData);
  }

  async updateService(id: string, input: Partial<ServiceInput>) {
    const service = await serviceRepository.findById(id);
    if (!service) {
      throw new Error("Service not found");
    }

    const validatedData = serviceSchema.partial().parse(input);

    if (validatedData.slug && validatedData.slug !== service.slug) {
      const existing = await serviceRepository.findBySlug(validatedData.slug);
      if (existing) {
        throw new Error(`Service with slug "${validatedData.slug}" already exists`);
      }
    }

    const updateData: Prisma.ServiceUpdateInput = {
      name: validatedData.name,
      slug: validatedData.slug,
      description: validatedData.description,
      content: validatedData.content,
      icon: validatedData.icon,
      isActive: validatedData.isActive,
    };

    return serviceRepository.update(id, updateData);
  }

  async deleteService(id: string) {
    const service = await serviceRepository.findById(id);
    if (!service) {
      throw new Error("Service not found");
    }
    return serviceRepository.delete(id);
  }
}

export const serviceService = new ServiceService();
