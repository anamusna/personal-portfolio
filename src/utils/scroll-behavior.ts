/**
 * "smooth" unless the visitor asked the OS for reduced motion. CSS
 * `scroll-behavior` does not apply to scrolls started from JavaScript, so
 * every programmatic scroll has to ask.
 */
export const preferredScrollBehavior = (): ScrollBehavior =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
