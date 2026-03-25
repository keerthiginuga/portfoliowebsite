import { lerp } from "@/lib/motion/utils";

const QUOTE_CURSOR_CONFIG = {
  lerp: 0.35,
};

export function attachQuoteCursor(onAboutNavigate: () => void): () => void {
  const quoteSection = document.querySelector(".v2-quote");
  const photoLink = document.querySelector(".v2-quote-photo-link");
  const quoteText = document.getElementById("quoteText");
  const cursor = document.getElementById("quoteCursor");
  if (!cursor) return () => {};

  const targets = [photoLink, quoteText].filter(Boolean) as Element[];
  if (!targets.length) return () => {};

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let rafId: number | null = null;
  let layoutTicking = false;
  const body = document.body;

  const animateCursor = () => {
    cursorX = lerp(cursorX, mouseX, QUOTE_CURSOR_CONFIG.lerp);
    cursorY = lerp(cursorY, mouseY, QUOTE_CURSOR_CONFIG.lerp);
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    rafId = requestAnimationFrame(animateCursor);
  };

  const showCursorAt = (x: number, y: number) => {
    mouseX = x;
    mouseY = y;
    cursorX = x;
    cursorY = y;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    cursor.classList.add("is-visible");
    body.classList.add("v2-view-cursor-active");
    if (!rafId) animateCursor();
  };

  const hideCursor = () => {
    cursor.classList.remove("is-visible");
    body.classList.remove("v2-view-cursor-active");
  };

  const isPointerOverTarget = () => {
    const el = document.elementFromPoint(mouseX, mouseY);
    if (!el) return false;
    return targets.some((target) => target === el || target.contains(el));
  };

  const syncCursorVisibilityOnLayoutChange = () => {
    if (layoutTicking) return;
    layoutTicking = true;
    requestAnimationFrame(() => {
      layoutTicking = false;
      if (!cursor.classList.contains("is-visible")) return;
      if (!isPointerOverTarget()) hideCursor();
    });
  };

  const onPointerMove = (e: PointerEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) animateCursor();
  };

  const onPointerEnterTarget = (e: PointerEvent) => {
    showCursorAt(e.clientX, e.clientY);
  };

  const onPointerMoveTarget = (e: PointerEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  document.addEventListener("pointermove", onPointerMove);

  targets.forEach((target) => {
    target.addEventListener("pointerenter", onPointerEnterTarget as EventListener);
    target.addEventListener("pointermove", onPointerMoveTarget as EventListener);
    target.addEventListener("pointerleave", hideCursor);
  });

  const onDocMouseLeave = () => hideCursor();
  const onPointerCancel = () => hideCursor();
  const onBlur = () => hideCursor();

  document.addEventListener("mouseleave", onDocMouseLeave);
  document.addEventListener("pointercancel", onPointerCancel);
  window.addEventListener("blur", onBlur);
  window.addEventListener("scroll", syncCursorVisibilityOnLayoutChange, { passive: true });
  window.addEventListener("resize", syncCursorVisibilityOnLayoutChange);

  const onVisibility = () => {
    if (document.hidden) hideCursor();
  };
  document.addEventListener("visibilitychange", onVisibility);

  let quoteObserver: IntersectionObserver | null = null;
  if (quoteSection) {
    quoteObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) hideCursor();
        });
      },
      { threshold: 0.01 },
    );
    quoteObserver.observe(quoteSection);
  }

  const onQuoteTextClick = (e: Event) => {
    e.preventDefault();
    document.body.classList.add("v2-page-transitioning");
    window.setTimeout(() => onAboutNavigate(), 400);
  };

  if (quoteText) {
    quoteText.addEventListener("click", onQuoteTextClick);
  }

  return () => {
    document.removeEventListener("pointermove", onPointerMove);
    targets.forEach((target) => {
      target.removeEventListener("pointerenter", onPointerEnterTarget as EventListener);
      target.removeEventListener("pointermove", onPointerMoveTarget as EventListener);
      target.removeEventListener("pointerleave", hideCursor);
    });
    document.removeEventListener("mouseleave", onDocMouseLeave);
    document.removeEventListener("pointercancel", onPointerCancel);
    window.removeEventListener("blur", onBlur);
    window.removeEventListener("scroll", syncCursorVisibilityOnLayoutChange);
    window.removeEventListener("resize", syncCursorVisibilityOnLayoutChange);
    document.removeEventListener("visibilitychange", onVisibility);
    quoteObserver?.disconnect();
    if (quoteText) quoteText.removeEventListener("click", onQuoteTextClick);
    if (rafId) cancelAnimationFrame(rafId);
    hideCursor();
  };
}
