import type { MotionProject } from "@/content/projects";
import { clampValue, escapeHtml, getMotionScale, prefersReducedMotion } from "@/lib/motion/utils";

const SELECT_WORKS_CONFIG = {
  tiltRange: 15,
  spring: 0.08,
  touchScale: 0.45,
  drift: 8,
  leadSegments: 1,
  holdSegments: 1,
  exitSegments: 0,
};

export type SelectWorksElements = {
  section: HTMLElement;
  card: HTMLElement;
  tilt: HTMLElement;
  flip: HTMLElement;
  frontFace: HTMLElement;
  backFace: HTMLElement;
  marqueeEl: HTMLElement | null;
  marqueeTrack: HTMLElement;
  hitLink: HTMLAnchorElement;
};

type FaceRefs = {
  stage: HTMLElement | null;
  title: HTMLElement | null;
  tags: HTMLElement | null;
  cover: HTMLImageElement | null;
};

function getFaceRefs(faceNode: HTMLElement): FaceRefs {
  return {
    stage: faceNode.querySelector("[data-card-stage]"),
    title: faceNode.querySelector("[data-project-title]"),
    tags: faceNode.querySelector("[data-project-tags]"),
    cover: faceNode.querySelector("[data-card-cover]"),
  };
}

/**
 * Scroll-driven flip card, marquee, tilt — port of portfolio-v2/script.js `initSelectWorksCard`.
 */
export function attachSelectWorks(
  el: SelectWorksElements,
  projects: MotionProject[],
  onNavigate: (href: string) => void,
): () => void {
  const { section, card, tilt, flip, frontFace, backFace, marqueeEl, marqueeTrack, hitLink } = el;
  const headerEl = section.querySelector(".v2-select-works-header") as HTMLElement | null;
  const front = getFaceRefs(frontFace);
  const back = getFaceRefs(backFace);
  if (!front.stage || !front.title || !front.tags || !front.cover) return () => {};
  if (!back.stage || !back.title || !back.tags || !back.cover) return () => {};

  const glareEl = frontFace.querySelector("[data-card-glare]") as HTMLElement | null;
  const marqueeTracks = [marqueeTrack];

  const OUT_END_DEG = 83;
  const IN_START_DEG = 97;
  const DEAD_ZONE_START = OUT_END_DEG;
  const DEAD_ZONE_END = IN_START_DEG;
  const fullExitSafetyPx = 8;

  const { leadSegments, holdSegments, exitSegments } = SELECT_WORKS_CONFIG;
  section.style.setProperty("--v2-project-count", String(projects.length));
  section.style.setProperty("--v2-lead-segments", String(leadSegments));
  section.style.setProperty("--v2-hold-segments", String(holdSegments));
  section.style.setProperty("--v2-exit-segments", String(exitSegments));

  let angle = 0;
  let scrollProgress = 0;
  let currentRawSteps = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let activeFrontKey = "";
  let activeBackKey = "";
  let activeMarqueeKey = "";
  let activeClickableIndex = 0;
  let displayedMarqueeIndex = 0;
  let marqueeFullExitPx = 0;

  const isReducedMotion = prefersReducedMotion();
  const motionScale = getMotionScale(SELECT_WORKS_CONFIG.touchScale);

  const getProjectUrl = (index: number) => projects[index]?.href ?? "/works";

  const getVisibleProjectIndexFromState = () => {
    const rotationFloat = Math.max(0, scrollProgress - holdSegments);
    if (rotationFloat >= projects.length - 1) return projects.length - 1;
    const currentIndex = Math.floor(Math.min(rotationFloat, projects.length - 1));
    const local = rotationFloat - currentIndex;
    return local >= 0.5 ? (currentIndex + 1) % projects.length : currentIndex;
  };

  const updateCardAccessibility = (index: number) => {
    const project = projects[index] || projects[0];
    const label = project ? `View ${project.title}` : "View project";
    hitLink.href = getProjectUrl(index);
    hitLink.setAttribute("aria-label", label);
    card.setAttribute("aria-label", label);
  };

  const navigateToActiveProject = () => {
    activeClickableIndex = getVisibleProjectIndexFromState();
    updateCardAccessibility(activeClickableIndex);
    onNavigate(getProjectUrl(activeClickableIndex));
  };

  const applyProjectToFace = (refs: FaceRefs, index: number, side: "front" | "back"): boolean => {
    const project = projects[index];
    if (!project) return false;
    const key = project.title;
    if (side === "front" && key === activeFrontKey) return false;
    if (side === "back" && key === activeBackKey) return false;
    if (side === "front") activeFrontKey = key;
    if (side === "back") activeBackKey = key;

    if (refs.title) refs.title.textContent = project.title;
    if (refs.tags) {
      refs.tags.innerHTML = "";
      project.tags.forEach((tag) => {
        const chip = document.createElement("span");
        chip.textContent = tag;
        refs.tags!.appendChild(chip);
      });
    }

    if (refs.cover) {
      refs.cover.src = project.coverImage;
      refs.cover.alt = project.title;
    }
    return true;
  };

  applyProjectToFace(front, 0, "front");
  applyProjectToFace(back, 1 % projects.length, "back");

  const marqueeMarkup = (key: string) => {
    const safe = escapeHtml(key.trim().toUpperCase());
    return Array.from({ length: 12 }, () => `<span>${safe}</span>`).join("");
  };

  const updateMarqueeTravelDistance = () => {
    if (!marqueeEl || !marqueeTracks.length) return;
    const marqueeHeight = marqueeEl.getBoundingClientRect().height;
    const trackHeight = marqueeTracks.reduce((maxHeight, track) => {
      const h = track.getBoundingClientRect().height;
      return Math.max(maxHeight, h);
    }, 0);
    marqueeFullExitPx = marqueeHeight / 2 + trackHeight / 2 + fullExitSafetyPx;
  };

  const setMarquee = (projectIndex: number) => {
    const project = projects[projectIndex] || projects[0];
    const key = project.marqueeKey.trim().toUpperCase();
    if (key === activeMarqueeKey) return;
    activeMarqueeKey = key;
    const markup = marqueeMarkup(key);
    marqueeTracks.forEach((track) => {
      track.innerHTML = markup;
    });
    updateMarqueeTravelDistance();
  };

  setMarquee(0);
  updateCardAccessibility(0);

  const onHitClick = (e: Event) => {
    e.preventDefault();
    navigateToActiveProject();
  };

  const onHitKeydown = (e: Event) => {
    if (e instanceof KeyboardEvent && e.key === " ") {
      e.preventDefault();
      navigateToActiveProject();
    }
  };

  hitLink.addEventListener("click", onHitClick);
  hitLink.addEventListener("keydown", onHitKeydown);

  const syncFlipHeight = () => {
    const height = Math.ceil(frontFace.offsetHeight);
    if (!height) return;
    flip.style.height = `${height}px`;
    tilt.style.height = `${height}px`;
  };

  updateMarqueeTravelDistance();

  const onCardMouseMove = (e: MouseEvent) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    targetY = (x - 0.5) * 2 * SELECT_WORKS_CONFIG.tiltRange * motionScale;
    targetX = (0.5 - y) * 2 * SELECT_WORKS_CONFIG.tiltRange * motionScale;
    if (glareEl) {
      card.style.setProperty("--glare-x", `${(x * 100).toFixed(2)}%`);
      card.style.setProperty("--glare-y", `${(y * 100).toFixed(2)}%`);
      card.style.setProperty("--glare-opacity", "0.95");
    }
  };

  const onCardMouseLeave = () => {
    targetX = 0;
    targetY = 0;
    card.style.setProperty("--glare-x", "50%");
    card.style.setProperty("--glare-y", "50%");
    card.style.setProperty("--glare-opacity", "0.7");
  };

  card.addEventListener("mousemove", onCardMouseMove);
  card.addEventListener("mouseleave", onCardMouseLeave);

  const updateScrollProgress = () => {
    const rect = section.getBoundingClientRect();
    const vh = Math.max(1, window.innerHeight);
    const pinOffset = headerEl ? headerEl.offsetHeight : 0;
    const scrolledPastPin = -(rect.top + pinOffset);
    currentRawSteps = Math.max(0, scrolledPastPin) / vh;
    const maxSteps = holdSegments + (projects.length - 1) + exitSegments;
    scrollProgress = clampValue(currentRawSteps, 0, maxSteps);
  };

  const animate = () => {
    const t = scrollProgress;
    let baseMarqueeOpacity = 1;

    let segmentIndex = 0;
    let localProgress = 0;
    const rotationStarted = true;

    {
      const rotationFloat = Math.max(0, t - holdSegments);
      const maxFlipSteps = holdSegments + (projects.length - 1);

      const clampedRotation = Math.min(rotationFloat, projects.length - 1);
      segmentIndex = Math.floor(clampedRotation);
      localProgress = clampedRotation - segmentIndex;
      angle = localProgress * 180;

      if (rotationFloat >= projects.length - 1) {
        const rawExit = Math.max(0, currentRawSteps - maxFlipSteps);
        const exitProgress = Math.min(1, rawExit);
        const eased = exitProgress * exitProgress * (3 - 2 * exitProgress);
        section.style.setProperty("--v2-card-scale", (1 - eased * 0.18).toFixed(4));
        section.style.setProperty("--v2-card-opacity", (1 - eased).toFixed(4));
        baseMarqueeOpacity = 1 - eased;
        angle = 0;
        segmentIndex = projects.length - 1;
        localProgress = 0;
      } else {
        section.style.setProperty("--v2-card-scale", "1");
        section.style.setProperty("--v2-card-opacity", "1");
        baseMarqueeOpacity = 1;
      }
    }

    currentX += (targetX - currentX) * SELECT_WORKS_CONFIG.spring;
    currentY += (targetY - currentY) * SELECT_WORKS_CONFIG.spring;

    let visibleProjectIndex = 0;
    let nextProjectIndex = 1 % projects.length;
    let didUpdateFront = false;
    let didUpdateBack = false;

    if (rotationStarted) {
      const curIdx = segmentIndex % projects.length;
      nextProjectIndex = (curIdx + 1) % projects.length;
      visibleProjectIndex = localProgress >= 0.5 ? nextProjectIndex : curIdx;
      didUpdateFront = applyProjectToFace(front, curIdx, "front");
      didUpdateBack = applyProjectToFace(back, nextProjectIndex, "back");
    } else {
      didUpdateFront = applyProjectToFace(front, 0, "front");
      didUpdateBack = applyProjectToFace(back, 1 % projects.length, "back");
    }

    if (didUpdateFront || didUpdateBack) syncFlipHeight();

    const effectiveAngle = isReducedMotion || !rotationStarted ? 0 : angle;

    let marqueeTargetIndex = displayedMarqueeIndex;
    let marqueePhaseOpacity = 1;

    if (rotationStarted) {
      const curIdx = segmentIndex % projects.length;
      const incomingIdx = (curIdx + 1) % projects.length;
      if (effectiveAngle < DEAD_ZONE_START) {
        marqueeTargetIndex = curIdx;
      } else if (effectiveAngle < DEAD_ZONE_END) {
        marqueeTargetIndex = curIdx;
        marqueePhaseOpacity = 0;
      } else {
        marqueeTargetIndex = incomingIdx;
      }
    } else {
      marqueeTargetIndex = 0;
    }

    if (marqueeTracks.length && marqueeTargetIndex !== displayedMarqueeIndex) {
      displayedMarqueeIndex = marqueeTargetIndex;
      setMarquee(displayedMarqueeIndex);
    }

    if (activeClickableIndex !== visibleProjectIndex) {
      activeClickableIndex = visibleProjectIndex;
      updateCardAccessibility(activeClickableIndex);
    }

    let translateYPx = 0;
    if (effectiveAngle <= OUT_END_DEG) {
      const progress = OUT_END_DEG > 0 ? effectiveAngle / OUT_END_DEG : 1;
      translateYPx = -(progress * marqueeFullExitPx);
    } else if (effectiveAngle < IN_START_DEG) {
      translateYPx = -marqueeFullExitPx;
    } else {
      const span = Math.max(1, 180 - IN_START_DEG);
      const progress = (effectiveAngle - IN_START_DEG) / span;
      translateYPx = marqueeFullExitPx * (1 - progress);
    }
    section.style.setProperty("--v2-marquee-y", `${translateYPx.toFixed(2)}px`);

    if (marqueeEl) {
      marqueeEl.style.transformOrigin = "";
      marqueeEl.style.transform = "";
      marqueeEl.style.opacity = (baseMarqueeOpacity * marqueePhaseOpacity).toFixed(4);
    }

    const driftX = (currentY * SELECT_WORKS_CONFIG.drift) / SELECT_WORKS_CONFIG.tiltRange;
    const driftY = (-currentX * SELECT_WORKS_CONFIG.drift) / SELECT_WORKS_CONFIG.tiltRange;
    tilt.style.transform = `translate3d(${driftX.toFixed(2)}px, ${driftY.toFixed(2)}px, 0) rotateX(${currentX.toFixed(3)}deg) rotateY(${currentY.toFixed(3)}deg)`;
    flip.style.transform = `rotateX(${effectiveAngle.toFixed(3)}deg)`;
  };

  let isVisible = false;
  let rafId: number | null = null;

  const loop = () => {
    if (!isVisible) return;
    animate();
    rafId = requestAnimationFrame(loop);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!rafId) loop();
        } else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      });
    },
    { rootMargin: "100px 0px 100px 0px" },
  );

  observer.observe(section);

  const onScroll = () => {
    if (isVisible) updateScrollProgress();
  };

  const onResize = () => {
    if (isVisible) {
      updateScrollProgress();
      syncFlipHeight();
      updateMarqueeTravelDistance();
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  syncFlipHeight();
  updateScrollProgress();

  return () => {
    hitLink.removeEventListener("click", onHitClick);
    hitLink.removeEventListener("keydown", onHitKeydown);
    card.removeEventListener("mousemove", onCardMouseMove);
    card.removeEventListener("mouseleave", onCardMouseLeave);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    observer.disconnect();
    if (rafId) cancelAnimationFrame(rafId);
  };
}
