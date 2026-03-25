import { clampValue, getMotionScale } from "@/lib/motion/utils";

const HERO_CONFIG = {
  pointerStrength: 26,
  scrollStrength: 0.06,
  smoothing: 0.08,
  touchScale: 0.45,
};

export function attachHeroParallax(): () => void {
  const hero = document.querySelector(".v2-hero");
  const group = document.querySelector('[data-parallax-group="hero"]');
  if (!hero || !group) return () => {};

  const heroCards = Array.from(group.querySelectorAll(".v2-hero-card")) as HTMLElement[];
  if (!heroCards.length) return () => {};

  let heroPointer = { x: 0, y: 0 };
  let heroCurrent = { x: 0, y: 0 };
  let heroScrollOffset = 0;
  let heroMotionScale = getMotionScale(HERO_CONFIG.touchScale);
  let heroAnimFrame: number | null = null;

  const animate = () => {
    heroCurrent.x += (heroPointer.x - heroCurrent.x) * HERO_CONFIG.smoothing;
    heroCurrent.y += (heroPointer.y - heroCurrent.y) * HERO_CONFIG.smoothing;

    heroCards.forEach((card) => {
      const depth = Number(card.dataset.depth || 0.5);
      const x = heroCurrent.x * depth * heroMotionScale;
      const y = (heroCurrent.y * depth + heroScrollOffset * depth) * heroMotionScale;
      card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    heroAnimFrame = requestAnimationFrame(animate);
  };

  heroAnimFrame = requestAnimationFrame(animate);

  const onMouseMove = (e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    heroPointer.x = ((e.clientX - cx) / cx) * HERO_CONFIG.pointerStrength;
    heroPointer.y = ((e.clientY - cy) / cy) * HERO_CONFIG.pointerStrength;
  };

  const onMouseLeave = () => {
    heroPointer.x = 0;
    heroPointer.y = 0;
  };

  const onScroll = () => {
    const rect = hero.getBoundingClientRect();
    const progress = clampValue(-rect.top / Math.max(rect.height, 1), 0, 1);
    heroScrollOffset = progress * (window.innerHeight * HERO_CONFIG.scrollStrength);
  };

  const onResize = () => {
    heroMotionScale = getMotionScale(HERO_CONFIG.touchScale);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseleave", onMouseLeave);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  return () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseleave", onMouseLeave);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    if (heroAnimFrame) cancelAnimationFrame(heroAnimFrame);
  };
}
