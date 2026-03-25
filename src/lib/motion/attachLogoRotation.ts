export function attachLogoRotation(): () => void {
  const logo = document.getElementById("mainLogo");
  if (!logo) return () => {};

  let rafId: number | null = null;

  const onScroll = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      const scrollableDist = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableDist > 0 ? window.scrollY / scrollableDist : 0;
      logo.style.transform = `rotate(${(progress * 360).toFixed(1)}deg)`;
      rafId = null;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  return () => {
    window.removeEventListener("scroll", onScroll);
    if (rafId) cancelAnimationFrame(rafId);
    logo.style.transform = "";
  };
}
