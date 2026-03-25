"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Mirrors static `body` classes for portfolio-v2.css + case-study (`v2-case-study`).
 */
export function BodyRouteClass() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // HomeMotionClient adds this during transition; it unmounts on leave so we must clear it here
    // or body stays overflow:hidden and case study pages look "stuck" on the hero.
    document.body.classList.remove("v2-page-transitioning");
    document.body.classList.remove(
      "v2-home",
      "v2-about-page",
      "v2-works-page",
      "v2-case-study",
      "v2-playground-page",
    );
    if (pathname === "/about") {
      document.body.classList.add("v2-about-page");
    } else if (pathname === "/playground") {
      document.body.classList.add("v2-home", "v2-playground-page");
    } else if (pathname === "/works") {
      document.body.classList.add("v2-home", "v2-works-page");
    } else if (pathname.startsWith("/work/")) {
      document.body.classList.add("v2-home", "v2-case-study");
    } else {
      document.body.classList.add("v2-home");
    }
  }, [pathname]);

  return null;
}
