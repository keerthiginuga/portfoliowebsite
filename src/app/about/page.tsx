import type { Metadata } from "next";
import { AboutMotionClient } from "@/components/about/AboutMotionClient";
import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "About Keerthi Ginuga — Architect and User Experience Designer passionate about designing seamless technology that understands, not interrupts.",
  openGraph: {
    title: "About Me — Keerthi Ginuga",
    description:
      "Architect and User Experience Designer — seamless technology that understands, not interrupts.",
    images: [{ url: "/assets/images/About me (1).jpeg", width: 1200, height: 630, alt: "Keerthi Ginuga" }],
  },
};

export default function AboutPage() {
  return (
    <AboutMotionClient>
      <AboutPageContent />
    </AboutMotionClient>
  );
}
