import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudySlugs, getProjectBySlug } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main style={{ flex: 1, padding: "120px 50px 80px", maxWidth: "720px" }}>
      <p style={{ opacity: 0.6, fontSize: 14, marginBottom: 8 }}>Case study (content migration next)</p>
      <h1 style={{ fontFamily: "var(--v2-font-system)", fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
        {project.title}
      </h1>
      <p style={{ fontFamily: "var(--v2-font-serif)", fontStyle: "italic", color: "var(--v2-color-gray-2)" }}>
        {project.year} · {project.categories}
      </p>
      <p style={{ lineHeight: 1.6, marginTop: "1.5rem" }}>{project.description}</p>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/" style={{ textDecoration: "underline" }}>
          ← Home
        </Link>
        {" · "}
        <Link href="/works" style={{ textDecoration: "underline" }}>
          Works
        </Link>
      </p>
    </main>
  );
}
