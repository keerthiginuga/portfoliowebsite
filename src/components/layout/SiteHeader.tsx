/**
 * Shell only — real nav / shared layout injection comes in Part 6 (port of components.js).
 */
export function SiteHeader() {
  return (
    <header
      className="site-header-placeholder"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        padding: "12px 50px",
        pointerEvents: "none",
      }}
    >
      <span className="sr-only">Main navigation — placeholder until migration Part 6</span>
      <span
        aria-hidden="true"
        style={{
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: 0.35,
          color: "var(--v2-color-white)",
        }}
      >
        Nav placeholder
      </span>
    </header>
  );
}
