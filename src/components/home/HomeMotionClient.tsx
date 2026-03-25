"use client";

import type { MotionProject } from "@/content/projects";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useLayoutEffect } from "react";
import { attachHeroParallax } from "@/lib/motion/attachHeroParallax";
import { attachLogoRotation } from "@/lib/motion/attachLogoRotation";
import { attachQuoteCursor } from "@/lib/motion/attachQuoteCursor";
import { attachQuoteSection } from "@/lib/motion/attachQuoteSection";
import { attachSeeAllWorks } from "@/lib/motion/attachSeeAllWorks";
import { attachSelectWorks } from "@/lib/motion/attachSelectWorks";

type Props = {
  motionProjects: MotionProject[];
  children: ReactNode;
};

function navigateWithTransition(router: ReturnType<typeof useRouter>, href: string) {
  document.body.classList.add("v2-page-transitioning");
  window.setTimeout(() => {
    router.push(href);
  }, 400);
}

export function HomeMotionClient({ motionProjects, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.remove("v2-page-transitioning");
  }, [pathname]);

  useLayoutEffect(() => {
    if (pathname !== "/") return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const cleanups: (() => void)[] = [];

    cleanups.push(attachHeroParallax());
    cleanups.push(attachLogoRotation());
    cleanups.push(attachQuoteSection());

    const section = document.querySelector(".v2-select-works") as HTMLElement | null;
    const card = section?.querySelector("[data-parallax-card]") as HTMLElement | null;
    const tilt = card?.querySelector(".v2-sonix-tilt") as HTMLElement | null;
    const flip = card?.querySelector("[data-card-flip]") as HTMLElement | null;
    const faces = card?.querySelectorAll(".v2-sonix-face");
    const frontFace = faces?.[0] as HTMLElement | undefined;
    const backFace = faces?.[1] as HTMLElement | undefined;
    const hitLink = card?.querySelector(".v2-sonix-hitarea") as HTMLAnchorElement | null;
    const marqueeEl = section?.querySelector(".v2-select-works-marquee") as HTMLElement | null;
    const marqueeTrack = section?.querySelector(".v2-select-works-marquee-track") as HTMLElement | null;

    if (section && card && tilt && flip && frontFace && backFace && hitLink && marqueeTrack) {
      cleanups.push(
        attachSelectWorks(
          {
            section,
            card,
            tilt,
            flip,
            frontFace,
            backFace,
            marqueeEl,
            marqueeTrack,
            hitLink,
          },
          motionProjects,
          (href) => navigateWithTransition(router, href),
        ),
      );
    }

    cleanups.push(attachSeeAllWorks((href) => navigateWithTransition(router, href)));
    cleanups.push(
      attachQuoteCursor(() => {
        navigateWithTransition(router, "/about");
      }),
    );

    const onPageShow = () => {
      document.body.classList.remove("v2-page-transitioning");
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      cleanups.forEach((fn) => fn());
    };
  }, [pathname, router, motionProjects]);

  return <>{children}</>;
}
