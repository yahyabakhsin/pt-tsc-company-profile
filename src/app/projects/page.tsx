import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Heading } from "@/components/shared/heading";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { projectService } from "@/server/services/project.service";

// Enable dynamic rendering since database fetches occur
export const revalidate = 0;

export default async function ProjectsPage() {
  let projects: Awaited<ReturnType<typeof projectService.getAllProjects>> = [];
  try {
    projects = await projectService.getAllProjects();
  } catch (error) {
    console.error("Failed to load projects:", error);
  }

  return (
    <Container className="py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <Heading
          level={1}
          subtitle="Discover our successfully integrated automation projects, custom panels, and plant SCADA upgrades."
        >
          Engineering Portfolio
        </Heading>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          title="No Projects Available"
          description="We are currently compiling our latest case studies. Please check back soon or contact us directly."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col h-full bg-card hover:bg-[#0f131a]/80">
              <CardHeader className="flex-grow">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                    {project.services || "System Integration"}
                  </span>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                    {project.projectYear}
                  </span>
                </div>
                <CardTitle className="text-xl line-clamp-1">{project.title}</CardTitle>
                <CardDescription className="pt-2 line-clamp-3">
                  {project.overview}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/projects/${project.slug}`}>View Case Study &rarr;</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
