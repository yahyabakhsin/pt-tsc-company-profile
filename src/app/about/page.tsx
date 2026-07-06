import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Heading } from "@/components/shared/heading";
import { Card, CardContent } from "@/components/ui/card";
import { Award, ShieldAlert, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <Container className="py-12">
      {/* Introduction */}
      <Section className="py-8">
        <Heading
          level={1}
          subtitle="A trusted partner in system integration, automation, and high-performance panel wiring."
        >
          About PT Tirta Surya Cipta
        </Heading>
        <p className="text-gray-300 max-w-4xl mt-6 text-base leading-relaxed">
          Founded on rigorous engineering principles, PT Tirta Surya Cipta (PT TSC) delivers enterprise automation solutions across Southeast Asia. We bridge the gap between heavy industrial machines and real-time data monitoring to optimize energy usage and process safety.
        </p>
      </Section>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        <Card className="bg-[#0b0e14]/40">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              To be the premier industrial integrator in the region, recognized for flawless PLC/SCADA configurations, electrical safety, and boosting manufacturing throughput.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0b0e14]/40">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              To provide factories with robust logic code, high-grade control panels, and dependable systems integration that minimizes shutdown durations and guarantees safe operation.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trust factors / Stats */}
      <Section className="py-12 border-t border-border/40">
        <Heading level={2} className="mb-8">
          Why Manufacturers Choose PT TSC
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex space-x-3 items-start">
            <Award className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <h4 className="text-white font-semibold">Certified Engineers</h4>
              <p className="text-sm text-gray-500 mt-1">Our programmers hold official brand certifications for Siemens, Rockwell, and Wonderware SCADA.</p>
            </div>
          </div>

          <div className="flex space-x-3 items-start">
            <ShieldAlert className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <h4 className="text-white font-semibold">Strict Quality Control</h4>
              <p className="text-sm text-gray-500 mt-1">Every panel is tested under load and verified against rigorous IEC regulations before shipment.</p>
            </div>
          </div>

          <div className="flex space-x-3 items-start">
            <Cpu className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <h4 className="text-white font-semibold">Integration Experts</h4>
              <p className="text-sm text-gray-500 mt-1">We successfully connect old relays and telemetry networks with modern ERP and Cloud setups.</p>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
