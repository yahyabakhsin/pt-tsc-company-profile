import type {
    User,
    Service,
    Project,
    ProjectImage,
    ApplicationArea,
    Partner,
    Document,
    ContactMessage,
    Settings,
    Role,
    MessageStatus,
} from '@prisma/client';

// ─── Re-export Prisma types ───────────────────────────────────────────────────
export type {
    User,
    Service,
    Project,
    ProjectImage,
    ApplicationArea,
    Partner,
    Document,
    ContactMessage,
    Settings,
    Role,
    MessageStatus,
};

// ─── Extended types (with relations) ─────────────────────────────────────────

export type ProjectWithRelations = Project & {
    images: ProjectImage[];
    service: Service | null;
    applicationAreas: ApplicationArea[];
};

export type ProjectWithThumbnail = Project & {
    images: ProjectImage[];
    service: Service | null;
    applicationAreas: ApplicationArea[];
    thumbnail: ProjectImage | null; // featured image
};

export type ServiceWithProjects = Service & {
    projects: Project[];
};

// ─── Server Action Response ───────────────────────────────────────────────────

export type ActionResponse<T = void> =
    | { success: true; data: T; message?: string }
    | { success: false; error: string };

// ─── Form types ───────────────────────────────────────────────────────────────

export type ContactFormData = {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    subject?: string;
    message: string;
};

export type ProjectFormData = {
    title: string;
    slug: string;
    description: string;
    content?: string;
    client?: string;
    location?: string;
    completedAt?: Date;
    status: string;
    serviceId?: string;
    applicationAreaIds?: string[];
};

export type PartnerFormData = {
    name: string;
    logoUrl: string;
    websiteUrl?: string;
    isActive?: boolean;
};

// ─── UI / Page types ──────────────────────────────────────────────────────────

export type NavLink = {
    label: string;
    href: string;
};

export type StatItem = {
    value: string;
    label: string;
};

export type CtaFeature = {
    title: string;
    desc: string;
};