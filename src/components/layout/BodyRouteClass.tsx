"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Mirrors static `body` classes: `v2-home` vs `v2-about-page` for portfolio-v2.css.
 */
export function BodyRouteClass() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    document.body.classList.remove("v2-home", "v2-about-page");
    if (pathname === "/about") {
      document.body.classList.add("v2-about-page");
    } else {
      document.body.classList.add("v2-home");
    }
  }, [pathname]);

  return null;
}
