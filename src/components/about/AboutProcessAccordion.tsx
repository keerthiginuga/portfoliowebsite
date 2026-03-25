"use client";

import { useState } from "react";
import type { AboutProcessItem } from "@/content/about";

export function AboutProcessAccordion({
  eyebrow,
  items,
}: {
  eyebrow: string;
  items: AboutProcessItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`v2-process-accordion${openIndex !== null ? " has-active" : ""}`}>
      <p className="v2-process-eyebrow">{eyebrow}</p>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.heading} className={`v2-process-item${isOpen ? " is-open" : ""}`} data-process-item={i}>
            <button
              type="button"
              className="v2-process-row"
              aria-expanded={isOpen}
              onClick={() => {
                setOpenIndex((cur) => {
                  if (cur === i) {
                    return null;
                  }
                  window.setTimeout(() => {
                    const openEl = document.querySelector(".v2-process-item.is-open");
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
                cursor: "pointer",
                textAlign: "inherit",
                color: "inherit",
                font: "inherit",
              }}
            >
              <div className="v2-process-row-left">
                <div className="v2-process-thumb">
                  <img src={item.thumb} alt="" />
                </div>
                <span className="v2-process-heading">{item.heading}</span>
              </div>
              <span className="v2-process-index">
                <span className="v2-process-index-num">{i + 1}</span>
                <span className="v2-process-index-icon">+</span>
              </span>
            </button>
            <div className="v2-process-detail">
              <div className="v2-process-detail-inner">
                <p>{item.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
