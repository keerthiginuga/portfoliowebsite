export const heroCards = [
  { src: "/assets/images/sync.jpg", alt: "Sync project preview", depth: 0.7 },
  { src: "/assets/images/7west.jpg", alt: "7WEST project preview", depth: 0.45 },
  { src: "/assets/images/word-clock.jpg", alt: "Word Clock project preview", depth: 0.55 },
  { src: "/assets/images/zillow.jpg", alt: "Zillow project preview", depth: 0.4 },
  { src: "/assets/images/sea-love.jpg", alt: "SeaLove project preview", depth: 0.5 },
  { src: "/assets/images/google-nest.jpg", alt: "Google Nest project preview", depth: 0.6 },
  { src: "/assets/images/autonomous-vehicle.jpg", alt: "SONIX project preview", depth: 0.65 },
  { src: "/assets/images/kohler-scadpro.jpg", alt: "Kohler project preview", depth: 0.35 },
  { src: "/assets/images/kroger.jpg", alt: "Kroger project preview", depth: 0.52 },
] as const;

export type SkillBlock = {
  thumb: string;
  heading: string;
  body: string;
  pills: string[];
};

export const skillBlocks: SkillBlock[] = [
  {
    thumb: "/assets/images/brand-thinking.jpeg",
    heading: "Brand Thinking",
    body: "I design with brand in mind. Building visual systems that feel cohesive, recognizable, and emotionally resonant, so nothing looks accidental and everything feels intentional.",
    pills: [
      "Logo Design",
      "Design Systems",
      "Brand Guidelines",
      "Typography & Color Systems",
      "UX Writing",
      "Brand Positioning",
    ],
  },
  {
    thumb: "/assets/images/human-centered-strategy.jpg",
    heading: "Human-Centered Strategy",
    body: "People first. Always. Real behaviors over assumptions. Real context over personas that sit in slides. Strategy grounded in how life actually works.",
    pills: [
      "User Research",
      "Information Architecture",
      "Journey Mapping",
      "Service Design",
      "Design Strategy",
      "Systems Thinking",
    ],
  },
  {
    thumb: "/assets/images/interaction-design.png",
    heading: "Interaction Design",
    body: "I obsess over the tiny moments. The taps, swipes, and transitions that make something feel effortless instead of exhausting.",
    pills: [
      "User Flows",
      "Wireframing",
      "Prototyping",
      "Microinteractions",
      "Usability Testing",
      "Accessibility",
    ],
  },
  {
    thumb: "/assets/images/insight-to-impact.png",
    heading: "Insight to Impact",
    body: "I design beyond sticky notes. Turning messy research into sharp decisions and ideas that don’t just look good, they move things forward.",
    pills: [
      "Interviews",
      "Surveys",
      "Affinity Mapping",
      "Thematic Analysis",
      "Persona Development",
      "Data-Driven Solutions",
    ],
  },
  {
    thumb: "/assets/images/collaboration-facilitation.jpeg",
    heading: "Collaboration & Facilitation",
    body: "I turn group chaos into shared clarity. Different voices, aligned direction, forward motion.",
    pills: [
      "Design Workshops",
      "Stakeholder Alignment",
      "Cross-Functional Collaboration",
      "Co-Creation",
      "Sprint Facilitation",
    ],
  },
];

export const quoteWords: { text: string; italic?: boolean }[] = [
  { text: "I" },
  { text: "love" },
  { text: "to" },
  { text: "inspire,", italic: true },
  { text: "because" },
  { text: "I" },
  { text: "know" },
  { text: "what" },
  { text: "it's" },
  { text: "like" },
  { text: "to" },
  { text: "be" },
  { text: "inspired.\"", italic: true },
];
