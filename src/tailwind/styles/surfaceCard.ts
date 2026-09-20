/**
 * Elevated card surfaces on warm page background (#f6f2ee).
 * Visual layer is defined in index.css (`.surface-card`).
 */
export const SURFACE_CARD_BASE =
  "surface-card rounded-xl sm:rounded-2xl overflow-hidden";

export const SURFACE_CARD_INTERACTIVE = [
  SURFACE_CARD_BASE,
  "surface-card--interactive",
  "group",
].join(" ");

export const mergeSurfaceCard = (...parts: (string | undefined)[]): string =>
  [SURFACE_CARD_INTERACTIVE, ...parts.filter(Boolean)].join(" ");

/** Sticky tab bars and page subheaders on detail views */
export const SURFACE_CARD_HEADER =
  "surface-card relative z-10 border-b border-light-border/60 dark:border-dark-border/40";

export const SURFACE_CARD_STICKY =
  "sticky top-0 z-20 surface-card border-b border-light-border/60 dark:border-dark-border/40";

export const SURFACE_CARD_PANEL =
  "surface-card relative overflow-hidden transition-all duration-500 border border-light-border/55 dark:border-dark-border/40";

export const SURFACE_CARD_ICON =
  "relative bg-white dark:bg-dark-surface rounded-lg border border-light-border/50 dark:border-dark-border/40 flex items-center justify-center shadow-md";
