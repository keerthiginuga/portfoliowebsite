export function attachSeeAllWorks(onNavigate: (href: string) => void): () => void {
  const container = document.querySelector(".v2-see-all-container");
  if (!container) return () => {};
  const seeAllLink = container.querySelector(".v2-see-all-link") as HTMLAnchorElement | null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.5) {
          container.classList.add("is-visible");
        } else if (entry.intersectionRatio === 0) {
          container.classList.remove("is-visible");
        }
      });
    },
    { threshold: [0, 0.6] },
  );

  observer.observe(container);

  const onClick = (e: Event) => {
    const ev = e as MouseEvent;
    if (ev.defaultPrevented) return;
    if (ev.button !== 0) return;
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    e.preventDefault();
    const href = seeAllLink?.getAttribute("href") || "/works";
    document.body.classList.add("v2-page-transitioning");
    window.setTimeout(() => onNavigate(href), 400);
  };

  if (seeAllLink) {
    seeAllLink.addEventListener("click", onClick);
  }

  return () => {
    observer.disconnect();
    if (seeAllLink) seeAllLink.removeEventListener("click", onClick);
  };
}
