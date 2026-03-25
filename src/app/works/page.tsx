import Link from "next/link";
import { getAllProjects } from "@/content/projects";

export default function WorksPage() {
  const projects = getAllProjects();

  return (
    <main style={{ flex: 1, padding: "120px 50px 80px", maxWidth: "640px" }}>
      <h1 style={{ fontFamily: "var(--v2-font-system)", fontSize: "clamp(2rem, 5vw, 3rem)" }}>Works</h1>
      <p style={{ color: "var(--v2-color-gray-2)", marginBottom: "2rem" }}>
        Stack interaction and full layout will be ported in a later layer. Projects from structured data:
      </p>
      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {projects.map((p) => (
          <li key={p.id}>
            <Link href={p.href} style={{ fontWeight: 600, textDecoration: "underline" }}>
              {p.shortTitle}
            </Link>
            <span style={{ color: "var(--v2-color-gray)", marginLeft: 8 }}>— {p.title}</span>
          </li>
        ))}
      </ol>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/" style={{ textDecoration: "underline" }}>
          ← Home
        </Link>
      </p>
    </main>
  );
}
