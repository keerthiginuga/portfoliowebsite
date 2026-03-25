import Link from "next/link";
import { heroCards, quoteWords, skillBlocks } from "@/content/home";
import { getHomeStackImages, getSelectWorksProjects } from "@/content/projects";
import { site } from "@/content/site";
import { HomeSkillsAccordion } from "./HomeSkillsAccordion";

export function HomePage() {
  const [featured] = getSelectWorksProjects();
  const stackImages = getHomeStackImages(featured);

  return (
    <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <section id="home" className="v2-hero" data-motion-enabled="false">
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
                  <span key={i}>{featured.marqueeKey}</span>
                ))}
              </div>
            </div>

            <div className="v2-sonix-card-wrap" data-card-wrap>
              <article className="v2-sonix-card" data-parallax-card>
                <Link
                  href={featured.href}
                  className="v2-sonix-hitarea"
                  aria-label={`View ${featured.shortTitle} project`}
                />
                <div className="v2-sonix-content" data-card-content>
                  <div className="v2-sonix-glare" data-card-glare />
                  <div className="v2-sonix-media v2-sonix-3d-stage" data-card-stage>
                    {stackImages.map((src, layerIndex) => (
                      <img
                        key={layerIndex}
                        data-layer={String(layerIndex)}
                        src={src}
                        alt={`${featured.shortTitle} feature mockup ${layerIndex + 1}`}
                      />
                    ))}
                  </div>
                  <div className="v2-sonix-copy">
                    <h3 data-project-title>{featured.title}</h3>
                    <div className="v2-sonix-tags" data-project-tags>
                      {featured.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="v2-select-works-scroll-space" aria-hidden="true" />
        </div>
      </section>

      <div className="v2-see-all-container is-visible">
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
              {quoteWords.map((w, i) => (
                <span
                  key={i}
                  className={`v2-quote-word${w.italic ? " v2-quote-word--italic" : ""}`}
                >
                  {w.text}
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
