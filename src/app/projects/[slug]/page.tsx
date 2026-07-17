import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBanner from '@/components/shared/CtaBanner';
import {
    ArrowLeft, ArrowRight, Calendar, MapPin,
    Building2, Settings, CheckCircle2, AlertCircle,
    Lightbulb, ChevronRight, Activity, BarChart2,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
// Nanti replace dengan Prisma type
type Project = {
    id: string;
    slug: string;
    title: string;
    overview: string;
    thumbnail: string;
    gallery: string[];       // array of image URLs
    industryType: string;
    applicationType: string;
    services: string;
    location: string;
    projectYear: number;
    projectType: string;
    scope: string;
    status: string;
    challenge: string[];     // bullet points
    solution: string[];
    result: string[];
    highlights: string[];
    applicationTag: string;
};

// ─── Dummy Data ───────────────────────────────────────────────────────────────
// Nanti replace dengan:
// const project = await prisma.project.findUnique({ where: { slug, deletedAt: null } });
// if (!project) notFound();
const dummyProjects: Project[] = [
    {
        id: '1',
        slug: 'booster-pump-system-upgrade',
        title: 'Booster Pump System Upgrade & Automation',
        overview: 'Integrated VSD system with new control panel and automation for building water supply reliability and energy efficiency.',
        thumbnail: '/images/projects/project-1.webp',
        gallery: [
            '/images/projects/project-1.webp',
            '/images/projects/project-1.webp',
            '/images/projects/project-1.webp',
            '/images/projects/project-1.webp',
        ],
        industryType: 'Building Utilities',
        applicationType: 'Booster Pump System',
        services: 'VSD & Automation',
        location: 'Bekasi, Indonesia',
        projectYear: 2025,
        projectType: 'System Upgrade',
        scope: 'Design, Supply, Integration, Testing & Commissioning',
        status: 'Completed',
        challenge: [
            'Inconsistent water pressure during peak usage.',
            'High energy consumption due to pumps running at constant speed.',
            'Frequent pump cycling causing mechanical stress and shorter equipment life.',
            'Limited monitoring and no centralized control.',
        ],
        solution: [
            'Installed VSD on each pump top adjust speed based on demand.',
            'Developed PLC based control logic to maintain stable pressure.',
            'Integrated HMI for real-time monitoring and data visualization.',
            'Implemented protection features and alarm notification system.',
        ],
        result: [
            '15% energy savings compared to previous system.',
            'Improved pressure stability and system reliability.',
            'Reduced pump cycling and extended equipment lifespan.',
            'Centralized monitoring with real-time data and alerts.',
        ],
        highlights: [
            '4 Pumps Integrated with VSD Control',
            'PLC + HMI Based Automation',
            'Real-Time Monitoring & Alarm System',
            'Energy Efficient Operation',
            'Improve Pressure Stability',
            'System Protection & Safety Interlock',
        ],
        applicationTag: 'BUILDING UTILITIES',
    },
];

const ctaFeatures = [
    { icon: MapPin, title: 'Consultation & Site Survey', desc: 'We assess your needs on-site' },
    { icon: BarChart2, title: 'Engineering & Solution Design', desc: 'Tailored to your operational goals' },
    { icon: Activity, title: 'Support & After-Sales Service', desc: 'Reliable support for long-term operations' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;
    
    // TODO: replace dengan Prisma query:
    // const project = await prisma.project.findUnique({
    //   where: { slug: resolvedParams.slug, deletedAt: null },
    // });
    // if (!project) notFound();

    const project = dummyProjects.find((p) => p.slug === resolvedParams.slug);
    if (!project) notFound();

    // Related projects (exclude current)
    // TODO: const related = await prisma.project.findMany({ where: { NOT: { slug: resolvedParams.slug }, deletedAt: null }, take: 4 });
    const related = dummyProjects.filter((p) => p.slug !== resolvedParams.slug).slice(0, 4);

    const infoRows = [
        { label: 'Industry', icon: Building2, value: project.industryType },
        { label: 'Application', icon: Settings, value: project.applicationType },
        { label: 'Service', icon: Settings, value: project.services },
        { label: 'Location', icon: MapPin, value: project.location },
        { label: 'Completion Year', icon: Calendar, value: String(project.projectYear) },
        { label: 'Project Type', icon: Activity, value: project.projectType },
        { label: 'Scope', icon: ChevronRight, value: project.scope },
        { label: 'Status', icon: CheckCircle2, value: project.status },
    ];

    return (
        <main>

            {/* ══ HERO ══ */}
            <section className="relative bg-[#071A14] overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                        {/* Left: info */}
                        <div className="py-10">
                            <span className={`inline-block text-[#59D66F] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 opacity-0 animate-[fadeUp_0.5s_ease_0.1s_forwards]`}>
                                {project.applicationTag}
                            </span>
                            <h1 className="text-white text-3xl sm:text-4xl font-bold leading-tight mb-3 opacity-0 animate-[fadeUp_0.6s_ease_0.2s_forwards]">
                                {project.title}
                            </h1>
                            <div className="w-12 h-1 bg-[#59D66F] rounded mb-5 opacity-0 animate-[fadeUp_0.5s_ease_0.25s_forwards]" />
                            <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-md opacity-0 animate-[fadeUp_0.6s_ease_0.3s_forwards]">
                                {project.overview}
                            </p>

                            {/* Meta grid */}
                            <div className="grid grid-cols-2 gap-4 opacity-0 animate-[fadeUp_0.6s_ease_0.4s_forwards]">
                                {[
                                    { icon: Calendar, label: 'Project Year', value: String(project.projectYear) },
                                    { icon: Building2, label: 'Industry', value: project.industryType },
                                    { icon: MapPin, label: 'Location', value: project.location },
                                    { icon: Settings, label: 'Scope', value: project.scope },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#1F6B45]/30 border border-[#2E8B57]/30 flex items-center justify-center shrink-0 mt-0.5">
                                            <Icon size={13} className="text-[#59D66F]" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-[10px] uppercase tracking-wider">{label}</p>
                                            <p className="text-white text-sm font-medium leading-snug">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Back link */}
                            <Link
                                href="/projects/all"
                                className="inline-flex items-center gap-2 mt-8 text-gray-400 text-sm hover:text-[#59D66F] transition-colors opacity-0 animate-[fadeUp_0.5s_ease_0.5s_forwards]"
                            >
                                <ArrowLeft size={14} /> Back to Projects
                            </Link>
                        </div>

                        {/* Right: thumbnail + thumbnail strip */}
                        <div className="flex flex-col gap-3 pt-10 pb-0 opacity-0 animate-[fadeUp_0.6s_ease_0.3s_forwards]">
                            {/* Main image */}
                            <div className="relative h-64 sm:h-80 rounded-t-xl overflow-hidden bg-[#DDE9E2]">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url('${project.thumbnail}')` }}
                                />
                            </div>
                            {/* Thumbnail strip */}
                            <div className="flex gap-2 pb-0">
                                {project.gallery.slice(0, 3).map((img, i) => (
                                    <div
                                        key={i}
                                        className={`relative flex-1 h-20 rounded-lg overflow-hidden bg-[#DDE9E2] cursor-pointer ${i === 0 ? 'ring-2 ring-[#59D66F]' : 'opacity-70 hover:opacity-100 transition-opacity'}`}
                                    >
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url('${img}')` }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ CONTENT ══ */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">

                        {/* Left: overview + challenge/solution/result */}
                        <div>
                            <h2 className="text-[#1E293B] text-2xl font-bold mb-2">Project Overview</h2>
                            <div className="w-10 h-1 bg-[#59D66F] rounded mb-5" />
                            <p className="text-[#6B7280] text-sm leading-relaxed mb-8">{project.overview}</p>
                            <p className="text-[#6B7280] text-sm leading-relaxed mb-10">
                                We implemented a Variable Speed Drive (VSD) system with a new PLC based control panel and automation logic to maintain consistent pressure based on demand while providing comprehensive monitoring and protection.
                            </p>

                            {/* Challenge / Solution / Result cards */}
                            <div className="flex flex-col gap-6">
                                {/* Challenge */}
                                <div className="border border-gray-100 rounded-xl overflow-hidden">
                                    <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
                                        <div className="w-9 h-9 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
                                            <AlertCircle size={16} className="text-red-500" />
                                        </div>
                                        <h3 className="text-[#1E293B] font-bold text-base">The Challenge</h3>
                                    </div>
                                    <ul className="px-5 py-4 flex flex-col gap-2">
                                        {project.challenge.map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm text-[#6B7280]">
                                                <span className="text-red-400 mt-1 shrink-0">•</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                    {/* connector arrow */}
                                    <div className="flex justify-center py-1 text-gray-200">↓</div>
                                </div>

                                {/* Solution */}
                                <div className="border border-gray-100 rounded-xl overflow-hidden">
                                    <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
                                        <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                                            <Lightbulb size={16} className="text-amber-500" />
                                        </div>
                                        <h3 className="text-[#1E293B] font-bold text-base">Our Solution</h3>
                                    </div>
                                    <ul className="px-5 py-4 flex flex-col gap-2">
                                        {project.solution.map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm text-[#6B7280]">
                                                <span className="text-amber-400 mt-1 shrink-0">•</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex justify-center py-1 text-gray-200">↓</div>
                                </div>

                                {/* Result */}
                                <div className="border border-[#2E8B57]/20 rounded-xl overflow-hidden">
                                    <div className="flex items-center gap-3 px-5 py-4 border-b border-[#2E8B57]/10 bg-[#DDE9E2]/30">
                                        <div className="w-9 h-9 rounded-full bg-[#DDE9E2] border border-[#2E8B57]/30 flex items-center justify-center shrink-0">
                                            <CheckCircle2 size={16} className="text-[#1F6B45]" />
                                        </div>
                                        <h3 className="text-[#1E293B] font-bold text-base">The Results</h3>
                                    </div>
                                    <ul className="px-5 py-4 flex flex-col gap-2">
                                        {project.result.map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm text-[#6B7280]">
                                                <span className="text-[#59D66F] mt-1 shrink-0">✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right sidebar */}
                        <div className="flex flex-col gap-5">

                            {/* Project Information */}
                            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                <div className="px-5 py-4 border-b border-gray-100">
                                    <h3 className="text-[#1E293B] font-bold text-base">Project Information</h3>
                                    <div className="w-8 h-0.5 bg-[#59D66F] rounded mt-1" />
                                </div>
                                <div className="divide-y divide-gray-50">
                                    {infoRows.map(({ label, icon: Icon, value }) => (
                                        <div key={label} className="flex items-start gap-3 px-5 py-3">
                                            <Icon size={14} className="text-[#6B7280] mt-0.5 shrink-0" />
                                            <div className="flex-1 flex items-start justify-between gap-2">
                                                <span className="text-[#6B7280] text-xs shrink-0">{label}</span>
                                                <span className="text-[#1E293B] text-xs font-semibold text-right">{value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Project Highlights */}
                            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                <div className="px-5 py-4 border-b border-gray-100">
                                    <h3 className="text-[#1E293B] font-bold text-base">Project Highlights</h3>
                                    <div className="w-8 h-0.5 bg-[#59D66F] rounded mt-1" />
                                </div>
                                <ul className="px-5 py-4 flex flex-col gap-3">
                                    {project.highlights.map((item) => (
                                        <li key={item} className="flex items-center gap-2.5">
                                            <CheckCircle2 size={14} className="text-[#59D66F] shrink-0" />
                                            <span className="text-[#1E293B] text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ GALLERY ══ */}
            <section className="py-16 bg-[#F7F9F8]">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <h2 className="text-[#1E293B] text-2xl font-bold mb-8">Project Gallery</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {project.gallery.map((img, i) => (
                            <div
                                key={i}
                                className="group relative aspect-square rounded-xl overflow-hidden bg-[#DDE9E2] cursor-pointer"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                    style={{ backgroundImage: `url('${img}')` }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ RELATED PROJECTS ══ */}
            {related.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-[#1E293B] text-2xl font-bold">Other Project You Might Be Interested In</h2>
                            <Link
                                href="/projects/all"
                                className="text-[#1F6B45] text-sm font-semibold hover:gap-2 inline-flex items-center gap-1.5 transition-all whitespace-nowrap"
                            >
                                View All Projects <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Pad to always show 4 slots */}
                            {[...related, ...dummyProjects.slice(0, Math.max(0, 4 - related.length))].slice(0, 4).map((p, i) => (
                                <Link
                                    key={`${p.id}-${i}`}
                                    href={`/projects/${p.slug}`}
                                    className="group flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#59D66F]/40 hover:shadow-md transition-all"
                                >
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#DDE9E2] shrink-0">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                                            style={{ backgroundImage: `url('${p.thumbnail}')` }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[#1E293B] text-xs font-semibold leading-snug line-clamp-2">{p.title}</p>
                                        <span className="text-[#59D66F] text-[10px] font-bold uppercase tracking-wide">{p.applicationTag}</span>
                                    </div>
                                    <ArrowRight size={14} className="text-gray-300 group-hover:text-[#1F6B45] transition-colors shrink-0" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ══ CTA ══ */}
            <CtaBanner
                heading="Have a Project Requirement to Discuss?"
                subtext="If you already have a defined scope, technical requirement, or planned upgrade, submit a quote request and our team will review your project needs."
            />

        </main>
    );
}