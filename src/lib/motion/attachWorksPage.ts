import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { updateNavOnScroll } from "@/lib/nav/portfolioNavScroll";
import { clampValue, lerp } from "@/lib/motion/utils";

/**
 * Port of portfolio-v2/works-script.js — Lenis + ScrollTrigger stack, nav driven via Lenis scroll.
 * Caller must not use window scroll listeners for `.v2-nav` on /works (see PortfolioSiteHeader).
 */
export function attachWorksPage(onNavigate: (href: string) => void): () => void {
  const MAX_VELOCITY = 3000;
  const MAX_BOOST = 0.34;
  const FAST_LERP = 0.078;
  const SLOW_LERP = 0.025;
  const SETTLE_FRACTION = 0.25;
  const HOVER_RANGE = 80;
  const CURSOR_LERP = 0.14;
  const VELOCITY_SMOOTHING = 0.14;

  const main = document.getElementById("worksMain");
  const sticky = document.getElementById("worksSticky");
  const imgStack = document.getElementById("imgStack");
  const row = document.querySelector<HTMLElement>(".v2-works-row");
  const slides = document.querySelectorAll<HTMLElement>(".v2-stack-slide");
  const infoItems = document.querySelectorAll<HTMLElement>(".v2-stack-info-item");
  const infoTopEls = document.querySelectorAll<HTMLElement>(".v2-works-info-top");
  const infoTop0 = document.getElementById("infoTop0");
  const cursorEl = document.getElementById("viewCursor");
  const nav = document.querySelector<HTMLElement>(".v2-nav");
  const mainLogo = document.getElementById("mainLogo");

  if (!sticky || !slides.length || !imgStack || !main) {
    return () => {};
  }

  const stackEl = imgStack;
  const mainEl = main;
  const stickyEl = sticky;

  let destroyed = false;
  const NUM_PROJECTS = slides.length;
  const NUM_TRANSITIONS = NUM_PROJECTS - 1;

  let hoveredProject = -1;
  let lastPointerX: number | null = null;
  let lastPointerY: number | null = null;
  let hasInteracted = false;
  let pointerInStack = false;

  let activeInfoIndex = -1;
  let lastTaggedIndex = -1;

  let hoverSyncRaf: number | null = null;
  let resizeTimer: ReturnType<typeof setTimeout> | null = null;

  const tagSpans = document.querySelectorAll<HTMLElement>("#globalTags [data-tag]");
  const sepSpans = document.querySelectorAll<HTMLElement>("#globalTags .v2-tag-sep");

  function updateLogoRotation(scrollY: number) {
    if (!mainLogo) return;
    const scrollableDist = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableDist > 0 ? scrollY / scrollableDist : 0;
    mainLogo.style.transform = `rotate(${(progress * 360).toFixed(1)}deg)`;
  }

  function updateGlobalTags(activeIndex: number) {
    if (activeIndex === lastTaggedIndex) return;
    const item = infoItems[activeIndex];
    if (!item) return;

    const rawTags = item.getAttribute("data-tags") || "";
    const activeTags = rawTags.split(",").map((t) => t.trim());

    tagSpans.forEach((span, i) => {
      const tag = span.getAttribute("data-tag");
      const isDim = !tag || activeTags.indexOf(tag) === -1;
      span.classList.toggle("is-dim", isDim);
      const sep = sepSpans[i];
      if (sep) sep.classList.toggle("is-dim", isDim);
    });

    lastTaggedIndex = activeIndex;
  }

  function setActiveInfoItem(activeIndex: number) {
    if (activeIndex === activeInfoIndex) return;
    if (activeIndex < 0 || activeIndex >= infoItems.length) return;

    if (activeInfoIndex !== -1 && infoItems[activeInfoIndex]) {
      infoItems[activeInfoIndex].classList.remove("is-active");
    }

    infoItems[activeIndex].classList.add("is-active");
    activeInfoIndex = activeIndex;
  }

  function setCursorLabelForProject(projectIndex: number) {
    if (!cursorEl) return;
    cursorEl.innerText = projectIndex >= 5 ? "Coming soon" : "view";
  }

  function getSlideHitFromPoint(x: number, y: number): number {
    const els = document.elementsFromPoint(x, y);
    for (let k = 0; k < els.length; k++) {
      const el = els[k];
      if (el instanceof HTMLElement && el.classList.contains("v2-stack-slide")) {
        return parseInt(el.getAttribute("data-slide") || "-1", 10);
      }
    }
    return -1;
  }

  function syncHoveredProjectFromPointerNow() {
    if (lastPointerX === null || lastPointerY === null) return;

    const rect = stackEl.getBoundingClientRect();
    const isInsideStack =
      lastPointerX >= rect.left &&
      lastPointerX <= rect.right &&
      lastPointerY >= rect.top &&
      lastPointerY <= rect.bottom;

    if (!isInsideStack) return;

    const hit = getSlideHitFromPoint(lastPointerX, lastPointerY);
    if (hit === -1) return;

    if (!hasInteracted) hasInteracted = true;

    if (hit !== hoveredProject) {
      hoveredProject = hit;
      setActiveInfoItem(hoveredProject);
      updateGlobalTags(hoveredProject);
      setCursorLabelForProject(hoveredProject);
    }
  }

  function scheduleHoverSync(force?: boolean) {
    if (!force && !pointerInStack) return;
    if (hoverSyncRaf != null) return;
    hoverSyncRaf = requestAnimationFrame(() => {
      hoverSyncRaf = null;
      syncHoveredProjectFromPointerNow();
    });
  }

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    syncTouch: false,
    orientation: "vertical",
  });

  const lenisRaf = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(lenisRaf);
  gsap.ticker.lagSmoothing(0);

  const unsubLenisST = lenis.on("scroll", ScrollTrigger.update);

  const onLenisRefresh = () => {
    lenis.resize();
  };
  ScrollTrigger.addEventListener("refresh", onLenisRefresh);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value?: number) {
      if (arguments.length && typeof value === "number") {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: "fixed",
  });

  let stickyTop = 0;
  let startYPercent = 0;

  let VH = window.innerHeight;
  let SCROLL_PER_ITEM = VH * 1.5;
  let HOLD_DIST = SCROLL_PER_ITEM * 0.4;
  let TRANS_DIST = SCROLL_PER_ITEM - Math.max(0, HOLD_DIST);
  let totalScrollDist = NUM_TRANSITIONS * SCROLL_PER_ITEM;
  let END_LINGER_DIST = VH * 2.5;
  let pinDist = totalScrollDist + END_LINGER_DIST;

  const ySetters = Array.from(slides).map((slide) => gsap.quickSetter(slide, "yPercent"));

  const currentY: number[] = new Array(slides.length);
  const targetY: number[] = new Array(slides.length);

  function calcBase(): number {
    const h = stackEl.getBoundingClientRect().height;
    const textH = infoTop0 ? infoTop0.offsetHeight : 80;
    return h * 0.35 - textH * 0.5;
  }

  function seedSlidesAtStart() {
    for (let i = 0; i < slides.length; i++) {
      currentY[i] = i === 0 ? 0 : startYPercent;
      targetY[i] = i === 0 ? 0 : startYPercent;
      ySetters[i](currentY[i]);
      gsap.set(slides[i], { force3D: true });
    }
  }

  function preserveSlideProgress(prevStartYPercent: number) {
    if (!prevStartYPercent || prevStartYPercent <= 0) return;

    for (let i = 0; i < slides.length; i++) {
      if (i === 0) {
        currentY[i] = 0;
        targetY[i] = 0;
        ySetters[i](0);
        continue;
      }

      const currentProgress = clampValue(1 - currentY[i] / prevStartYPercent, 0, 1);
      const targetProgress = clampValue(1 - targetY[i] / prevStartYPercent, 0, 1);

      currentY[i] = startYPercent * (1 - currentProgress);
      targetY[i] = startYPercent * (1 - targetProgress);
      ySetters[i](currentY[i]);
    }
  }

  function recomputeMetrics(preserveSlides: boolean) {
    const prevStart = startYPercent;

    mainEl.style.display = "";
    mainEl.style.minHeight = "";
    mainEl.style.paddingBottom = "";
    stickyEl.style.marginTop = "";
    stickyTop = stickyEl.getBoundingClientRect().top;

    mainEl.style.display = "block";
    mainEl.style.minHeight = "";
    mainEl.style.paddingBottom = "0";
    stickyEl.style.marginTop = `${stickyTop}px`;

    const stackRect = stackEl.getBoundingClientRect();
    const distToVpBottom = window.innerHeight - stackRect.top;
    const exactBottomPct = stackRect.height ? (distToVpBottom / stackRect.height) * 100 : 100;
    startYPercent = exactBottomPct + 15;

    VH = window.innerHeight;
    SCROLL_PER_ITEM = VH * 1.5;
    HOLD_DIST = SCROLL_PER_ITEM * 0.4;
    TRANS_DIST = SCROLL_PER_ITEM - Math.max(0, HOLD_DIST);
    totalScrollDist = NUM_TRANSITIONS * SCROLL_PER_ITEM;
    END_LINGER_DIST = VH * 2.5;
    pinDist = totalScrollDist + END_LINGER_DIST;

    if (preserveSlides) {
      preserveSlideProgress(prevStart);
    }
  }

  recomputeMetrics(false);
  seedSlidesAtStart();

  const pinScrollTrigger = ScrollTrigger.create({
    scroller: document.documentElement,
    trigger: stickyEl,
    start: () => `top ${stickyTop}px`,
    end: () => `+=${pinDist}`,
    pin: true,
    pinSpacing: true,
    onUpdate(self) {
      if (hoveredProject !== -1) return;

      const scrolled = self.progress * pinDist;
      const rawPos = scrolled / SCROLL_PER_ITEM;
      const active = Math.min(NUM_TRANSITIONS, Math.max(0, Math.round(rawPos)));
      setActiveInfoItem(active);

      if (hasInteracted) {
        updateGlobalTags(active);
      }
    },
  });

  let scrollVelocity = 0;
  let lastScroll = 0;
  let lastTime = performance.now();
  let lastNavScroll = 0;

  const onLenisScroll = (lenisInstance: Lenis) => {
    if (destroyed) return;
    const scroll = lenisInstance.scroll;
    const now = performance.now();
    const dt = now - lastTime;

    if (dt > 0) {
      const dtClamped = clampValue(dt, 8, 48);
      const raw = (scroll - lastScroll) * (1000 / dtClamped);
      scrollVelocity = scrollVelocity * (1 - VELOCITY_SMOOTHING) + raw * VELOCITY_SMOOTHING;

      if (Math.abs(scroll - lastScroll) > 1 && !hasInteracted) {
        hasInteracted = true;
      }
    }

    if (nav) {
      lastNavScroll = updateNavOnScroll(nav, scroll, lastNavScroll);
    }
    updateLogoRotation(scroll);
    scheduleHoverSync();

    lastScroll = scroll;
    lastTime = now;
  };

  const unsubLenisNav = lenis.on("scroll", onLenisScroll);

  updateLogoRotation(0);

  function animLoop() {
    if (destroyed) return;
    const scrollPos = Math.max(0, lenis.scroll);
    const velAbs = Math.abs(scrollVelocity);
    const velNorm = Math.min(velAbs / MAX_VELOCITY, 1);
    const velBoost = velNorm * MAX_BOOST;

    for (let i = 1; i < slides.length; i++) {
      const itemStartScroll = (i - 1) * SCROLL_PER_ITEM;
      const transStartScroll = itemStartScroll + HOLD_DIST;

      let rawProgress = 0;
      if (scrollPos > transStartScroll) {
        rawProgress = (scrollPos - transStartScroll) / TRANS_DIST;
      }
      rawProgress = clampValue(rawProgress, 0, 1);

      const isActivelyTransitioning = rawProgress > 0 && rawProgress < 1;
      const boost = scrollVelocity > 0 && isActivelyTransitioning ? velBoost : 0;
      const effectiveProgress = Math.min(1, rawProgress + boost);

      targetY[i] = startYPercent * (1 - effectiveProgress);

      const delta = targetY[i] - currentY[i];
      const remaining = -delta;
      const settleZone = startYPercent * SETTLE_FRACTION;
      const lerpRate = remaining > 0 && currentY[i] < settleZone ? SLOW_LERP : FAST_LERP;

      const prevY = currentY[i];
      if (Math.abs(delta) < 0.01) {
        currentY[i] = targetY[i];
      } else {
        currentY[i] += delta * lerpRate;
      }

      if (currentY[i] !== prevY) {
        ySetters[i](currentY[i]);
      }
    }

    requestAnimationFrame(animLoop);
  }

  requestAnimationFrame(animLoop);

  let pRaf: number | null = null;
  let pStopTimer: ReturnType<typeof setTimeout> | null = null;
  let pTargetY = 0;
  let pCurrentY = 0;
  let pBaseY = 0;
  let pHovered = false;

  function setAllInfoTops(y: number) {
    const transformValue = `translateY(${y.toFixed(2)}px)`;
    infoTopEls.forEach((el) => {
      el.style.transform = transformValue;
    });
  }

  function parallaxTick() {
    if (destroyed) {
      pRaf = null;
      return;
    }
    pCurrentY = lerp(pCurrentY, pTargetY, 0.08);
    setAllInfoTops(pCurrentY);
    pRaf = requestAnimationFrame(parallaxTick);
  }

  const onImgStackEnter = (e: MouseEvent) => {
    pointerInStack = true;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;

    if (pStopTimer) {
      clearTimeout(pStopTimer);
      pStopTimer = null;
    }

    pHovered = true;
    pBaseY = calcBase();
    pCurrentY = pBaseY + 30;
    pTargetY = pBaseY;
    row?.classList.add("is-hovered");

    scheduleHoverSync(true);
    if (pRaf == null) pRaf = requestAnimationFrame(parallaxTick);
  };

  const onImgStackLeave = () => {
    pointerInStack = false;
    pHovered = false;
    hoveredProject = -1;
    row?.classList.remove("is-hovered");
    pTargetY = pBaseY + 30;

    pStopTimer = setTimeout(() => {
      if (!pHovered) {
        if (pRaf != null) cancelAnimationFrame(pRaf);
        pRaf = null;
        setAllInfoTops(pBaseY + 30);
      }
    }, 500);
  };

  const onImgStackMove = (e: MouseEvent) => {
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;

    const rect = stackEl.getBoundingClientRect();
    const normalized = (e.clientY - rect.top) / rect.height;
    pTargetY = pBaseY + (normalized - 0.5) * HOVER_RANGE * 2;

    scheduleHoverSync(true);
  };

  if (row) {
    stackEl.addEventListener("mouseenter", onImgStackEnter);
    stackEl.addEventListener("mouseleave", onImgStackLeave);
    stackEl.addEventListener("mousemove", onImgStackMove);
  }

  let mx = 0;
  let my = 0;
  let cx = 0;
  let cy = 0;
  let cRaf: number | null = null;
  let cursorVisible = false;
  const worksBody = document.body;

  function animCursor() {
    if (!cursorVisible || destroyed) {
      cRaf = null;
      return;
    }

    cx = lerp(cx, mx, CURSOR_LERP);
    cy = lerp(cy, my, CURSOR_LERP);
    if (cursorEl) {
      cursorEl.style.left = `${cx}px`;
      cursorEl.style.top = `${cy}px`;
    }
    cRaf = requestAnimationFrame(animCursor);
  }

  function ensureCursorLoop() {
    if (cRaf == null) {
      cRaf = requestAnimationFrame(animCursor);
    }
  }

  function stopCursorLoop() {
    if (cRaf != null) {
      cancelAnimationFrame(cRaf);
      cRaf = null;
    }
  }

  function showCustomCursorAt(x: number, y: number) {
    if (!cursorEl) return;
    mx = x;
    my = y;
    cx = x;
    cy = y;
    cursorVisible = true;

    cursorEl.style.left = `${cx}px`;
    cursorEl.style.top = `${cy}px`;
    cursorEl.classList.add("is-visible");

    worksBody.classList.add("v2-view-cursor-active");
    ensureCursorLoop();
  }

  function hideCustomCursor() {
    cursorVisible = false;
    cursorEl?.classList.remove("is-visible");
    worksBody.classList.remove("v2-view-cursor-active");
    stopCursorLoop();
  }

  const onDocMouseMove = (e: MouseEvent) => {
    mx = e.clientX;
    my = e.clientY;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;

    if (cursorVisible) ensureCursorLoop();
  };

  const onStackEnterCursor = (e: MouseEvent) => {
    pointerInStack = true;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    showCustomCursorAt(e.clientX, e.clientY);
    scheduleHoverSync(true);
  };

  const onStackLeaveCursor = () => {
    pointerInStack = false;
    hideCustomCursor();
  };

  const onStackClick = () => {
    if (hoveredProject < 0) return;
    const slide = slides[hoveredProject];
    const href = slide?.getAttribute("data-nav-href")?.trim();
    if (href) onNavigate(href);
  };

  const onDocMouseLeave = () => hideCustomCursor();
  const onWinBlur = () => hideCustomCursor();
  const onVisibility = () => {
    if (document.hidden) hideCustomCursor();
  };

  if (cursorEl) {
    document.addEventListener("mousemove", onDocMouseMove);
    stackEl.addEventListener("mouseenter", onStackEnterCursor);
    stackEl.addEventListener("mouseleave", onStackLeaveCursor);
    stackEl.addEventListener("click", onStackClick);
    document.addEventListener("mouseleave", onDocMouseLeave);
    window.addEventListener("blur", onWinBlur);
    document.addEventListener("visibilitychange", onVisibility);
  }

  const footer = document.getElementById("contact");
  let footerTween: gsap.core.Tween | null = null;
  if (footer && row) {
    footerTween = gsap.to(row, {
      scrollTrigger: {
        scroller: document.documentElement,
        trigger: footer,
        start: "top 80%",
        end: "top center",
        scrub: true,
      },
      opacity: 0,
      scale: 0.95,
      y: -50,
      ease: "none",
    });
  }

  function handleResize() {
    if (resizeTimer) clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      recomputeMetrics(true);
      pBaseY = calcBase();
      ScrollTrigger.refresh();
      scheduleHoverSync(true);
    }, 120);
  }

  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("orientationchange", handleResize, { passive: true });

  ScrollTrigger.refresh();

  return () => {
    destroyed = true;

    if (resizeTimer) clearTimeout(resizeTimer);
    if (pStopTimer) clearTimeout(pStopTimer);
    if (hoverSyncRaf != null) cancelAnimationFrame(hoverSyncRaf);
    if (pRaf != null) cancelAnimationFrame(pRaf);
    stopCursorLoop();

    window.removeEventListener("resize", handleResize);
    window.removeEventListener("orientationchange", handleResize);

    if (cursorEl) {
      document.removeEventListener("mousemove", onDocMouseMove);
      stackEl.removeEventListener("mouseenter", onStackEnterCursor);
      stackEl.removeEventListener("mouseleave", onStackLeaveCursor);
      stackEl.removeEventListener("click", onStackClick);
      document.removeEventListener("mouseleave", onDocMouseLeave);
      window.removeEventListener("blur", onWinBlur);
      document.removeEventListener("visibilitychange", onVisibility);
    }

    if (row) {
      stackEl.removeEventListener("mouseenter", onImgStackEnter);
      stackEl.removeEventListener("mouseleave", onImgStackLeave);
      stackEl.removeEventListener("mousemove", onImgStackMove);
    }

    hideCustomCursor();

    footerTween?.scrollTrigger?.kill();
    footerTween?.kill();
    pinScrollTrigger.kill();

    ScrollTrigger.removeEventListener("refresh", onLenisRefresh);
    unsubLenisST();
    unsubLenisNav();

    gsap.ticker.remove(lenisRaf);

    lenis.destroy();
    ScrollTrigger.killAll();

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (arguments.length && typeof value === "number") {
          window.scrollTo(0, value);
        }
        return window.scrollY || document.documentElement.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.refresh();

    mainEl.style.display = "";
    mainEl.style.minHeight = "";
    mainEl.style.paddingBottom = "";
    stickyEl.style.marginTop = "";
  };
}
