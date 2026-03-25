import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";
import { getCaseStudyBySlug } from "@/content/caseStudies";
import { getCaseStudySlugs, getProjectBySlug } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getCaseStudyBySlug(slug);
  if (!doc) return { title: "Case study" };
  return {
    title: doc.documentTitle,
    description: `${doc.heroTitle} — case study by Keerthi Ginuga.`,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const doc = getCaseStudyBySlug(slug);
  if (!project?.hasCaseStudyPage || !doc) notFound();

  return <CaseStudyView doc={doc} />;
}
