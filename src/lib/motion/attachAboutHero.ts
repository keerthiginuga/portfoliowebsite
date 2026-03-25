import { clampValue } from "@/lib/motion/utils";

/**
 * Port of inline script in portfolio-v2/about.html — sequential photo reveal in hero.
 */
export function attachAboutHeroPhotoSequence(): () => void {
  const heroScroll = document.getElementById("about-hero-scroll");
  const photoOne = document.querySelector<HTMLElement>('[data-about-photo="one"]');
  const photoTwo = document.querySelector<HTMLElement>('[data-about-photo="two"]');
  if (!heroScroll || !photoOne || !photoTwo) {
    return () => {};
  }

  const PHOTO_SPEED = 0.6;
  const SECOND_IMAGE_SPEED_MULT = 0.8;
  const firstStart = 0.1;
  const secondStart = 0.46;
  const firstDuration = 0.36 / PHOTO_SPEED;
  const secondDuration = 0.38 / (PHOTO_SPEED * SECOND_IMAGE_SPEED_MULT);

  let heroStart = 0;
  let heroScrollDistance = 1;
  let rafQueued = false;
  let hasScrollStarted = false;

  const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

  const setPhotoProgress = (el: HTMLElement, progress: number) => {
    const clamped = clampValue(progress, 0, 1);
    const eased = easeOutCubic(clamped);
    const yShift = (1 - eased) * window.innerHeight * 0.95;
    const scale = 0.84 + 0.16 * eased;
    const opacity = clampValue((eased - 0.12) / 0.88, 0, 1);

    el.style.setProperty("--about-photo-y", `${yShift.toFixed(1)}px`);
    el.style.setProperty("--about-photo-scale", scale.toFixed(3));
    el.style.setProperty("--about-photo-opacity", opacity.toFixed(3));
  };

  const measure = () => {
    const rect = heroScroll.getBoundingClientRect();
    heroStart = window.scrollY + rect.top;
    heroScrollDistance = Math.max(heroScroll.offsetHeight - window.innerHeight, 1);
  };

  const render = () => {
    rafQueued = false;

    const scrollDelta = window.scrollY - heroStart;
    if (scrollDelta <= 1) {
      setPhotoProgress(photoOne, 0);
      setPhotoProgress(photoTwo, 0);
      return;
    }

    const heroProgress = clampValue((window.scrollY - heroStart) / heroScrollDistance, 0, 1);
    const firstPhotoProgress = clampValue((heroProgress - firstStart) / firstDuration, 0, 1);
    const secondPhotoProgress = clampValue((heroProgress - secondStart) / secondDuration, 0, 1);

    setPhotoProgress(photoOne, firstPhotoProgress);
    setPhotoProgress(photoTwo, secondPhotoProgress);
  };

  const requestRender = () => {
    if (!hasScrollStarted) return;
    if (rafQueued) return;
    rafQueued = true;
    requestAnimationFrame(render);
  };

  const onResize = () => {
    measure();
    if (!hasScrollStarted) {
      setPhotoProgress(photoOne, 0);
      setPhotoProgress(photoTwo, 0);
      return;
    }
    requestRender();
  };

  const onScroll = () => {
    hasScrollStarted = true;
    requestRender();
  };

  measure();
  setPhotoProgress(photoOne, 0);
  setPhotoProgress(photoTwo, 0);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    photoOne.style.removeProperty("--about-photo-y");
    photoOne.style.removeProperty("--about-photo-scale");
    photoOne.style.removeProperty("--about-photo-opacity");
    photoTwo.style.removeProperty("--about-photo-y");
    photoTwo.style.removeProperty("--about-photo-scale");
    photoTwo.style.removeProperty("--about-photo-opacity");
  };
}

export function attachAboutLogoRotation(): () => void {
  let rafId: number | null = null;

  const tick = () => {
    rafId = null;
    const logo = document.getElementById("mainLogo");
    if (!logo) return;
    const scrollableDist = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableDist > 0 ? window.scrollY / scrollableDist : 0;
    logo.style.transform = `rotate(${(progress * 360).toFixed(1)}deg)`;
  };

  const onScroll = () => {
    if (rafId != null) return;
    rafId = requestAnimationFrame(tick);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  tick();

  return () => {
    window.removeEventListener("scroll", onScroll);
    if (rafId != null) cancelAnimationFrame(rafId);
    const logo = document.getElementById("mainLogo");
    if (logo) logo.style.transform = "";
  };
}

export function attachAboutPageMotion(): () => void {
  const unPhoto = attachAboutHeroPhotoSequence();
  const unLogo = attachAboutLogoRotation();
  return () => {
    unPhoto();
    unLogo();
  };
}
