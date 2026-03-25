import type { Metadata } from "next";
import { AboutMotionClient } from "@/components/about/AboutMotionClient";
import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About Me — Keerthi Ginuga",
  description:
    "About Keerthi Ginuga — Architect and User Experience Designer passionate about designing seamless technology that understands, not interrupts.",
};

export default function AboutPage() {
  return (
    <AboutMotionClient>
      <AboutPageContent />
    </AboutMotionClient>
  );
}
