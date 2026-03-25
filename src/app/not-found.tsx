import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(100px, 20vh, 160px) 24px 80px",
        textAlign: "center",
        color: "var(--v2-color-white)",
        background: "var(--v2-color-black)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--v2-font-system)",
          fontSize: "clamp(12px, 1vw, 14px)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--v2-color-gray-2)",
          marginBottom: "1rem",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--v2-font-system)",
          fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          fontWeight: 500,
          margin: "0 0 1rem",
          maxWidth: "20ch",
          lineHeight: 1.1,
        }}
      >
        This page isn&apos;t here.
      </h1>
      <p
        style={{
          fontFamily: "var(--v2-font-serif)",
          fontStyle: "italic",
          color: "var(--v2-color-gray-2)",
          maxWidth: "36ch",
          lineHeight: 1.6,
          marginBottom: "2rem",
        }}
      >
        The link may be old, or the page moved — let&apos;s get you back to {site.name.split(" ")[0]}&apos;s work.
      </p>
      <nav aria-label="Suggested links" style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
        <Link
          href="/"
          className="v2-nav-link"
          style={{ textDecoration: "none", opacity: 1, fontSize: "14px", textTransform: "uppercase" }}
        >
          Home
        </Link>
        <Link
          href="/works"
          className="v2-nav-link"
          style={{ textDecoration: "none", opacity: 1, fontSize: "14px", textTransform: "uppercase" }}
        >
          Works
        </Link>
        <Link
          href="/about"
          className="v2-nav-link"
          style={{ textDecoration: "none", opacity: 1, fontSize: "14px", textTransform: "uppercase" }}
        >
          About
        </Link>
      </nav>
    </main>
  );
}
