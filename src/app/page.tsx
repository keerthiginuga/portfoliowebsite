export default function Home() {
  return (
    <main style={{ flex: 1, padding: "120px 50px 80px" }}>
      <h1
        style={{
          fontFamily: "var(--v2-font-system)",
          fontSize: "var(--v2-name-size)",
          fontWeight: 500,
          lineHeight: 1.05,
          margin: "0 0 0.5em",
          color: "var(--v2-color-white)",
        }}
      >
        Keerthi Ginuga
      </h1>
      <p
        style={{
          fontFamily: "var(--v2-font-serif)",
          fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
          fontStyle: "italic",
          color: "var(--v2-color-gray-2)",
          maxWidth: "32rem",
          margin: 0,
        }}
      >
        Next.js foundation is live. Homepage layout and motion will be ported in the next layers.
      </p>
    </main>
  );
}
