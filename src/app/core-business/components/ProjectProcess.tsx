"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { ProcessStep } from "../data";

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

interface ProjectProcessProps {
  steps: ProcessStep[];
}

export default function ProjectProcess({ steps }: ProjectProcessProps) {
  const { ref, visible } = useInView();

  return (
    <section ref={ref} className="py-24 bg-[#F7F9F8] border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            OUR PROJECT PROCESS
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E293B] leading-tight max-w-3xl mx-auto">
            A structured workflow to ensure quality, transparency, and project success.
          </h2>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:grid grid-cols-6 gap-0 relative">
          {/* Connector line */}
          <div className="absolute top-[38px] left-[8%] right-[8%] h-[2px] bg-gray-200 z-0" />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center relative z-10 px-2 transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              {/* Step Number Circle */}
              <div className="w-[76px] h-[76px] rounded-2xl bg-white border-2 border-gray-200 flex flex-col items-center justify-center mb-4 shadow-sm hover:border-[#59D66F] hover:shadow-md transition-all duration-300">
                <span className="text-[#1F6B45] text-lg font-bold">{step.step}</span>
              </div>

              {/* Arrow connector (except last) */}
              {i < steps.length - 1 && (
                <div className="absolute top-[38px] -right-2 z-20 hidden lg:block">
                  <ArrowRight size={14} className="text-gray-300" />
                </div>
              )}

              <h4 className="font-bold text-[#1E293B] text-xs mb-2">{step.title}</h4>
              <p className="text-gray-500 text-[10px] leading-relaxed px-1">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden relative pl-8">
          {/* Vertical connector line */}
          <div className="absolute top-0 bottom-0 left-[22px] w-[2px] bg-gray-200" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex gap-5 transition-all duration-700 ease-out ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + i * 80}ms` }}
              >
                {/* Step Circle */}
                <div className="absolute -left-8 w-11 h-11 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm shrink-0 z-10">
                  <span className="text-[#1F6B45] text-sm font-bold">{step.step}</span>
                </div>

                {/* Content */}
                <div className="pl-8 pb-2">
                  <h4 className="font-bold text-[#1E293B] text-sm mb-1">{step.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
