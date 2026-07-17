"use client";

import { FadeUp } from "@/components/shared/FadeUp";
import { Settings, Zap, Cpu, Target, Headphones, CheckCircle2 } from "lucide-react";

export function CapabilitiesGrid() {
  const capabilities = [
    { 
      icon: Zap, 
      title: "VSD / Inverter Systems", 
      desc: "Advanced motor control solutions for energy efficiency and performance." 
    },
    { 
      icon: Cpu, 
      title: "PLC & Automation Systems", 
      desc: "Reliable automation systems designed for precision and productivity." 
    },
    { 
      icon: Settings, 
      title: "Control Panel Integration", 
      desc: "Custom-built control panels engineered to meet industrial standards." 
    },
    { 
      icon: Target, 
      title: "System Integration", 
      desc: "Seamless integration of electrical, instrumentation, and control systems." 
    },
    { 
      icon: CheckCircle2, 
      title: "Commisioning", 
      desc: "Professional testing and commissioning to ensure optimal system performance." 
    },
    { 
      icon: Headphones, 
      title: "Technical Support", 
      desc: "Responsive technical support to ensure system reliability and continuity." 
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((cap, i) => (
        <FadeUp key={i} delay={i * 100}>
          <div className={`p-8 border-[#2E8B57]/30 border-b h-full flex flex-col hover:bg-[#111c17] transition-all duration-300 
            ${(i + 1) % 3 === 0 ? 'lg:border-r-0' : 'lg:border-r'} 
            ${i >= 3 ? 'lg:border-b-0' : 'lg:border-b'}
            ${(i + 1) % 2 === 0 ? 'sm:border-r-0' : 'sm:border-r'}
            ${i >= 4 ? 'sm:border-b-0' : 'sm:border-b'}
            ${i === 5 ? 'border-b-0' : ''}
          `}>
            <cap.icon size={32} className="text-[#59D66F] mb-6" strokeWidth={1.5} />
            <h3 className="text-white font-bold text-lg mb-3">{cap.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{cap.desc}</p>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}
