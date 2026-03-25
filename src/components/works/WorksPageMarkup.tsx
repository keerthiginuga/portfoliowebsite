import type { Project, ProjectId } from "@/content/projects";
import { site } from "@/content/site";

const WORKS_TAG_OVERRIDES: Partial<Record<ProjectId, string>> = {
  sonix: "UX Research,UX Design,Branding",
  "google-nest": "UX Research,UX Design,Branding,Design Systems",
  kohler: "UX Research,Product Design,Product Strategy,Systems Thinking",
  kroger: "UX Research,Service Design,Systems Thinking",
  sync: "UX Research,Interaction Design,Prototyping,Electronics",
  zillow: "UX Research,UX Design,User Testing",
};

function worksDataTags(p: Project): string {
  const o = WORKS_TAG_OVERRIDES[p.id];
  if (o) return o;
  return p.categories
    .split(/\s*\/\s*/)
    .map((s) => s.trim())
    .join(",");
}

export function WorksPageMarkup({ projects }: { projects: Project[] }) {
  return (
    <>
      <div className="v2-view-cursor" id="viewCursor" aria-hidden="true">
        view
      </div>

      <main className="v2-works-main" id="worksMain">
        <div className="v2-works-sticky" id="worksSticky">
          <header className="v2-works-header">
            <span className="v2-works-header-text">
              ALL WORKS<sup>&quot;</sup>
            </span>
          </header>

          <div className="v2-works-row">
            <div className="v2-works-img-stack" id="imgStack">
              {projects.map((p, i) => (
                <div
                  key={p.id}
                  className="v2-stack-slide"
                  data-slide={i}
                  data-nav-href={p.hasCaseStudyPage ? p.href : ""}
                >
                  <img className="v2-stack-img" src={p.heroImage} alt={p.shortTitle} />
                </div>
              ))}
            </div>

            <div className="v2-works-info" id="worksInfo">
              {projects.map((p, i) => (
                <div key={p.id} className="v2-stack-info-item" data-info={i} data-tags={worksDataTags(p)}>
                  <div className="v2-works-info-top" id={`infoTop${i}`}>
                    <h2 className="v2-works-title">{p.title}</h2>
                    <p className="v2-works-desc">{p.description}</p>
                  </div>
                </div>
              ))}

              <p className="v2-global-tags" id="globalTags">
                <span data-tag="UX Research">UX Research</span>
                <span className="v2-tag-sep">/</span>
                <span data-tag="UX Design">UX Design</span>
                <span className="v2-tag-sep">/</span>
                <span data-tag="Interaction Design">Interaction Design</span>
                <span className="v2-tag-sep">/</span>
                <span data-tag="Service Design">Service Design</span>
                <span className="v2-tag-sep">/</span>
                <span data-tag="Product Design">Product Design</span>
                <span className="v2-tag-sep">/</span>
                <span data-tag="Design Strategy">Design Strategy</span>
                <span className="v2-tag-sep">/</span>
                <span data-tag="Product Strategy">Product Strategy</span>
                <span className="v2-tag-sep">/</span>
                <span data-tag="Systems Thinking">Systems Thinking</span>
                <span className="v2-tag-sep">/</span>
                <span data-tag="Information Architecture">Information Architecture</span>
                <span className="v2-tag-sep">/</span>
                <span data-tag="Branding">Branding</span>
                <span className="v2-tag-sep">/</span>
                <span data-tag="Design Systems">Design Systems</span>
                <span className="v2-tag-sep">/</span>
                <span data-tag="User Testing">User Testing</span>
                <span className="v2-tag-sep">/</span>
                <span data-tag="Prototyping">Prototyping</span>
                <span className="v2-tag-sep">/</span>
                <span data-tag="Electronics">Electronics</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <div style={{ height: "5vh" }} aria-hidden="true" />

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
    </>
  );
}
