/**
 * Site-wide constants (footer, résumé, social) — single place to update links.
 */

/** Canonical site origin for metadata, sitemap, and robots (set in production). */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Keerthi Ginuga",
  role: "Architect & User Experience Designer",
  resumePath: "/KeerthiGinuga_Resume_latest.pdf",
  email: "kginug20@student.scad.edu",
  linkedinUrl: "https://www.linkedin.com/in/keerthi-g-079b37239/",
  /** Source for “AI Coded” FAB when nav is ported (Part 6) */
  sourceCodeUrl: "https://github.com/keerthiginuga/portfoliowebsite",
} as const;
