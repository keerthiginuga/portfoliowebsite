export const HOME_SCROLL_RESTORE_KEY = "v2-restore-home-scroll";

export function saveHomeScrollBeforeWorkNavigation(): void {
  try {
    sessionStorage.setItem(HOME_SCROLL_RESTORE_KEY, String(window.scrollY));
  } catch {
    /* quota / private mode */
  }
}

export function clampDocumentScrollY(y: number): number {
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(Math.max(0, y), max);
}
