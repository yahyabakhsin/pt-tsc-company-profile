import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/shared/heading";
import { Card, CardContent } from "@/components/ui/card";
import { projectService } from "@/server/services/project.service";
import { ArrowLeft, Calendar, User, MapPin } from "lucide-react";

export const revalidate = 60; // Cache details for 1 minute

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let project;
  try {
    project = await projectService.getProjectBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <Container className="py-12">
      <Link href="/projects" className="inline-flex items-center space-x-2 text-sm hover:text-primary mb-6 transition-colors text-muted-foreground">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Portfolio</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Heading level={1} subtitle={project.description}>
            {project.title}
          </Heading>

          {/* Project Details / Article Content */}
          <div className="border-t border-border/40 pt-6">
            <h3 className="text-white font-semibold text-lg mb-3">Project Narrative</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {project.content || "Detailed project documentation is being compiled by our automation engineers."}
            </p>
          </div>
        </div>

        {/* Sidebar Specifications */}
        <div className="space-y-6">
          <Card className="bg-[#0b0e14]/40 border-border">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-white font-bold text-base border-b border-border/40 pb-2">
                Technical Specifications
              </h3>
              
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <User className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Client / Industry</p>
                  <p className="font-semibold text-white">{project.client || "Confidential Manufacturer"}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-semibold text-white">{project.location || "Indonesia"}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Calendar className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Completion Date</p>
                  <p className="font-semibold text-white">
                    {project.completedAt
                      ? new Date(project.completedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })
                      : "Ongoing Integration"}
                  </p>
                </div>
              </div>

              {/* Service Related */}
              {project.service && (
                <div className="pt-2 border-t border-border/40">
                  <p className="text-xs text-gray-500 mb-2">Core Service Category</p>
                  <Badge variant="primary">{project.service.name}</Badge>
                </div>
              )}

              {/* Application Areas */}
              {project.applicationAreas.length > 0 && (
                <div className="pt-2 border-t border-border/40">
                  <p className="text-xs text-gray-500 mb-2">Application Areas</p>
                  <div className="flex flex-wrap gap-2">
                    {project.applicationAreas.map((area) => (
                      <Badge key={area.id} variant="secondary">
                        {area.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Button size="lg" className="w-full" asChild>
            <Link href="/contact?ref=project">Inquire Similar Solution</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
