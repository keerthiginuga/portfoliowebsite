import Link from "next/link";
import type { MotionProject } from "@/content/projects";
import { heroCards, quoteLines, skillBlocks } from "@/content/home";
import { site } from "@/content/site";
import { HomeSkillsAccordion } from "./HomeSkillsAccordion";

type Props = {
  motionProjects: MotionProject[];
};

function CardFace({
  project,
  variant,
}: {
  project: MotionProject;
  variant: "front" | "back";
}) {
  const faceClass =
    variant === "front"
      ? "v2-sonix-content v2-sonix-face v2-sonix-face--front"
      : "v2-sonix-content v2-sonix-face v2-sonix-face--back";

  return (
    <div className={faceClass}>
      <div className="v2-sonix-glare" data-card-glare />
      <div className="v2-sonix-media v2-sonix-3d-stage" data-card-stage>
        <img data-card-cover src={project.coverImage} alt="" />
      </div>
      <div className="v2-sonix-copy">
        <h3 data-project-title>{project.title}</h3>
        <div className="v2-sonix-tags" data-project-tags>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomePageContent({ motionProjects }: Props) {
  const p0 = motionProjects[0];
  const p1 = motionProjects[1] ?? motionProjects[0];

  return (
    <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <section id="home" className="v2-hero" data-motion-enabled="true">
        <div className="v2-hero-bg" aria-hidden="true" />

        <div className="v2-hero-cards" data-parallax-group="hero">
          {heroCards.map((card) => (
            <article key={card.src} className="v2-hero-card" data-depth={card.depth}>
              <img src={card.src} alt={card.alt} />
            </article>
          ))}
        </div>

        <div className="v2-hero-content">
          <h1 className="v2-hero-name">Keerthi Ginuga</h1>
          <p className="v2-hero-title">Architect &amp; User Experience Designer</p>
        </div>

        <div className="v2-selected-works-cue">
          <span className="v2-cue-line" aria-hidden="true" />
          <span>SELECTED WORKS</span>
        </div>
      </section>

      <section className="v2-select-works" id="select-works">
        <div className="v2-select-works-panel">
          <div className="v2-select-works-top-spacer" aria-hidden="true" />
          <header className="v2-select-works-header">
            <h2 className="v2-select-works-title">
              <span>Selected</span>
              <span>Works</span>
            </h2>
            <p className="v2-select-works-intro">
              I love to learn by making and experimenting.
              <br />
              /here&apos;s some of my works
            </p>
          </header>

          <div className="v2-select-works-sticky">
            <div className="v2-select-works-marquee" aria-hidden="true">
              <div className="v2-select-works-marquee-track">
                {Array.from({ length: 6 }, (_, i) => (
                  <span key={i}>{p0.marqueeKey}</span>
                ))}
              </div>
            </div>

            <div className="v2-sonix-card-wrap" data-card-wrap>
              <article className="v2-sonix-card" data-parallax-card>
                <div className="v2-sonix-tilt">
                  <div className="v2-sonix-flip" data-card-flip>
                    <CardFace project={p0} variant="front" />
                    <CardFace project={p1} variant="back" />
                  </div>
                </div>
                <a
                  className="v2-sonix-hitarea"
                  href={p0.href}
                  aria-label={`View ${p0.title}`}
                />
              </article>
            </div>
          </div>

          <div className="v2-select-works-scroll-space" aria-hidden="true" />
        </div>
      </section>

      <div className="v2-see-all-container">
        <div className="v2-see-all-link-mask">
          <Link href="/works" className="v2-see-all-link">
            SEE ALL WORKS
          </Link>
        </div>
        <div className="v2-section-divider" aria-hidden="true" />
      </div>

      <section className="v2-skills" id="skills">
        <HomeSkillsAccordion eyebrow="What I'm Good At *" blocks={skillBlocks} />
      </section>

      <section className="v2-quote" id="about">
        <div className="v2-quote-sticky">
          <div className="v2-quote-inner">
            <p className="v2-quote-text" id="quoteText">
              {quoteLines.map((line, lineIndex) => (
                <span key={lineIndex} className="v2-quote-line">
                  {line.map((w, wi) => (
                    <span
                      key={wi}
                      className={`v2-quote-word${w.italic ? " v2-quote-word--italic" : ""}`}
                    >
                      {w.text}
                      {wi < line.length - 1 ? " " : ""}
                    </span>
                  ))}
                </span>
              ))}
            </p>
            <div className="v2-quote-photo" id="quotePhoto">
              <Link href="/about" className="v2-quote-photo-link" aria-label="About Keerthi">
                <img src="/assets/images/my-quote-photo.jpg" alt="Keerthi Ginuga Quote Photo" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="v2-footer" id="contact">
        <div className="v2-footer-inner">
          <h2 className="v2-footer-headline">
            <span>LET&apos;S CREATE</span>
            <span>WHAT&apos;S NEXT,</span>
            <em>Together.</em>
          </h2>
        </div>
        <nav className="v2-footer-links" aria-label="Footer">
          <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={site.resumePath} target="_blank" rel="noopener noreferrer">
            Résumé
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
        </nav>
      </footer>
    </main>
  );
}
