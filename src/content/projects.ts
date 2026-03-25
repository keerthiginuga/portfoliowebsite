/**
 * Single source of truth for project metadata (ported from portfolio-v2/js/data.js).
 * Image paths are absolute from site root (public/), e.g. /assets/images/…
 */

export type ProjectId =
  | "sonix"
  | "sealove"
  | "google-nest"
  | "kohler"
  | "7west"
  | "kroger"
  | "imessage"
  | "sync"
  | "zillow";

export type Project = {
  id: ProjectId;
  title: string;
  shortTitle: string;
  /** App Router path */
  href: string;
  year: number;
  marqueeKey: string;
  tags: string[];
  categories: string;
  description: string;
  images: string[];
  heroImage: string;
  /** True when there is (or will be) a dedicated /work/[slug] case study route */
  hasCaseStudyPage: boolean;
  /** Slug for /work/[slug] when hasCaseStudyPage */
  slug?: string;
  /** Homepage selected-works card stack — matches static index layering for SONIX */
  homeStackImages?: readonly [string, string, string, string];
};

function img(path: string): string {
  if (path.startsWith("/")) return path;
  const trimmed = path.replace(/^assets\/images\//, "");
  return `/assets/images/${trimmed}`;
}

/** Core projects (home rotation subset + shared metadata) */
const PROJECT_DATA: Project[] = [
  {
    id: "sonix",
    title: "SONIX — YOUR PERSONAL SPACE ON WHEELS",
    shortTitle: "SONIX",
    href: "/work/sonix",
    year: 2025,
    marqueeKey: "SONIX",
    tags: ["UXD", "UXR", "Branding"],
    categories:
      "UX Research / UX Design / UI Design / Branding / Service Design / Information Architecture / User Testing",
    description:
      "Sonix reimagines urban mobility through fully autonomous vehicles that deliver hyper-personalized, luxury-grade experiences for everyone.",
    images: [img("autonomous-vehicle.jpg")],
    heroImage: img("autonomous-vehicle.jpg"),
    hasCaseStudyPage: true,
    slug: "sonix",
    homeStackImages: [
      img("autonomous-vehicle.jpg"),
      img("sync.jpg"),
      img("google-nest.jpg"),
      img("7west.jpg"),
    ],
  },
  {
    id: "sealove",
    title: "SEALOVE CANDLE BAR WEBSITE REDESIGN",
    shortTitle: "SEALOVE",
    href: "/work/sealove",
    year: 2023,
    marqueeKey: "SEALOVE",
    tags: ["UXD", "UXR", "IA", "Branding"],
    categories: "UX Design / UX Research / Information Architecture / Branding",
    description:
      "A strategic redesign of Sea Love’s website, focused on improving Information Architecture and UI to create a seamless, intuitive shopping and booking experience.",
    images: [img("sea-love.jpg")],
    heroImage: img("sea-love.jpg"),
    hasCaseStudyPage: true,
    slug: "sealove",
  },
  {
    id: "google-nest",
    title: "GOOGLE NEST THERMOSTAT FOR OFFICE SPACE",
    shortTitle: "GOOGLE NEST",
    href: "/work/google-nest",
    year: 2023,
    marqueeKey: "NEST",
    tags: ["UXD", "UXR", "Branding"],
    categories: "UX Design / UX Research / Branding",
    description:
      "Redesigned the Nest thermostat for cheerful office spaces, introducing a collaborative temperature-setting feature that empowers employees to contribute, fostering a collaborative, comfortable, and inclusive environment.",
    images: [img("google-nest.jpg")],
    heroImage: img("google-nest.jpg"),
    hasCaseStudyPage: true,
    slug: "google-nest",
  },
  {
    id: "kohler",
    title: "KOHLER X SCADPRO - THE FUTURE OF HYDROTHERAPY",
    shortTitle: "KOHLER",
    href: "/works",
    year: 2022,
    marqueeKey: "KOHLER",
    tags: ["Lead UXD", "UXR", "Product Design"],
    categories: "Lead UX Design / UX Research / Product Design",
    description:
      "A collaborative industry project with Kohler through SCADpro focused on reimagining the future of hydrotherapy through human-centered research, concept development, and immersive experience design.",
    images: [img("kohler-scadpro.jpg")],
    heroImage: img("kohler-scadpro.jpg"),
    hasCaseStudyPage: false,
  },
];

const WORKS_ONLY_PROJECTS: Project[] = [
  {
    id: "7west",
    title: "7WEST — YOUR ALL-IN-ONE STUDENT ECOSYSTEM",
    shortTitle: "7WEST",
    href: "/works",
    year: 2024,
    marqueeKey: "7WEST",
    tags: ["Co-Founder", "Design Lead", "UX Design"],
    categories: "Co-Founder / Design Lead / UX Design",
    description:
      "7WEST is an AI-first student ecosystem that connects every layer of university life from organizations and events to housing, jobs, and student discounts into a single, unified platform.",
    images: [img("7west.jpg")],
    heroImage: img("7west.jpg"),
    hasCaseStudyPage: false,
  },
  {
    id: "kroger",
    title: "RETHINKING THE SELF-CHECKOUT EXPERIENCE AT KROGER",
    shortTitle: "KROGER",
    href: "/work/kroger",
    year: 2023,
    marqueeKey: "KROGER",
    tags: ["UXR", "Service Design"],
    categories: "UX Research / Service Design",
    description:
      "An in-depth service design investigation addressing the rising theft, employee stress, and customer frustration surrounding Kroger’s self-checkout systems.",
    images: [img("kroger.jpg")],
    heroImage: img("kroger.jpg"),
    hasCaseStudyPage: true,
    slug: "kroger",
  },
  {
    id: "imessage",
    title: "IMESSAGE - A RELATIONAL WELLNESS UPDATE",
    shortTitle: "IMESSAGE",
    href: "/work/imessage",
    year: 2024,
    marqueeKey: "IMESSAGE",
    tags: ["UX Research", "UX Design", "Design Strategy"],
    categories: "UX Research / UX Design / Design Strategy",
    description:
      "A hypothetical iMessage update centered around relational wellness, empowering users to maintain their relationships through outreach, context, and organizational support.",
    images: [img("imessage.jpg")],
    heroImage: img("imessage.jpg"),
    hasCaseStudyPage: true,
    slug: "imessage",
  },
  {
    id: "sync",
    title: "SYNC - THE REAL-TIME COACHING",
    shortTitle: "SYNC",
    href: "/works",
    year: 2024,
    marqueeKey: "SYNC",
    tags: ["UXR", "IxD", "Proto", "Hardware"],
    categories: "UX Research / Interaction Design / Prototyping / Electronics",
    description:
      "An intelligent smart sneaker system that translates gait sensor data into real-time haptic feedback and immersive visual insights to prevent running injuries.",
    images: [img("sync.jpg")],
    heroImage: img("sync.jpg"),
    hasCaseStudyPage: false,
  },
  {
    id: "zillow",
    title: "ZILLOW - SIMPLIFYING SEARCH FOR HOME",
    shortTitle: "ZILLOW",
    href: "/works",
    year: 2024,
    marqueeKey: "ZILLOW",
    tags: ["UXR", "UXD", "UT"],
    categories: "UX Research / UX Design / User Testing",
    description:
      "A usability redesign of Zillow's mobile app to streamline search, filters, and saved listings for renters navigating high-stakes housing decisions.",
    images: [img("zillow.jpg")],
    heroImage: img("zillow.jpg"),
    hasCaseStudyPage: false,
  },
];

/**
 * Works page order (static script): SONIX, IMESSAGE, SEALOVE, GOOGLE NEST, KROGER, KOHLER, SYNC, 7WEST, ZILLOW
 */
export function getAllProjects(): Project[] {
  return [
    PROJECT_DATA[0],
    WORKS_ONLY_PROJECTS[2],
    PROJECT_DATA[1],
    PROJECT_DATA[2],
    WORKS_ONLY_PROJECTS[1],
    PROJECT_DATA[3],
    WORKS_ONLY_PROJECTS[3],
    WORKS_ONLY_PROJECTS[0],
    WORKS_ONLY_PROJECTS[4],
  ];
}

/** Home selected-works card rotation set: SONIX, IMESSAGE, SEALOVE, GOOGLE NEST */
export function getSelectWorksProjects(): Project[] {
  return [PROJECT_DATA[0], WORKS_ONLY_PROJECTS[2], PROJECT_DATA[1], PROJECT_DATA[2]];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return getAllProjects()
    .filter((p) => p.hasCaseStudyPage && p.slug)
    .map((p) => p.slug as string);
}

/** Card data for case-study “more projects” carousel (static `renderMoreProjectsSection`). */
export type CaseStudyMoreCard = {
  href: string;
  title: string;
  heroImage: string;
  tags: string[];
};

/** Other case studies in works order, rotated so the current slug comes first in the ring. */
export function getMoreCaseStudiesForSlug(currentSlug: string): CaseStudyMoreCard[] {
  const ordered = getAllProjects().filter((p) => p.hasCaseStudyPage && p.slug);
  if (ordered.length <= 1) return [];

  const idx = ordered.findIndex((p) => p.slug === currentSlug);
  const out: CaseStudyMoreCard[] = [];

  if (idx < 0) {
    return ordered
      .filter((p) => p.slug !== currentSlug)
      .map((p) => ({
        href: p.href,
        title: p.title,
        heroImage: p.heroImage,
        tags: [...p.tags],
      }));
  }

  for (let i = 1; i < ordered.length; i++) {
    const p = ordered[(idx + i) % ordered.length];
    out.push({
      href: p.href,
      title: p.title,
      heroImage: p.heroImage,
      tags: [...p.tags],
    });
  }
  return out;
}

function defaultHomeStack(p: Project): readonly [string, string, string, string] {
  const base = p.heroImage;
  return [base, base, base, base];
}

/** Four images for the homepage flip-card stack */
export function getHomeStackImages(project: Project): readonly [string, string, string, string] {
  return project.homeStackImages ?? defaultHomeStack(project);
}

/** Data shape for homepage scroll-flip card (matches legacy script.js + `href` for Next). */
export type MotionProject = {
  href: string;
  title: string;
  tags: string[];
  marqueeKey: string;
  images: readonly [string, string, string, string];
};

export function toMotionProjects(list: Project[]): MotionProject[] {
  return list.map((p) => ({
    href: p.href,
    title: p.title,
    tags: p.tags,
    marqueeKey: p.marqueeKey,
    images: getHomeStackImages(p),
  }));
}
