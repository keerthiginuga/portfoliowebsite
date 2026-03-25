import { Fragment } from "react";
import type { CaseStudyDoc } from "@/content/caseStudies";
import { site } from "@/content/site";

export function CaseStudyView({ doc }: { doc: CaseStudyDoc }) {
  const heroImgClass = `ps-hero-img ps-hero-img--${doc.heroCoverClass}`;

  return (
    <div className="v2-case-study-root">
      <section className="ps-hero">
        <img className={heroImgClass} src={doc.heroImage} alt="" />
        <h1 className="ps-hero-title">{doc.heroTitle}</h1>
        <div className="ps-scroll-indicator" aria-hidden="true">
          <span className="ps-scroll-mouse">
            <span className="ps-scroll-wheel" />
          </span>
        </div>
      </section>

      <section className="ps-info">
        <div className="ps-meta-row">
          <div className="ps-meta-item">
            <p className="ps-meta-label">Role</p>
            <p className="ps-meta-value">
              {doc.meta.roleLines.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 ? <br /> : null}
                  {line}
                </Fragment>
              ))}
            </p>
          </div>
          <div className="ps-meta-item">
            <p className="ps-meta-label">Timeline</p>
            <p className="ps-meta-value">{doc.meta.timeline}</p>
          </div>
        </div>

        <div className="ps-info-grid">
          <div className="ps-left">
            {doc.sections.map((section) => (
              <div key={section.heading} className="ps-section">
                <h2 className="ps-section-heading">{section.heading}</h2>
                {section.paragraphs?.map((html, i) => (
                  <p
                    key={i}
                    className={`ps-section-body${i > 0 ? " ps-paragraph-gap" : ""}`}
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                ))}
                {section.list && section.list.length > 0 ? (
                  <div className="ps-section-body">
                    <ul>
                      {section.list.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="ps-right">
            <div className="ps-detail-group">
              <h3 className="ps-detail-label">Understanding the Process</h3>
              <ul className="ps-detail-list">
                {doc.process.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="ps-detail-group">
              <h3 className="ps-detail-label">Tools &amp; Technologies</h3>
              <ul className="ps-detail-list">
                {doc.tools.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="ps-images">
        {doc.gallery.map((src, i) => (
          <div key={src} className="ps-image-full">
            <img src={src} alt={`${doc.heroTitle} — slide ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </section>

      {doc.carousel ? (
        <section className="pk-gallery" aria-label="Project photo gallery">
          <div className="pk-gallery-head">
            <p className="pk-gallery-eyebrow">{doc.carousel.eyebrow}</p>
          </div>
          <div className="pk-carousel">
            <div className="pk-carousel-track">
              <div className="pk-carousel-group">
                {doc.carousel.images.map((img) => (
                  <figure key={img.src} className="pk-shot">
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  </figure>
                ))}
              </div>
              <div className="pk-carousel-group" aria-hidden="true">
                {doc.carousel.images.map((img) => (
                  <figure key={`${img.src}-dup`} className="pk-shot">
                    <img src={img.src} alt="" loading="lazy" />
                  </figure>
                ))}
              </div>
            </div>
          </div>
          {doc.carousel.cta ? (
            <div className="pk-case-cta">
              <div className="pk-case-link-mask">
                <a className="pk-case-link" href={doc.carousel.cta.href} target="_blank" rel="noopener noreferrer">
                  {doc.carousel.cta.label}
                </a>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      <footer className="ps-footer" id="contact">
        <div className="ps-footer-inner">
          <h2 className="ps-footer-headline">
            <span>LET&apos;S CREATE</span>
            <span>WHAT&apos;S NEXT,</span>
            <em>Together.</em>
          </h2>
        </div>
        <nav className="ps-footer-links" aria-label="Footer">
          <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={site.resumePath} target="_blank" rel="noopener noreferrer">
            Résumé
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
        </nav>
      </footer>
    </div>
  );
}
