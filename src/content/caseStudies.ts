/**
 * Case study page content (ported from portfolio-v2/project-*.html).
 * Gallery paths point at files under public/assets/…
 */

export type CaseStudyHeroClass = "sonix" | "imessage" | "sealove" | "nest" | "kroger";

export type CaseStudySection = {
  heading: string;
  /** Trusted HTML snippets (from static site). */
  paragraphs?: string[];
  list?: string[];
};

export type CaseStudyCarousel = {
  eyebrow: string;
  images: { src: string; alt: string }[];
  cta?: { href: string; label: string };
};

export type CaseStudyDoc = {
  slug: string;
  documentTitle: string;
  heroTitle: string;
  heroImage: string;
  heroCoverClass: CaseStudyHeroClass;
  meta: { roleLines: string[]; timeline: string };
  sections: CaseStudySection[];
  process: string[];
  tools: string[];
  /** Full-width deck slides */
  gallery: string[];
  carousel?: CaseStudyCarousel;
};

const P = "/assets/projects";

function enc(name: string): string {
  return encodeURIComponent(name);
}

function sonixSlides(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${P}/sonix/${enc(`SONIX - Final (${i + 1}).png`)}`);
}

function imessageSlides(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${P}/imessage/${enc(`iMessage (${i + 1}).png`)}`);
}

function sealoveSlides(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${P}/sealove/${enc(`Sea Love (${i + 1}).png`)}`);
}

function nestSlides(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/assets/images/${enc(`nest (${i + 1}).png`)}`);
}

const KROGER_PHOTO_FILES = [
  "Kroger 1.jpeg",
  "Kroger 2.jpg",
  "Kroger 3.jpeg",
  "Kroger 4.jpeg",
  "Kroger 5.jpg",
  "Kroger 6.jpeg",
  "Kroger 7.jpg",
  "Kroger 8.jpg",
  "Kroger 9.jpg",
] as const;

function krogerCarouselImages(): { src: string; alt: string }[] {
  return KROGER_PHOTO_FILES.map((name, i) => ({
    src: `${P}/kroger/photos/${enc(name)}`,
    alt: `Kroger field photo ${i + 1}`,
  }));
}

const sonix: CaseStudyDoc = {
  slug: "sonix",
  documentTitle: "SONIX — Your Personal Space On Wheels · Keerthi Ginuga",
  heroTitle: "SONIX — Your Personal Space On Wheels",
  heroImage: "/assets/images/autonomous-vehicle.jpg",
  heroCoverClass: "sonix",
  meta: {
    roleLines: ["UX Researcher", "UI Designer"],
    timeline: "Jan-Mar 2025",
  },
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "Sonix reimagines urban mobility through fully autonomous vehicles that deliver hyper-personalized, luxury-grade experiences for everyone.",
        "In a world where ownership fades and on-demand transport dominates, Sonix bridges convenience and comfort. Each vehicle adapts to user intent — whether to work, relax, play, socialize, or send packages — using AI-driven personalization that learns from habits, preferences, and context.",
      ],
    },
    {
      heading: "Goal",
      paragraphs: [
        "The goal was to craft a system and service that turns every ride into a meaningful experience, transforming transit time into productive, restorative, or social moments.",
      ],
    },
    {
      heading: "Challenges",
      list: [
        "Humanizing fully autonomous travel experiences",
        "Creating seamless transitions between adaptive ride modes",
        "Integrating personalization across digital and physical touchpoints",
        "Balancing advanced technology with comfort and accessibility",
      ],
    },
    {
      heading: "Outcomes",
      list: [
        "Defined a unified ecosystem for autonomous mobility",
        "Designed five adaptive modes — Work, Relax, Play, Socialize, Send",
        "Built cohesive interactions across the app, AI, and vehicle interface",
        "Positioned Sonix as a vision for intuitive, immersive, human-centered travel",
      ],
    },
  ],
  process: [
    "Future scenario exploration",
    "Secondary research",
    "Interviews",
    "Surveys",
    "Affinitization",
    "Define How might we's",
    "Crazy 8's ideation",
    "User flows - Car and App",
    "Low-fidelity wireframes",
    "Initial user testing",
    "Branding",
    "Information architecture",
    "High-fidelity wireframes",
    "Prototyping interfaces",
    "Concept pitch",
  ],
  tools: ["Figma", "Adobe Illustrator", "Premiere Pro"],
  gallery: sonixSlides(16),
};

const imessage: CaseStudyDoc = {
  slug: "imessage",
  documentTitle: "IMESSAGE — A Relational Wellness Update · Keerthi Ginuga",
  heroTitle: "IMESSAGE — A Relational Wellness Update",
  heroImage: "/assets/images/imessage.jpg",
  heroCoverClass: "imessage",
  meta: {
    roleLines: ["UX Researcher", "UI Designer"],
    timeline: "Sept-Dec 2025",
  },
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "A hypothetical iMessage update centered around relational wellness, empowering users to maintain their relationships through outreach, context, and organizational support.",
        "In a world where conversations pile up and weak ties quietly fade, this redesign bridges connection and clarity. By integrating tagging systems, contextual notes, AI summaries, and relational insights, the experience supports users in maintaining meaningful relationships, not just exchanging messages.",
      ],
    },
    {
      heading: "Goal",
      paragraphs: [
        "The goal was to design a system that transforms iMessage from a reactive messaging tool into a proactive relationship management experience by helping users recall, reconnect, and reduce relational friction.",
      ],
    },
    {
      heading: "Challenges",
      list: [
        "Supporting weak ties without increasing notification fatigue",
        "Designing memory aids without making relationships feel transactional",
        "Balancing AI assistance with human authenticity",
        "Organizing conversations without disrupting familiar iOS patterns",
      ],
    },
    {
      heading: "Outcomes",
      list: [
        "Designed an iMessage Report to surface response lag and inactive contacts",
        "Integrated AI-powered summaries and outreach prompts",
        "Projected +25% increase in maintained weak ties",
        "Projected -50% reduction in message feed clutter",
      ],
    },
  ],
  process: [
    "Secondary research",
    "Surveys",
    "User interviews",
    "Affinitization",
    "Defined How Might We's",
    "Crazy 8's ideation",
    "User flows",
    "Mid-fidelity wireframes",
    "User testing",
    "High-fidelity prototypes",
    "Concept pitch",
  ],
  tools: ["Figma"],
  gallery: imessageSlides(17),
};

const sealove: CaseStudyDoc = {
  slug: "sealove",
  documentTitle: "SEALOVE CANDLE BAR WEBSITE REDESIGN · Keerthi Ginuga",
  heroTitle: "SEALOVE CANDLE BAR WEBSITE REDESIGN",
  heroImage: "/assets/images/sea-love.jpg",
  heroCoverClass: "sealove",
  meta: {
    roleLines: ["UX Researcher", "UI Designer", "UX Writer"],
    timeline: "Mar-May 2025",
  },
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "A strategic redesign of <strong>SeaLove Candle Bar's</strong> website to create a seamless, intuitive, and calming shopping and booking experience for a DIY candle brand known for its serene, sensory aesthetic.",
      ],
    },
    {
      heading: "Goal",
      paragraphs: [
        "Transform SeaLove's digital presence by <strong>aligning the interface with its in-store essence</strong> — clean, intentional, and relaxing while simplifying navigation and booking to enhance user confidence and retention.",
      ],
    },
    {
      heading: "Challenges",
      list: [
        "Overwhelming information and confusing navigation",
        "Disconnected booking system with external redirects",
        "Poor differentiation between workshops, events, and products",
        "Inconsistent branding and visual hierarchy",
      ],
    },
    {
      heading: "Outcomes",
      list: [
        "Streamlined navigation and booking flow integrated directly on-site",
        "Reorganized product catalog with filters and guided browsing",
        "Clarified hierarchy with focused CTAs and accessible structure",
        "Reinforced brand values of sustainability, craftsmanship, and calm",
        "Improved usability reflected in reduced drop-offs and higher engagement",
      ],
    },
  ],
  process: [
    "Secondary research",
    "Competitor benchmarking",
    "User interviews and surveys",
    "Card sorting & tree testing",
    "Information architecture redesign",
    "UX writing and content strategy",
    "Wireframing and visual exploration",
    "High-fidelity UI design",
    "Usability testing and iteration",
  ],
  tools: ["Figma", "Miro", "KardSort", "UXtweak"],
  gallery: sealoveSlides(15),
};

const googleNest: CaseStudyDoc = {
  slug: "google-nest",
  documentTitle: "Google Nest Thermostat for Office Space · Keerthi Ginuga",
  heroTitle: "GOOGLE NEST THERMOSTAT FOR OFFICE SPACE",
  heroImage: "/assets/images/google-nest.jpg",
  heroCoverClass: "nest",
  meta: {
    roleLines: ["UX Researcher", "UI Designer"],
    timeline: "Jan-Mar 2025",
  },
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "Redesigned the Nest Thermostat to make office environments more cheerful and collaborative. The concept introduces a shared temperature-setting experience where employees can vote, react, and communicate preferences, turning everyday climate control into a collective, engaging activity.",
      ],
    },
    {
      heading: "Goal",
      paragraphs: [
        "Transform temperature control from a single-user action into a team-driven interaction that enhances comfort, inclusivity, and overall workplace well-being.",
      ],
    },
    {
      heading: "Challenges",
      list: [
        "Managing diverse comfort levels across teams",
        "Encouraging participation without creating friction",
        "Keeping the experience simple yet expressive",
        "Aligning physical interaction with digital feedback",
      ],
    },
    {
      heading: "Outcomes",
      list: [
        "Introduced temperature voting and group feedback features",
        "Designed a bright, friendly visual identity suited for office environments",
        "Built seamless mobile and device interfaces for collaborative control",
        "Promoted a sense of shared comfort and connection among employees",
      ],
    },
  ],
  process: [
    "Secondary Research",
    "Problem Definition",
    "Insight Generation",
    "Ideation & Sketching",
    "Surveys & Data Analysis",
    "User Journey Mapping",
    "User Flows",
    "Wireframing",
    "UI Design",
    "Visual Design System",
    "Prototype Development",
    "User Testing",
    "Final Concept Delivery",
  ],
  tools: ["Figma"],
  gallery: nestSlides(16),
};

const kroger: CaseStudyDoc = {
  slug: "kroger",
  documentTitle: "Rethinking the Self-Checkout Experience at Kroger · Keerthi Ginuga",
  heroTitle: "RETHINKING THE SELF-CHECKOUT EXPERIENCE AT KROGER",
  heroImage: "/assets/images/kroger.jpg",
  heroCoverClass: "kroger",
  meta: {
    roleLines: ["Service Designer", "Research Lead"],
    timeline: "May-July 2025",
  },
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "An in-depth service design investigation addressing the <strong>rising theft, employee stress, and customer frustration surrounding Kroger's self-checkout systems.</strong> The study examined how accountability gaps, flawed alert systems, and under-supported staff contribute to loss, inefficiency, and mistrust.",
      ],
    },
    {
      heading: "Goal",
      paragraphs: [
        "Reimagine the self-checkout experience as a <strong>human-centered service</strong>, balancing efficiency, empathy, and accountability while reducing shrinkage and restoring customer trust.",
      ],
    },
    {
      heading: "Challenges",
      list: [
        "Overwhelmed staff managing multiple kiosks simultaneously",
        "Confusing UI and error-prone systems causing misuse",
        "Lack of real-time accountability and training protocols",
        "Biased surveillance and reactive management policies",
      ],
    },
    {
      heading: "Outcomes",
      list: [
        "Proposed a multi-layered intervention framework addressing policy, process, and technology",
        "Designed a Smart Alert Prioritization System and Accountability-Linked Resolution Protocol",
        "Created Oversight Dashboards for real-time visibility and support",
        "Introduced training and recognition loops to reduce stress and empower employees",
        "Reframed self-checkout from a friction point to a trust-driven retail service",
      ],
    },
  ],
  process: [
    "Field observations",
    "Stakeholder interviews",
    "Secondary research",
    "Data analysis",
    "Service blueprint",
    "System mapping",
    "Gap analysis of policy and operations",
    "Co-creation of opportunity areas",
    "Concept development",
    "Impact projection",
    "Final white paper",
    "Presentation",
  ],
  tools: ["Miro", "Figma", "Illustrator", "InDesign"],
  gallery: [`${P}/kroger/${enc("KROGER - Final (1).png")}`],
  carousel: {
    eyebrow: "Co-Creation Workshop",
    images: krogerCarouselImages(),
    cta: {
      href: "https://drive.google.com/drive/folders/1dNr0JYO_pzEHX2PLzgP4Cgr345yohftZ?usp=sharing",
      label: "EXPLORE FULL CASE STUDY",
    },
  },
};

const BY_SLUG: Record<string, CaseStudyDoc> = {
  sonix,
  imessage,
  sealove,
  "google-nest": googleNest,
  kroger,
};

export function getCaseStudyBySlug(slug: string): CaseStudyDoc | undefined {
  return BY_SLUG[slug];
}
