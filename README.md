# Portfolio website (Next.js)

Successor to the static portfolio in **[`portfolio-website-v2`](https://github.com/keerthiginuga/portfolio-website-v2)**. That repository stays the **archived static baseline** (tag `pre-next-migration` / `v2-static-final`); this repo holds the **Next.js rebuild** only.

## Stack (planned)

- **Framework:** Next.js  
- **Router:** App Router  
- **Language:** TypeScript  
- **Styling:** Preserve existing global CSS approach from the static site (no Tailwind unless we intentionally adopt it later)  
- **Hosting:** TBD (e.g. Vercel when you are ready to deploy)

## Local layout

This repo is a sibling of the static project on disk, for example:

- `…/keerthi website/` — clone of `portfolio-website-v2` (read-only reference for content, assets, and behavior)  
- `…/portfoliowebsite/` — this repo (all migration work)

## Migration notes

- Content and project metadata will move into structured files (e.g. `content/` or `lib/`) instead of duplicated HTML.  
- Client-only features (nav, device gate, scroll/motion) will live in isolated `"use client"` components.

## Part 4 — foundation (done)

- `create-next-app` in this repo: App Router, TypeScript, ESLint, **no Tailwind**.
- Global styles: `src/styles/portfolio-v2.css` (ported from static v2; font tokens wired to `next/font`).
- Fonts: **EB Garamond** (Google) + **Neue Haas Grotesk Text** trial OTF in `src/assets/fonts/`.
- App icon: `src/app/icon.svg` (from static favicon).
- Optional placeholders in `src/components/layout/` for future nav (Part 6); home page includes its own chrome.

## Part 5 — structured content (done)

- `src/content/projects.ts` — typed projects, `getAllProjects()`, `getSelectWorksProjects()`, `getProjectBySlug()`, case-study slugs.
- `src/content/navigation.ts` — primary nav labels + paths for Next.
- `src/content/site.ts` — résumé path, email, LinkedIn, source URL.
- `src/content/home.ts` — hero cards, skills accordion data, quote words.
- `public/assets/images/` — synced from static `portfolio-v2/assets/images/`; résumé PDF in `public/`.
- Routes: `/`, `/works`, `/about`, `/playground`, `/work/[slug]` (stubs using shared data).

```bash
npm install
npm run dev
```

## Part 6 — shared layout & nav (done)

- **`PortfolioSiteHeader`** — logo (`#mainLogo`), `primaryNav` links, résumé, hamburger; mirrors `components.js` markup / classes.
- **`src/lib/nav/portfolioNavScroll.ts`** — scroll collapse, background contrast sampling, expanded menu (Escape / outside click), aligned with `nav.js`.
- **`NavGlassFilter`** — `#nav-glass-filter` SVG for nav glass CSS.
- **`BodyRouteClass`** — toggles `v2-home` vs `v2-about-page` on the document body for existing CSS.
- **`AiCodedFab`** — home + about only; uses `site.sourceCodeUrl`.
- **Device gate** — `src/styles/device-gate.css`, `public/js/device-gate.js`, `DeviceGateScript` (`afterInteractive`).
