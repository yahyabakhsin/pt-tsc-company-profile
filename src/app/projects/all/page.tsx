import Link from "next/link";
import { notFound } from "next/navigation";
import { projectService } from "@/server/services/project.service";
import { mockProjects, MockProject } from "@/constants/mockProjects";
import {
  Activity, Users, Clock, Monitor,
  MessageSquare, ArrowRight, Wrench,
  Settings, Headphones, Handshake, Building2,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
// Nanti replace dengan Prisma type:
// import { Project } from '@prisma/client'
type Project = {
  id: string;
  slug: string;
  title: string;
  overview: string;
  thumbnail: string;
  industryType: string;
  services: string;
  applicationTag: string; // warna tag
};

// ─── Dummy Data (replace dengan Prisma query) ────────────────────────────────
// Nanti ganti dengan:
// const projects = await prisma.project.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } });
const projects: Project[] = [
  {
    id: '1',
    slug: 'booster-pump-system-upgrade',
    title: 'Booster Pump System Upgrade & Automation',
    overview: 'Integrated VSD system with new control panel and automation for building water supply reliability and efficiency.',
    thumbnail: '/images/projects/project-1.webp',
    industryType: 'Building Utilities',
    services: 'VSD & Automation',
    applicationTag: 'BUILDING UTILITIES',
  },
  {
    id: '2',
    slug: 'water-treatment-plant-automation',
    title: 'Water Treatment Plant Automation',
    overview: 'PLC and SCADA based automation for filtration backwash, chemical dosing, and monitoring system.',
    thumbnail: '/images/projects/project-2.webp',
    industryType: 'Water Treatment',
    services: 'PLC & SCADA',
    applicationTag: 'WATER TREATMENT',
  },
  {
    id: '3',
    slug: 'conveyor-system-automation',
    title: 'Conveyor System Automation',
    overview: 'Control panel integration and motor control system for conveyor line to improve performance and reliability.',
    thumbnail: '/images/projects/project-3.webp',
    industryType: 'Manufacturing',
    services: 'Control System',
    applicationTag: 'MANUFACTURING',
  },
  {
    id: '4',
    slug: 'water-treatment-plant-automation-2',
    title: 'Water Treatment Plant Automation',
    overview: 'PLC and SCADA based automation for filtration backwash, chemical dosing, and monitoring system.',
    thumbnail: '/images/projects/project-4.webp',
    industryType: 'Water Treatment',
    services: 'PLC & SCADA',
    applicationTag: 'WATER TREATMENT',
  },
  {
    id: '5',
    slug: 'booster-pump-system-upgrade-2',
    title: 'Booster Pump System Upgrade & Automation',
    overview: 'Integrated VSD system with new control panel and automation for building water supply reliability and efficiency.',
    thumbnail: '/images/projects/project-5.webp',
    industryType: 'Building Utilities',
    services: 'VSD & Automation',
    applicationTag: 'BUILDING UTILITIES',
  },
];

const stats = [
  { icon: Activity, value: '15+', label: 'Projects Delivered' },
  { icon: Clock, value: '24/7', label: 'Technical Support Availability' },
  { icon: Users, value: '2', label: 'Technology Partners' },
  { icon: Monitor, value: '10+', label: 'Industrial Application Supported' },
];

const commitments = [
  { icon: Wrench, title: 'Practical Engineering Discussion', desc: 'Solution designed around real operational requirements rather than one-size-fits-all approaches.' },
  { icon: Settings, title: 'Quality Execution', desc: 'Careful implementation, testing, and commissioning to ensure dependable system performance.' },
  { icon: Headphones, title: 'Responsive Technical Support', desc: 'Providing technical assistance and troubleshooting throughout project implementation and beyond.' },
  { icon: Handshake, title: 'Long-Term Partnership', desc: 'Building lasting relationship through reliability, transparency, and consistent engineering support.' },
];

// Tag color map
const tagColors: Record<string, string> = {
  'BUILDING UTILITIES': 'text-emerald-600 bg-emerald-50',
  'WATER TREATMENT': 'text-blue-600 bg-blue-50',
  'MANUFACTURING': 'text-amber-600 bg-amber-50',
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProjectsPage() {
  // TODO: uncomment when Prisma is ready
  // const projects = await prisma.project.findMany({
  //   where: { deletedAt: null },
  //   orderBy: { year: 'desc' },
  // });

  return (
    <main>

      {/* ══ HERO ══ */}
      <section className="relative min-h-[480px] flex items-end bg-[#071A14] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/hero-bg.webp')", mixBlendMode: 'luminosity' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A14]/95 via-[#071A14]/70 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* Left: title */}
            <div className="max-w-lg">
              <p className="text-[#59D66F] text-[11px] font-bold tracking-[0.2em] uppercase mb-3 animate-[fadeUp_0.5s_ease_0.1s_both]">
                PROJECTS
              </p>
              <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight mb-4 animate-[fadeUp_0.6s_ease_0.2s_both]">
                Our Projects
              </h1>
              <div className="w-12 h-1 bg-[#59D66F] rounded mb-4 animate-[fadeUp_0.6s_ease_0.25s_both]" />
              <p className="text-gray-300 text-sm leading-relaxed animate-[fadeUp_0.6s_ease_0.3s_both]">
                Explore our project experience across industrial and utility sectors. Each project reflects our commitment to quality engineering, reliable system integration, and long-term operational performance.
              </p>
            </div>

            {/* Right: stats grid */}
            <div className="w-full lg:w-auto animate-[fadeUp_0.6s_ease_0.4s_both]">
              <div className="grid grid-cols-2 gap-3 bg-[#0d1f17]/80 backdrop-blur-sm border border-[#1F6B45]/30 rounded-2xl p-5">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#2E8B57]/50 bg-[#1F6B45]/20 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#59D66F]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[#59D66F] font-bold text-xl leading-none">{value}</p>
                      <p className="text-gray-400 text-[11px] mt-0.5 leading-snug">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Section header + sidebar CTA */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
            <div className="max-w-md">
              <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">ALL PROJECTS</p>
              <h2 className="text-[#1E293B] text-3xl font-bold mb-3">Our Selected Project</h2>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Browse our complete portfolio of completed projects. Although our portfolio is still growing, every project reflects our commitment to quality engineering, reliable system integration, and long-term operational performance.
              </p>
            </div>

            {/* Quick CTA card */}
            <div className="shrink-0 w-full lg:w-[280px] border border-gray-100 rounded-xl p-5 shadow-sm bg-white">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#DDE9E2] flex items-center justify-center shrink-0">
                  <MessageSquare size={16} className="text-[#1F6B45]" />
                </div>
                <div>
                  <p className="text-[#1E293B] text-sm font-semibold">Have a project in mind?</p>
                  <p className="text-[#6B7280] text-xs">Let's discuss the right solution for you</p>
                </div>
              </div>
              <Link
                href="/quote"
                className="inline-flex items-center gap-1.5 text-[#1F6B45] text-sm font-semibold hover:gap-3 transition-all"
              >
                Request a Quote <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Project grid */}
          {projects.length === 0 ? (
            <div className="text-center py-20 text-[#6B7280]">
              <Building2 size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No projects yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-[#59D66F]/40 hover:shadow-lg transition-all duration-300 flex flex-col"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-[#DDE9E2]">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('${project.thumbnail}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {/* fallback gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#DDE9E2]/40 to-[#b8d0bc]/40" />
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <span className={`inline-block self-start text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-1 rounded mb-3 ${tagColors[project.applicationTag] ?? 'text-[#1F6B45] bg-[#DDE9E2]'}`}>
                      {project.applicationTag}
                    </span>
                    <h3 className="text-[#1E293B] font-bold text-base leading-snug mb-2">{project.title}</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed flex-1">{project.overview}</p>

                    {/* Meta */}
                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-2">
                        <Building2 size={13} className="text-[#6B7280]" />
                        <div>
                          <p className="text-[#6B7280] text-[10px]">Industry</p>
                          <p className="text-[#1E293B] text-xs font-semibold">{project.industryType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings size={13} className="text-[#6B7280]" />
                        <div>
                          <p className="text-[#6B7280] text-[10px]">Service</p>
                          <p className="text-[#1E293B] text-xs font-semibold">{project.services}</p>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 mt-4 text-[#1F6B45] text-sm font-semibold hover:gap-3 transition-all group/link"
                    >
                      View Project <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ ENGINEERING COMMITMENT ══ */}
      <section className="py-16 bg-[#F7F9F8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-[#1F6B45] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">OUR ENGINEERING COMMITMENT</p>
            <h2 className="text-[#1E293B] text-3xl sm:text-4xl font-bold">Practical Engineering. Reliable Solutions.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#DDE9E2] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={18} className="text-[#1F6B45]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[#1E293B] font-bold text-sm mb-1.5">{title}</h3>
                  <p className="text-[#6B7280] text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="py-0">
        <div className="bg-[#071A14]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

              {/* Left: icon + text */}
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full border-2 border-[#1F6B45]/40 bg-[#1F6B45]/10 flex items-center justify-center shrink-0">
                  <Users size={32} className="text-[#59D66F]" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-white text-2xl sm:text-3xl font-bold leading-snug mb-2">
                    Ready to Discuss Your Next Project?
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                    Whether you need a booster pump upgrade, motor control integration, utility system support, or a broader automation solution, our team is ready to help you deliver a reliable and efficient system.
                  </p>
                </div>
              </div>

              {/* Right: buttons */}
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-[#59D66F] text-[#071A14] text-sm font-bold hover:bg-[#4bc45e] transition-colors whitespace-nowrap"
                >
                  Request a Quote →
                </Link>
                <a
                  href="https://wa.me/6285159775365"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg border border-[#59D66F] text-[#59D66F] text-sm font-bold hover:bg-[#59D66F]/10 transition-colors whitespace-nowrap"
                >
                  <img src="https://c.animaapp.com/NrFfujo6/img/ic-baseline-whatsapp.svg" className="w-5 h-5" alt="" aria-hidden />
                  Chat on WhatsApp
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}