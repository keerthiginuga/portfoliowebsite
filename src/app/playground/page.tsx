import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Playground — Keerthi Ginuga",
  description:
    "Playground experiments by Keerthi Ginuga. New UX concepts and interaction studies are coming soon.",
};

export default function PlaygroundPage() {
  return (
    <main className="v2-playground-main">
      <div className="v2-playground-glow v2-playground-glow--one" aria-hidden="true" />
      <div className="v2-playground-glow v2-playground-glow--two" aria-hidden="true" />

      <section className="v2-playground-layout" aria-label="Playground coming soon">
        <div className="v2-playground-content">
          <p className="v2-playground-kicker">In Progress / Studio Playground</p>
          <h1 className="v2-playground-title">
            <span>
              <em>Coming</em>
            </span>
            <span>
              <em>Soon</em>
            </span>
          </h1>
          <p className="v2-playground-copy">
            I am crafting a living playground of interaction experiments, speculative UX systems, and micro-prototypes
            that test how digital products can feel more human, expressive, and useful.
          </p>

          <div className="v2-playground-chip-row" aria-label="Focus areas">
            <span className="v2-playground-chip">Motion Prototypes</span>
            <span className="v2-playground-chip">UX Systems</span>
            <span className="v2-playground-chip">Design Engineering</span>
            <span className="v2-playground-chip">Interaction Studies</span>
          </div>

          <div className="v2-playground-actions">
            <Link href="/works" className="v2-playground-btn v2-playground-btn--solid">
              See Selected Works
            </Link>
            <Link href="/about" className="v2-playground-btn v2-playground-btn--ghost">
              About My Process
            </Link>
          </div>
        </div>

        <div className="v2-playground-orbit" aria-hidden="true">
          <div className="v2-playground-orbit-core" />
          <div className="v2-playground-pulse" />
          <div className="v2-playground-note v2-playground-note--one">
            <b>Experiment 01</b>Spatial Nav Systems
          </div>
          <div className="v2-playground-note v2-playground-note--two">
            <b>Experiment 02</b>Emotive UI States
          </div>
          <div className="v2-playground-note v2-playground-note--three">
            <b>Experiment 03</b>Adaptive Workflows
          </div>
          <div className="v2-playground-note v2-playground-note--four">
            <b>Experiment 04</b>Future Interactions
          </div>
        </div>
      </section>
    </main>
  );
}
