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
