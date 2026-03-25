import Link from "next/link";

export default function PlaygroundPage() {
  return (
    <main style={{ flex: 1, padding: "120px 50px 80px", maxWidth: "640px" }}>
      <h1 style={{ fontFamily: "var(--v2-font-system)", fontSize: "clamp(2rem, 5vw, 3rem)" }}>Playground</h1>
      <p style={{ color: "var(--v2-color-gray-2)", lineHeight: 1.6 }}>
        Experiments from static <code>playground.html</code> will land here later.
      </p>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/" style={{ textDecoration: "underline" }}>
          ← Home
        </Link>
      </p>
    </main>
  );
}
