"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { coreBusinessNavItems } from "../data";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.12) {
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

export default function BusinessOverview() {
  const pathname = usePathname();
  const { ref, visible } = useInView(0.1);

  return (
    <section ref={ref} className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`text-center mb-12 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
            EXPLORE OUR CORE BUSINESS
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {coreBusinessNavItems.map((item, i) => {
            const isActive = pathname === `/core-business/${item.slug}`;
            const Icon = item.navIcon;

            return (
              <Link
                key={item.slug}
                href={`/core-business/${item.slug}`}
                className={`group rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 border ${
                  isActive
                    ? "bg-[#071A14] border-[#1F6B45]/30 text-white shadow-lg"
                    : "bg-white border-gray-200 text-[#1E293B] hover:border-[#59D66F]/40 hover:shadow-md"
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive
                      ? "bg-[#59D66F]/15 border border-[#59D66F]/30"
                      : "bg-[#F7F9F8] border border-gray-100 group-hover:bg-[#DDE9E2]/50"
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-[#59D66F]" : "text-[#1F6B45]"}
                  />
                </div>

                <h3
                  className={`font-bold text-xs leading-snug ${
                    isActive ? "text-white" : "text-[#1E293B]"
                  }`}
                >
                  {item.navLabel}
                </h3>

                <p
                  className={`text-[10px] leading-relaxed line-clamp-2 ${
                    isActive ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {item.navDescription}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
