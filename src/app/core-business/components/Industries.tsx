"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { IndustryCard, Benefit } from "../data";

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

interface IndustriesProps {
  industries: IndustryCard[];
  benefits: Benefit[];
}

export default function Industries({ industries, benefits }: IndustriesProps) {
  const { ref, visible } = useInView();

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Industry Cards Grid */}
          <div className="lg:col-span-3">
            <div className={`mb-8 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
                INDUSTRIES WE SERVE
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {industries.map((ind, i) => (
                <div
                  key={i}
                  className={`group relative rounded-xl overflow-hidden border border-gray-200 aspect-square hover:border-[#59D66F]/40 transition-all duration-300 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${100 + i * 50}ms` }}
                >
                  <Image
                    src={ind.image}
                    alt={ind.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A14]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white text-xs font-bold leading-tight">{ind.name}</h4>
                    <p className="text-gray-300 text-[9px] mt-0.5 leading-tight line-clamp-1">{ind.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Business Benefits */}
          <div className="lg:col-span-2">
            <div className={`bg-[#071A14] rounded-2xl p-8 h-full transition-all duration-700 ease-out delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h3 className="text-[#59D66F] text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
                BUSINESS BENEFITS
              </h3>
              <ul className="space-y-5">
                {benefits.map((benefit, i) => {
                  const Icon = benefit.icon;
                  return (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[#59D66F]/10 border border-[#59D66F]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={16} className="text-[#59D66F]" />
                      </div>
                      <span className="text-white text-sm font-medium leading-snug pt-1.5">{benefit.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
