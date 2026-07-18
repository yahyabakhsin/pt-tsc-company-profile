"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Building2, Clock, Wrench, AlertTriangle, Settings, CheckCircle2 } from "lucide-react";
import type { FeaturedProjectData } from "../data";

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

interface FeaturedProjectProps {
  data: FeaturedProjectData;
}

export default function FeaturedProject({ data }: FeaturedProjectProps) {
  const { ref, visible } = useInView();

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Badge */}
        <div className={`mb-10 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
            {data.badge}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] leading-tight max-w-3xl">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Project Image */}
          <div className={`lg:col-span-1 transition-all duration-700 ease-out delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-gray-100">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Middle: Content */}
          <div className={`lg:col-span-1 space-y-5 transition-all duration-700 ease-out delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Overview */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Project Overview</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{data.overview}</p>
            </div>

            {/* Challenge */}
            <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-amber-500" />
                <h4 className="text-amber-600 text-xs font-bold uppercase">Challenge</h4>
              </div>
              <p className="text-[#1E293B] text-xs leading-relaxed">{data.challenge}</p>
            </div>

            {/* Solution */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Settings size={14} className="text-blue-500" />
                <h4 className="text-blue-600 text-xs font-bold uppercase">Solution</h4>
              </div>
              <p className="text-[#1E293B] text-xs leading-relaxed">{data.solution}</p>
            </div>

            {/* Result */}
            <div className="rounded-xl border border-[#2E8B57]/20 bg-[#DDE9E2]/40 p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={14} className="text-[#1F6B45]" />
                <h4 className="text-[#1F6B45] text-xs font-bold uppercase">Result</h4>
              </div>
              <p className="text-[#1E293B] text-xs leading-relaxed">{data.result}</p>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className={`lg:col-span-1 transition-all duration-700 ease-out delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="bg-[#F7F9F8] border border-gray-100 rounded-2xl p-6 space-y-5 sticky top-24">
              <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wide pb-3 border-b border-gray-200">
                Project Details
              </h4>

              <div className="space-y-4">
                {[
                  { icon: Building2, label: "Industry", value: data.sidebar.industry },
                  { icon: MapPin, label: "Location", value: data.sidebar.location },
                  { icon: Clock, label: "Duration", value: data.sidebar.duration },
                  { icon: Wrench, label: "Scope", value: data.sidebar.scope },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                      <item.icon size={14} className="text-[#1F6B45]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">{item.label}</p>
                      <p className="text-xs font-bold text-[#1E293B]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* View Project Button */}
              <Link
                href={`/projects/${data.slug}`}
                className="mt-4 inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg bg-[#1F6B45] text-white text-xs font-bold hover:bg-[#1a5c3b] transition-colors"
              >
                View Project Detail <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
