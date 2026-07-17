"use client";

import { FadeUp } from "@/components/shared/FadeUp";
import { Search, PenTool, Settings, CheckCircle2, Headphones } from "lucide-react";

export function QuoteProcess() {
  const steps = [
    { icon: Search, title: "Discover", desc: "We understand your needs, challenges, and site conditions." },
    { icon: PenTool, title: "Design", desc: "We engineer solutions tailored to your requirements." },
    { icon: Settings, title: "Implement", desc: "We build, integrate, and configure systems with precision and quality." },
    { icon: CheckCircle2, title: "Commission", desc: "We test and commission to ensure optimal performance." },
    { icon: Headphones, title: "Support", desc: "We provide long-term support for system reliability and uptime." }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 relative">
      {/* Connecting line for lg screens */}
      <div className="hidden lg:block absolute top-6 left-16 right-16 h-px bg-gray-300 z-0" />
      
      {steps.map((step, i) => (
        <FadeUp key={i} delay={i * 100} className="relative z-10">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-4 mx-auto lg:mx-0 shadow-sm relative group hover:border-[#1F6B45] transition-colors">
              <step.icon size={20} className="text-[#1F6B45] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-[#1E293B] font-bold text-sm mb-2">{step.title}</h3>
            <p className="text-[#6B7280] text-xs leading-relaxed max-w-[160px]">{step.desc}</p>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}
