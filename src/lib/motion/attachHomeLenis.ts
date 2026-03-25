import Lenis from "lenis";
import { updateNavOnScroll } from "@/lib/nav/portfolioNavScroll";

/** Matches static `portfolio-v2/script.js`: Lenis + nav driven by smooth scroll position. */
export function attachHomeLenis(nav: HTMLElement | null, initialScrollY: number): () => void {
  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    syncTouch: false,
  });

  lenis.scrollTo(initialScrollY, { immediate: true });

  let lastNavScroll = lenis.scroll;
  const onLenisScroll = () => {
    if (nav) lastNavScroll = updateNavOnScroll(nav, lenis.scroll, lastNavScroll);
  };
  const unsub = lenis.on("scroll", onLenisScroll);
  onLenisScroll();

  let rafId = 0;
  const raf = (time: number) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(rafId);
    unsub();
    lenis.destroy();
  };
}
