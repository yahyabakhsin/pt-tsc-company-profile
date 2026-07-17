"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { HeroData } from "../data";

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

interface HeroProps {
  data: HeroData;
  slug: string;
}

export default function Hero({ data, slug }: HeroProps) {
  const { ref, visible } = useInView(0.1);

  // Build breadcrumb label from slug
  const breadcrumbLabel = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <section ref={ref} className="relative min-h-[75vh] flex flex-col justify-center bg-[#071A14] overflow-hidden">
      {/* Background Image */}
      <Image
        src={data.heroImage}
        alt={data.heading}
        fill
        className="object-cover opacity-40 mix-blend-luminosity"
        priority
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071A14]/95 via-[#071A14]/70 to-[#071A14]/30 z-[1]" />

      <div className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-20 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/about#capabilities" className="hover:text-white transition-colors">About TSC</Link>
          <ChevronRight size={12} />
          <span className="text-[#59D66F] font-semibold">{breadcrumbLabel}</span>
        </nav>

        {/* Badge */}
        <p className="text-[#59D66F] text-xs font-bold tracking-[0.2em] uppercase mb-5">
          {data.badge}
        </p>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 max-w-3xl whitespace-pre-line">
          {data.heading}
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-10">
          {data.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/quote"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#59D66F] text-[#071A14] text-sm font-bold hover:bg-[#4bc45e] transition-colors"
          >
            Request a Quote <ArrowRight size={14} />
          </Link>
          <a
            href="https://wa.me/6285159775365"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-white/20 text-white text-sm font-bold hover:bg-white/10 transition-colors"
          >
            <MessageCircle size={14} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
