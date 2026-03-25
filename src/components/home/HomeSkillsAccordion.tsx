"use client";

import { useState } from "react";
import type { SkillBlock } from "@/content/home";

type Props = {
  eyebrow: string;
  blocks: SkillBlock[];
};

export function HomeSkillsAccordion({ eyebrow, blocks }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`v2-skills-accordion${openIndex !== null ? " has-active" : ""}`}>
      <p className="v2-skills-eyebrow">{eyebrow}</p>
      {blocks.map((skill, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={skill.heading}
            className={`v2-skills-item${isOpen ? " is-open" : ""}`}
            data-skill
          >
            <button
              type="button"
              className="v2-skills-row"
              aria-expanded={isOpen}
              onClick={() => {
                setOpenIndex((cur) => {
                  if (cur === i) {
                    return null;
                  }
                  window.setTimeout(() => {
                    const openEl = document.querySelector(".v2-skills-item.is-open");
                    if (!openEl) return;
                    const rect = openEl.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    if (rect.bottom > viewportHeight) {
                      const distanceToScroll = rect.bottom - viewportHeight + 40;
                      window.scrollBy({ top: distanceToScroll, behavior: "smooth" });
                    }
                  }, 450);
                  return i;
                });
              }}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                textAlign: "inherit",
                color: "inherit",
                font: "inherit",
              }}
            >
              <div className="v2-skills-row-left">
                <div className="v2-skills-thumb">
                  <img src={skill.thumb} alt="" />
                </div>
                <span className="v2-skills-heading">{skill.heading}</span>
              </div>
              <span className="v2-skills-index">
                <span className="v2-skills-index-num">{i + 1}</span>
                <span className="v2-skills-index-icon">+</span>
              </span>
            </button>
            <div className="v2-skills-detail">
              <div className="v2-skills-detail-inner">
                <p>{skill.body}</p>
                <div className="v2-skills-pills">
                  {skill.pills.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
