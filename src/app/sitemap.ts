import { MetadataRoute } from "next";
import { projectRepository } from "@/server/repositories/project.repository";

/**
 * Standard Next.js XML Sitemap generation containing static routes and projects database nodes
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.tirtasuryacipta.com";

  // Static routes
  const routes = ["", "/about", "/projects", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic projects routes
  let projectRoutes: any[] = [];
  try {
    const projects = await projectRepository.findAll();
    projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Failed to compile sitemap projects:", error);
  }

  return [...routes, ...projectRoutes];
}
