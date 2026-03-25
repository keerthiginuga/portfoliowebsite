/**
 * Shell only — footer markup will match static site in a later layer.
 */
export function SiteFooter() {
  return (
    <footer
      className="site-footer-placeholder"
      style={{
        marginTop: "auto",
        padding: "48px 50px",
        borderTop: "1px solid rgba(249, 253, 254, 0.08)",
      }}
    >
      <span className="sr-only">Footer — placeholder until content migration</span>
      <p
        style={{
          margin: 0,
          fontSize: 12,
          opacity: 0.4,
          color: "var(--v2-color-white)",
        }}
      >
        Footer placeholder
      </p>
    </footer>
  );
}
