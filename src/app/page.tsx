import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Heading } from "@/components/shared/heading";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu, Server, Radio, Zap, Settings, Shield } from "lucide-react";

export default function Home() {
  const capabilities = [
    {
      icon: <Cpu className="h-8 w-8 text-primary" />,
      title: "PLC Programming",
      desc: "Custom logic control design for Siemens, Allen-Bradley, Omron, and Schneider systems.",
    },
    {
      icon: <Server className="h-8 w-8 text-primary" />,
      title: "SCADA & HMI",
      desc: "Real-time industrial interface monitoring, data acquisition, and operations control.",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "VSD & Inverters",
      desc: "Variable Speed Drive configuration for optimization of motor speeds and energy savings.",
    },
    {
      icon: <Settings className="h-8 w-8 text-primary" />,
      title: "Electrical Panels",
      desc: "Design, wiring, and assembly of premium power and control panels under global standards.",
    },
    {
      icon: <Radio className="h-8 w-8 text-primary" />,
      title: "System Integration",
      desc: "Unifying legacy machines and modern IoT setups into one coherent plant network.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Industrial Safety",
      desc: "Safety relay systems, risk assessments, and failsafe programming according to ISO regulations.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section gridBg className="pt-24 pb-20 md:pt-32 md:pb-28 border-b border-border/20">
        <Container className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <span>Specialist Industrial Automation Partner</span>
          </div>
          <Heading
            level={1}
            align="center"
            subtitle="Engineered PLC, SCADA, and Electrical Panel integrations that maximize throughput and minimize factory downtime."
          >
            PT Tirta Surya Cipta
          </Heading>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href="/contact">Inquire Technical Services</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">View Case Studies</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Services/Capabilities Grid Section */}
      <Section className="bg-[#0b0e14]/50 border-b border-border/20">
        <Container>
          <Heading
            level={2}
            align="center"
            subtitle="Providing comprehensive engineering skills to streamline modern assembly lines and process factories."
            className="mb-12"
          >
            Our Core Competencies
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <Card key={cap.title} className="bg-card hover:bg-secondary/40">
                <CardHeader>
                  <div className="mb-4">{cap.icon}</div>
                  <CardTitle className="text-xl text-white">{cap.title}</CardTitle>
                  <CardDescription className="pt-2">{cap.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
