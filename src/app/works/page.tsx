import type { Metadata } from "next";
import { WorksMotionClient } from "@/components/works/WorksMotionClient";
import { WorksPageMarkup } from "@/components/works/WorksPageMarkup";
import { getAllProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Works",
  description: "Selected UX and product design work — case studies and projects.",
  openGraph: {
    title: "Works — Keerthi Ginuga",
    description: "Selected UX and product design work — case studies and projects.",
  },
};

export default function WorksPage() {
  const projects = getAllProjects();

  return (
    <WorksMotionClient>
      <WorksPageMarkup projects={projects} />
    </WorksMotionClient>
  );
}
