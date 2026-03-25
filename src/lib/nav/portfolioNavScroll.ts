/**
 * Port of portfolio-v2/js/nav.js — scroll collapse, contrast sampling, menu helpers.
 * Mutates `nav` classList to match existing portfolio-v2.css.
 */

const NAV_SCROLL_THRESHOLD = 20;
const NAV_COLLAPSE_THRESHOLD = 100;
const NAV_COLLAPSE_DIRECTION_EPSILON = 4;
const NAV_CONTRAST_LIGHT_ENTER_THRESHOLD = 0.58;
const NAV_CONTRAST_LIGHT_EXIT_THRESHOLD = 0.5;
const NAV_CONTRAST_ALPHA_THRESHOLD = 0.08;
const NAV_CONTRAST_SWITCH_DEBOUNCE_MS = 100;
const NAV_CONTRAST_IDLE_UPDATE_MS = 120;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function parseColor(colorString: string | null): { r: number; g: number; b: number; a: number } | null {
  if (!colorString || colorString === "transparent") return null;
  const match = colorString.match(/rgba?\(([^)]+)\)/i);
  if (!match) return null;
  const parts = match[1].split(",").map((part) => Number(part.trim()));
  if (parts.length < 3 || parts.some(Number.isNaN)) return null;
  return {
    r: clamp(parts[0], 0, 255),
    g: clamp(parts[1], 0, 255),
    b: clamp(parts[2], 0, 255),
    a: clamp(parts[3] == null ? 1 : parts[3], 0, 1),
  };
}

function channelToLinear(value: number): number {
  const normalized = value / 255;
  return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(rgb: { r: number; g: number; b: number }): number {
  const r = channelToLinear(rgb.r);
  const g = channelToLinear(rgb.g);
  const b = channelToLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function resolveBackgroundLuminance(element: Element): number {
  let node: Element | null = element;
  while (node && node !== document.documentElement) {
    const style = window.getComputedStyle(node);
    const parsed = parseColor(style.backgroundColor);
    if (parsed && parsed.a > NAV_CONTRAST_ALPHA_THRESHOLD) {
      return luminance(parsed);
    }
    node = node.parentElement;
  }
  return 0;
}

function getSampleLuminance(anchor: { x: number; y: number }, blockers: Element[]): number | null {
  const x = clamp(anchor.x, 1, Math.max(1, window.innerWidth - 1));
  const y = clamp(anchor.y, 1, Math.max(1, window.innerHeight - 1));
  const stack = document.elementsFromPoint(x, y);
  const beneath = stack.find((el) => !blockers.some((blocker) => blocker === el || blocker.contains(el)));
  if (!beneath) return null;
  return resolveBackgroundLuminance(beneath);
}

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

const navContrastState = {
  initialized: false,
  useDarkForeground: false,
  pendingForeground: null as boolean | null,
  pendingSinceMs: 0,
};

/** Call on client-side navigations (static site had full reload per page). */
export function resetNavContrastState(): void {
  navContrastState.initialized = false;
  navContrastState.useDarkForeground = false;
  navContrastState.pendingForeground = null;
  navContrastState.pendingSinceMs = 0;
}

let navContrastRaf: number | null = null;
let navContrastIdleTimer: ReturnType<typeof setTimeout> | null = null;

function setUnifiedContrast(logo: Element | null, useDarkForeground: boolean): void {
  if (!logo) return;
  logo.classList.toggle("v2-contrast-dark", useDarkForeground);
}

function resolveContrastDecision(rawLuminance: number): boolean {
  if (!navContrastState.initialized) {
    navContrastState.initialized = true;
    navContrastState.useDarkForeground = rawLuminance >= NAV_CONTRAST_LIGHT_ENTER_THRESHOLD;
    navContrastState.pendingForeground = null;
    navContrastState.pendingSinceMs = 0;
    return navContrastState.useDarkForeground;
  }

  const desired = navContrastState.useDarkForeground
    ? rawLuminance >= NAV_CONTRAST_LIGHT_EXIT_THRESHOLD
    : rawLuminance >= NAV_CONTRAST_LIGHT_ENTER_THRESHOLD;

  if (desired === navContrastState.useDarkForeground) {
    navContrastState.pendingForeground = null;
    navContrastState.pendingSinceMs = 0;
    return navContrastState.useDarkForeground;
  }

  const now = performance.now();
  if (navContrastState.pendingForeground !== desired) {
    navContrastState.pendingForeground = desired;
    navContrastState.pendingSinceMs = now;
    return navContrastState.useDarkForeground;
  }

  if (now - navContrastState.pendingSinceMs < NAV_CONTRAST_SWITCH_DEBOUNCE_MS) {
    return navContrastState.useDarkForeground;
  }

  navContrastState.useDarkForeground = desired;
  navContrastState.pendingForeground = null;
  navContrastState.pendingSinceMs = 0;
  return navContrastState.useDarkForeground;
}

function updateNavContrastNow(nav: HTMLElement): void {
  if (!document.body) return;
  const logo = document.querySelector(".v2-logo");
  const blockers: Element[] = [nav];
  if (logo) blockers.push(logo);

  const navRect = nav.getBoundingClientRect();
  const logoRect = logo?.getBoundingClientRect() ?? null;

  const navAnchor = { x: navRect.left + navRect.width * 0.5, y: navRect.top + navRect.height * 0.5 };
  const navLeftAnchor = { x: navRect.left + navRect.width * 0.2, y: navRect.top + navRect.height * 0.5 };
  const navRightAnchor = { x: navRect.left + navRect.width * 0.8, y: navRect.top + navRect.height * 0.5 };
  const logoAnchor = logoRect
    ? { x: logoRect.left + logoRect.width * 0.5, y: logoRect.top + logoRect.height * 0.5 }
    : navAnchor;
  const bridgeAnchor = {
    x: (logoAnchor.x + navAnchor.x) * 0.5,
    y: (logoAnchor.y + navAnchor.y) * 0.5,
  };

  const luminanceSamples = [
    getSampleLuminance(logoAnchor, blockers),
    getSampleLuminance(navAnchor, blockers),
    getSampleLuminance(navLeftAnchor, blockers),
    getSampleLuminance(navRightAnchor, blockers),
    getSampleLuminance(bridgeAnchor, blockers),
  ].filter((value): value is number => typeof value === "number" && !Number.isNaN(value));

  const rawLuminance = median(luminanceSamples);
  const useDarkForeground = resolveContrastDecision(rawLuminance);
  setUnifiedContrast(logo, useDarkForeground);
}

export function scheduleNavContrastUpdate(nav: HTMLElement): void {
  if (navContrastIdleTimer) clearTimeout(navContrastIdleTimer);
  navContrastIdleTimer = setTimeout(() => {
    updateNavContrastNow(nav);
  }, NAV_CONTRAST_IDLE_UPDATE_MS);
  if (navContrastRaf != null) return;
  navContrastRaf = requestAnimationFrame(() => {
    updateNavContrastNow(nav);
    navContrastRaf = null;
  });
}

function getNavScrollPosition(nav: HTMLElement): number {
  const stored = Number(nav.dataset.scrollY || 0);
  if (!Number.isNaN(stored) && stored > 0) return stored;
  return window.scrollY || 0;
}

export function syncHamburgerAria(nav: HTMLElement): void {
  const button = nav.querySelector(".v2-hamburger");
  if (!button) return;
  button.setAttribute("aria-expanded", nav.classList.contains("nav-expanded") ? "true" : "false");
}

function applyNavState(nav: HTMLElement, currentScrollY: number, lastScrollY: number): number {
  nav.dataset.scrollY = String(Math.max(0, currentScrollY));
  scheduleNavContrastUpdate(nav);
  const deltaY = currentScrollY - lastScrollY;

  if (currentScrollY > NAV_SCROLL_THRESHOLD) {
    nav.classList.add("nav-scrolled");
  } else {
    nav.classList.remove("nav-scrolled");
  }

  if (nav.classList.contains("nav-expanded")) {
    if (Math.abs(deltaY) >= NAV_COLLAPSE_DIRECTION_EPSILON) {
      nav.classList.remove("nav-expanded");
      if (currentScrollY > NAV_COLLAPSE_THRESHOLD) {
        nav.classList.add("nav-collapsed");
      } else {
        nav.classList.remove("nav-collapsed");
      }
    }
    syncHamburgerAria(nav);
    return currentScrollY;
  }

  if (Math.abs(deltaY) < NAV_COLLAPSE_DIRECTION_EPSILON) {
    syncHamburgerAria(nav);
    return currentScrollY;
  }

  if (deltaY > 0 && currentScrollY > NAV_COLLAPSE_THRESHOLD) {
    nav.classList.add("nav-collapsed");
  } else {
    nav.classList.remove("nav-collapsed");
  }

  syncHamburgerAria(nav);
  return currentScrollY;
}

export type MenuBinding = {
  closeExpandedMenu: () => void;
  openExpandedMenu: () => void;
  cleanup: () => void;
};

export function bindNavMenu(nav: HTMLElement): MenuBinding {
  const hamburger = nav.querySelector(".v2-hamburger");
  if (!hamburger) {
    const noop = () => {};
    return { closeExpandedMenu: noop, openExpandedMenu: noop, cleanup: noop };
  }

  syncHamburgerAria(nav);

  const closeExpandedMenu = () => {
    nav.classList.remove("nav-expanded");
    const currentScrollY = getNavScrollPosition(nav);
    if (currentScrollY > NAV_COLLAPSE_THRESHOLD) {
      nav.classList.add("nav-collapsed");
    } else {
      nav.classList.remove("nav-collapsed");
    }
    syncHamburgerAria(nav);
  };

  const openExpandedMenu = () => {
    nav.classList.add("nav-expanded");
    nav.classList.remove("nav-collapsed");
    syncHamburgerAria(nav);
  };

  const onHamburgerClick: EventListener = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (nav.classList.contains("nav-expanded")) {
      closeExpandedMenu();
    } else {
      openExpandedMenu();
    }
  };

  const onDocumentClick: EventListener = (event) => {
    if (!nav.classList.contains("nav-expanded")) return;
    if (nav.contains(event.target as Node)) return;
    closeExpandedMenu();
  };

  const onKeyDown: EventListener = (event) => {
    if (!(event instanceof KeyboardEvent) || event.key !== "Escape") return;
    if (!nav.classList.contains("nav-expanded")) return;
    closeExpandedMenu();
  };

  hamburger.addEventListener("click", onHamburgerClick);
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onKeyDown);

  const linkEls = nav.querySelectorAll(".v2-nav-link, .v2-nav-resume");
  const onLinkClick: EventListener = () => {
    if (!nav.classList.contains("nav-expanded")) return;
    closeExpandedMenu();
  };
  linkEls.forEach((el) => el.addEventListener("click", onLinkClick));

  return {
    closeExpandedMenu,
    openExpandedMenu,
    cleanup: () => {
      hamburger.removeEventListener("click", onHamburgerClick);
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onKeyDown);
      linkEls.forEach((el) => el.removeEventListener("click", onLinkClick));
    },
  };
}

/**
 * Case study pages (static `project-script.js`): logo rotation vs scroll, contrast sampling,
 * nav stays hamburger-collapsed unless opened; scroll closes expanded menu.
 */
export function initCaseStudyNavScroll(
  nav: HTMLElement,
  closeExpandedMenu: () => void,
): () => void {
  nav.dataset.scrollY = String(window.scrollY);
  nav.classList.add("nav-collapsed");
  nav.classList.remove("nav-expanded");
  syncHamburgerAria(nav);

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateLogoRotation = () => {
    const logo = document.getElementById("mainLogo");
    if (!logo) return;
    const scrollY = window.scrollY;
    const scrollableDist = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableDist > 0 ? scrollY / scrollableDist : 0;
    logo.style.transform = `rotate(${(progress * 360).toFixed(1)}deg)`;
  };

  const tick = () => {
    const y = window.scrollY;
    const deltaY = y - lastScrollY;

    nav.dataset.scrollY = String(Math.max(0, y));

    if (y > NAV_SCROLL_THRESHOLD) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }

    scheduleNavContrastUpdate(nav);

    if (nav.classList.contains("nav-expanded")) {
      if (Math.abs(deltaY) >= NAV_COLLAPSE_DIRECTION_EPSILON) {
        closeExpandedMenu();
        nav.classList.add("nav-collapsed");
      }
    } else {
      nav.classList.add("nav-collapsed");
    }

    updateLogoRotation();
    syncHamburgerAria(nav);

    lastScrollY = y;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(tick);
    }
  };

  const onResize = () => {
    scheduleNavContrastUpdate(nav);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  tick();
  scheduleNavContrastUpdate(nav);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    const logo = document.getElementById("mainLogo");
    if (logo) logo.style.transform = "";
  };
}

export function initNavScrollListeners(nav: HTMLElement): () => void {
  let lastScrollY = window.scrollY;
  let ticking = false;

  const update = () => {
    lastScrollY = applyNavState(nav, window.scrollY, lastScrollY);
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  };

  const onResize = () => {
    scheduleNavContrastUpdate(nav);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  update();
  scheduleNavContrastUpdate(nav);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
  };
}

/** For future Lenis / custom scroll drivers (works page). */
export function updateNavOnScroll(nav: HTMLElement, scrollY: number, lastScrollY: number): number {
  return applyNavState(nav, scrollY, lastScrollY);
}
