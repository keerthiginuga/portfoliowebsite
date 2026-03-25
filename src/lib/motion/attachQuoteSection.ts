import { clampValue } from "@/lib/motion/utils";

export function attachQuoteSection(): () => void {
  const section = document.querySelector(".v2-quote") as HTMLElement | null;
  const words = document.querySelectorAll(".v2-quote-word");
  const photo = document.getElementById("quotePhoto");
  if (!section || !words.length) return () => {};

  let rafId: number | null = null;

  const tick = () => {
    const rect = section.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const sectionH = section.offsetHeight;
    const entered = viewportH - rect.top;
    const totalTravel = sectionH + viewportH;
    const progress = clampValue(entered / totalTravel, 0, 1);

    words.forEach((word, i) => {
      const wordStart = 0.12 + (i / words.length) * 0.28;
      const wordEnd = wordStart + 0.1;
      const t = clampValue((progress - wordStart) / (wordEnd - wordStart), 0, 1);
      (word as HTMLElement).style.color = `rgba(249,253,254,${(0.08 + t * 0.92).toFixed(3)})`;
    });

    if (photo) {
      if (progress > 0.02 && !photo.classList.contains("is-visible")) {
        photo.classList.add("is-visible");
      }
      const ty = 140 - progress * 280;
      photo.style.transform = `translateY(${ty.toFixed(1)}%)`;
    }
  };

  const onScroll = () => {
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        tick();
        rafId = null;
      });
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  tick();

  return () => {
    window.removeEventListener("scroll", onScroll);
    if (rafId) cancelAnimationFrame(rafId);
  };
}
