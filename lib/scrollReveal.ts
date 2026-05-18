export function initScrollReveal() {
  if (typeof window === "undefined") return () => {};

  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  els.forEach((el) => el.setAttribute("data-revealed", "false"));

  let observer: IntersectionObserver | null = null;
  try {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => observer!.observe(el));
  } catch {}

  // Force-reveal fallback (CLAUDE.md pattern): never let page stay invisible
  const fallback = window.setTimeout(() => {
    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((el) => el.setAttribute("data-revealed", "true"));
  }, 3500);

  return () => {
    clearTimeout(fallback);
    observer?.disconnect();
  };
}
