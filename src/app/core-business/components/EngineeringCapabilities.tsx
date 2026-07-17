"use client";

import { useEffect, useRef, useState } from "react";
import type { Capability } from "../data";

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface EngineeringCapabilitiesProps {
  capabilities: Capability[];
  sectionTitle?: string;
}

export default function EngineeringCapabilities({
  capabilities,
  sectionTitle = "OUR ENGINEERING CAPABILITIES",
}: EngineeringCapabilitiesProps) {
  const { ref, visible } = useInView();

  return (
    <section ref={ref} className="py-20 bg-[#F7F9F8] border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`text-center mb-14 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
            {sectionTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={i}
                className={`bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4 hover:border-[#59D66F]/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${150 + i * 60}ms` }}
              >
                <div className="w-11 h-11 rounded-lg bg-[#F7F9F8] border border-gray-100 flex items-center justify-center">
                  <Icon size={20} className="text-[#1F6B45]" />
                </div>
                <h3 className="font-bold text-[#1E293B] text-sm leading-snug">
                  {cap.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {cap.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
