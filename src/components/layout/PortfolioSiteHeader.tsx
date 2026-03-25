"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { primaryNav } from "@/content/navigation";
import { site } from "@/content/site";
import {
  bindNavMenu,
  initCaseStudyNavScroll,
  initNavScrollListeners,
  resetNavContrastState,
  scheduleNavContrastUpdate,
} from "@/lib/nav/portfolioNavScroll";
import { PortfolioLogo } from "./PortfolioLogo";

function linkIsActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/works") return pathname === "/works" || pathname.startsWith("/work/");
  if (href === "/about") return pathname.startsWith("/about");
  if (href === "/playground") return pathname.startsWith("/playground");
  return false;
}

export function PortfolioSiteHeader() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const menu = bindNavMenu(nav);
    const isCaseStudy = pathname.startsWith("/work/");
    /* Home: smooth scroll + nav updates run from `attachHomeLenis` in HomeMotionClient. */
    const unscroll =
      pathname === "/"
        ? () => {}
        : pathname === "/works"
          ? () => {}
          : isCaseStudy
            ? initCaseStudyNavScroll(nav, menu.closeExpandedMenu)
            : initNavScrollListeners(nav);
    return () => {
      menu.cleanup();
      unscroll();
    };
  }, [pathname]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    resetNavContrastState();
    const id = requestAnimationFrame(() => scheduleNavContrastUpdate(nav));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <>
      <a
        href="/"
        className="v2-logo"
        id="mainLogo"
        aria-label="Keerthi home"
        onClick={(e) => {
          e.preventDefault();
          window.location.assign("/");
        }}
      >
        <PortfolioLogo />
      </a>
      <nav ref={navRef} className="v2-nav" aria-label="Primary">
        <div className="v2-nav-inner">
          <ul className="v2-nav-links">
            {primaryNav.map((link) => {
              const active = linkIsActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link href={link.href} className={`v2-nav-link${active ? " is-active" : ""}`}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a href={site.resumePath} target="_blank" rel="noopener noreferrer" className="v2-nav-resume">
            RESUME
          </a>
          <button type="button" className="v2-hamburger" aria-label="Toggle menu" aria-expanded="false">
            <span className="v2-hamburger-line" />
            <span className="v2-hamburger-line" />
            <span className="v2-hamburger-line" />
          </button>
        </div>
      </nav>
    </>
  );
}
