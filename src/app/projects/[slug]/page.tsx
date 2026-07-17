import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
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
          <Heading level={1} subtitle={project.overview}>
            {project.title}
          </Heading>

          {/* Project Details / Article Content */}
          <div className="border-t border-border/40 pt-6 space-y-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-3">Challenge</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.challenge || "Project details being compiled."}
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold text-lg mb-3">Solution</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.solution || "Project details being compiled."}
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold text-lg mb-3">Result</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.result || "Project details being compiled."}
              </p>
            </div>
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
                  <p className="text-xs text-gray-500">Industry</p>
                  <p className="font-semibold text-white">{project.industryType || "Confidential Manufacturer"}</p>
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
                  <p className="text-xs text-gray-500">Project Year</p>
                  <p className="font-semibold text-white">
                    {project.projectYear || "Ongoing"}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-border/40">
                <p className="text-xs text-gray-500 mb-2">Core Service Category</p>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                  {project.services}
                </span>
              </div>

              <div className="pt-2 border-t border-border/40">
                <p className="text-xs text-gray-500 mb-2">Application Type</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    {project.applicationType}
                  </span>
                </div>
              </div>
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
