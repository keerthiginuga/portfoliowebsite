"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { site } from "@/content/site";

/**
 * Floating “AI Coded” control — static site only on home + about.
 */
export function AiCodedFab() {
  const pathname = usePathname();
  const show = pathname === "/" || pathname === "/about";

  useEffect(() => {
    const onPageShow = () => {
      const fab = document.querySelector(".v2-ai-fab");
      if (fab && document.activeElement === fab) {
        (fab as HTMLElement).blur();
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  if (!show) return null;

  return (
    <div className="v2-ai-fab-wrap">
      <a
        className="v2-ai-fab"
        href={site.sourceCodeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="AI Coded! View source on GitHub"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.58 2 12.23c0 4.51 2.87 8.34 6.84 9.69.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.21 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.95-2.33 4.81-4.56 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.27 10.27 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"
          />
        </svg>
        <span>AI Coded!</span>
      </a>
      <div className="v2-ai-fab-tooltip" role="note">
        Designed and coded end-to-end by me with AI collaboration, not no-code builders like Framer.
      </div>
    </div>
  );
}
