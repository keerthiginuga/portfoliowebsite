import { aboutAccomplishments, aboutProcessItems } from "@/content/about";
import { site } from "@/content/site";
import { AboutProcessAccordion } from "./AboutProcessAccordion";

export function AboutPageContent() {
  return (
    <main>
      <div
        className="v2-main-content-wrapper"
        style={{ position: "relative", zIndex: 2, background: "#000" }}
      >
        <div className="v2-about-hero-scroll" id="about-hero-scroll">
          <section className="v2-about-hero" id="about-hero">
            <div className="v2-about-left">
              <div className="v2-about-identity">
                <h1 className="v2-about-name">{site.name}</h1>
                <p className="v2-about-role">
                  {site.role.toLowerCase().replace(/\s*&\s*/g, " | ")}
                </p>
                <a
                  href={site.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-about-resume-btn"
                  aria-label="Download Resume"
                >
                  Resume
                </a>
              </div>
            </div>

            <div className="v2-about-right">
              <blockquote className="v2-about-quote">
                I&apos;m passionate about designing
                <em> seamless technology</em> that understands, not interrupts.
                <span className="v2-about-quote-mark">&quot;</span>
              </blockquote>
            </div>

            <div className="v2-about-photo-track" aria-hidden="true">
              <figure className="v2-about-photo v2-about-photo--one" data-about-photo="one">
                <img src="/assets/images/About me (1).jpeg" alt="" />
              </figure>
              <figure className="v2-about-photo v2-about-photo--two" data-about-photo="two">
                <img src="/assets/images/About me (2).jpeg" alt="" />
              </figure>
            </div>
          </section>
        </div>

        <div className="v2-about-content">
          <section className="v2-process-section" id="process">
            <div className="v2-process-container">
              <AboutProcessAccordion eyebrow="HOW I ENJOY THE PROCESS*" items={aboutProcessItems} />
            </div>
          </section>

          <section className="v2-accomplishments-section">
            <div className="v2-accomplishments-container">
              <p className="v2-accomplishments-eyebrow">ACCOMPLISHMENTS*</p>
              <div className="v2-accomplishments-list">
                {aboutAccomplishments.map((a) => (
                  <div key={a.title} className="v2-accomplishment-item">
                    <span className="v2-accomplishment-title">{a.title}</span>
                    <span className="v2-accomplishment-org">{a.org}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

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
