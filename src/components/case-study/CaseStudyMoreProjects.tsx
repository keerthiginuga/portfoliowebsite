"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import type { CaseStudyMoreCard } from "@/content/projects";

export function CaseStudyMoreProjects({ projects }: { projects: CaseStudyMoreCard[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const getScrollStep = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return viewport?.clientWidth ?? 400;
    const firstCard = track.querySelector(".ps-more-card");
    if (!firstCard) return viewport.clientWidth;
    const gap =
      parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap || "0") || 0;
    return firstCard.getBoundingClientRect().width + gap;
  }, []);

  const getMaxScrollLeft = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    return Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  }, []);

  const scrollByStep = useCallback(
    (direction: number) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const step = getScrollStep();
      const maxScrollLeft = getMaxScrollLeft();
      const targetLeft = Math.max(0, Math.min(maxScrollLeft, viewport.scrollLeft + step * direction));
      viewport.scrollTo({ left: targetLeft, behavior: "smooth" });
    },
    [getScrollStep, getMaxScrollLeft],
  );

  const handleResize = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScrollLeft = getMaxScrollLeft();
    if (viewport.scrollLeft > maxScrollLeft) viewport.scrollLeft = maxScrollLeft;
  }, [getMaxScrollLeft]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  if (!projects.length) return null;

  return (
    <section className="ps-more-projects" aria-labelledby="ps-more-projects-title">
      <div className="ps-more-projects-inner">
        <header className="ps-more-projects-header">
          <h2 className="ps-more-projects-header-text" id="ps-more-projects-title">
            VIEW MORE PROJECTS<sup>&apos;</sup>
          </h2>
        </header>
        <div className="ps-more-carousel">
          <button
            type="button"
            className="ps-more-control ps-more-control--prev"
            aria-label="Previous projects"
            onClick={() => scrollByStep(-1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M14.5 6.5L9 12l5.5 5.5" />
            </svg>
          </button>
          <div className="ps-more-projects-viewport" ref={viewportRef}>
            <div className="ps-more-projects-track" ref={trackRef}>
              {projects.map((p) => (
                <Link key={p.href} href={p.href} className="ps-more-card" aria-label={`View ${p.title}`}>
                  <div className="ps-more-card-media">
                    <img src={p.heroImage} alt="" loading="lazy" />
                  </div>
                  <div className="ps-more-card-body">
                    <h3 className="ps-more-card-title">{p.title}</h3>
                    <ul className="ps-more-card-tags">
                      {p.tags.map((tag, ti) => (
                        <li key={`${p.href}-${ti}-${tag}`} className="ps-more-card-tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="ps-more-control ps-more-control--next"
            aria-label="Next projects"
            onClick={() => scrollByStep(1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M9.5 6.5L15 12l-5.5 5.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
