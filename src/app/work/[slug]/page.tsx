import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";
import { getCaseStudyBySlug } from "@/content/caseStudies";
import {
  getCaseStudySlugs,
  getMoreCaseStudiesForSlug,
  getProjectBySlug,
} from "@/content/projects";
import { getSiteUrl } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getCaseStudyBySlug(slug);
  if (!doc) return { title: "Case study" };
  const base = getSiteUrl();
  const ogImage = new URL(doc.heroImage, base).toString();
  return {
    title: { absolute: doc.documentTitle },
    description: `${doc.heroTitle} — case study by Keerthi Ginuga.`,
    openGraph: {
      title: doc.documentTitle,
      description: `${doc.heroTitle} — case study by Keerthi Ginuga.`,
      type: "article",
      url: `${base}/work/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: doc.heroTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.documentTitle,
      description: `${doc.heroTitle} — case study by Keerthi Ginuga.`,
      images: [ogImage],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const doc = getCaseStudyBySlug(slug);
  if (!project?.hasCaseStudyPage || !doc) notFound();

  const moreProjects = getMoreCaseStudiesForSlug(slug);

  return <CaseStudyView doc={doc} moreProjects={moreProjects} />;
}
