/**
 * Primary nav — matches portfolio-v2/js/components.js NAV_LINKS (HTML → Next routes).
 */

export type NavItem = { label: string; href: string };

export const primaryNav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "Playground", href: "/playground" },
  { label: "About Me", href: "/about" },
] as const;
