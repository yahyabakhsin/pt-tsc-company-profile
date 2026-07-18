"use client";

import { FadeUp } from "@/components/shared/FadeUp";
import { ClipboardList, PenTool, Settings, CheckCircle2, PackageCheck, Headphones } from "lucide-react";

export function ServiceProcess() {
  const steps = [
    { num: "01", icon: ClipboardList, title: "Consultation", desc: "We understand your needs, challenges, and objectives through in-depth discussion." },
    { num: "02", icon: PenTool, title: "Engineering & Design", desc: "Our engineers design solutions tailored to your requirements and standards." },
    { num: "03", icon: Settings, title: "Implementation", desc: "We build, configure, and integrate systems with precision and quality." },
    { num: "04", icon: CheckCircle2, title: "Testing & Commissioning", desc: "We test and commission every system to ensure optimal performance." },
    { num: "05", icon: PackageCheck, title: "Handover & Training", desc: "We hand over the system and provide training for your team." },
    { num: "06", icon: Headphones, title: "Support & Maintenance", desc: "We stay with you for continuous support and long-term reliability." }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative">
      {/* Connecting line for lg screens */}
      <div className="hidden lg:block absolute top-6 left-10 right-10 h-px bg-gray-200 z-0" />
      
      {steps.map((step, i) => (
        <FadeUp key={i} delay={i * 100} className="relative z-10">
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-white border-2 border-gray-100 flex items-center justify-center mb-5 shrink-0 mx-auto lg:mx-0">
              <step.icon size={20} className="text-[#1F6B45]" />
            </div>
            <div className="text-center lg:text-left">
              <div className="text-[#1E293B] font-bold text-xl mb-1">{step.num}</div>
              <h3 className="text-[#1E293B] font-bold text-sm mb-2">{step.title}</h3>
              <p className="text-[#6B7280] text-xs leading-relaxed max-w-[180px] mx-auto lg:mx-0">{step.desc}</p>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}
