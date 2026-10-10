import { faArrowRight, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { home } from "./home";

export const HERO_CONFIG = {
  ANIMATION_DURATIONS: {
    DEFAULT: 400,
    LONG: 500,
    STATS: 300,
    CTA: 200,
    QUICK_INFO: 60,
    PARTICLE_SLOW: 4000,
    PARTICLE_MEDIUM: 4000,
    PARTICLE_FAST: 2000,
  },
  ANIMATION_DELAYS: {
    PARTICLE_1: "0s",
    PARTICLE_2: "1s",
    PARTICLE_3: "2s",
    HEADER: 0,
    TERMINAL: 10,
    STATS: 20,
    CTA: 30,
    IMAGE: 15,
    QUICK_INFO: 40,
    STATS_STAGGER: 50,
    CTA_STAGGER: 40,
    QUICK_INFO_STAGGER: 30,
  },
  HEIGHTS: {
    MIN_SECTION: "min-h-[80vh]",
    CTA_BUTTON: "min-h-[64px]",
    CTA_BUTTON_SM: "min-h-[72px]",
    ICON_SM: "w-4 h-4",
    ICON_LG: "w-5 h-5",
    STAT_CARD: "min-h-[140px]",
    QUICK_INFO_CARD: "min-h-[120px]",
  },
  OPACITY_LEVELS: {
    BLUR_BACKGROUND: 0.7,
    HOVER_BACKGROUND: 1,
    PARTICLE_DEFAULT: 0,
    PARTICLE_HOVER: 1,
  },
  SPACING: {
    MAIN_PADDING: "",
    GRID_GAP: "gap-6 md:gap-8",
    STATS_GAP: "gap-6 sm:gap-8",
    CTA_GAP: "gap-4 sm:gap-6",
    QUICK_INFO_GAP: "gap-4 sm:gap-6",
    CONTAINER_PADDING: "py-20 md:py-24 ",
    SECTION_MARGIN: "",
  },
} as const;

export const HERO_CONTENT = {
  CTA_BUTTONS: {
    PRIMARY: {
      href: home.hero.cta.primary.href,
      text: home.hero.cta.primary.text,
      icon: faArrowRight,
      primary: true,
      isPrimary: true,
    },
    SECONDARY: {
      href: home.hero.cta.secondary.href,
      text: home.hero.cta.secondary.text,
      icon: faCalendar,
      primary: false,
      isPrimary: false,
    },
  },
} as const;

export const HERO_STYLES = {
  SECTION_BASE: "relative",
  GRADIENT_BACKGROUND:
    "bg-gradient-to-b from-transparent via-gray-50/50 to-gray-50 dark:from-transparent dark:via-gray-900/50 dark:to-gray-900",
  CONTAINER_BASE: "container relative z-10 mx-auto px-3 sm:px-4 lg:px-6",
  HEADER_WRAPPER:
    "max-w-4xl mx-auto text-start md:text-center animate-fade-in-down",
  GRID_WRAPPER:
    "grid lg:grid-cols-2 items-start justify-between max-w-7xl mx-auto gap-6 md:gap-8 lg:gap-10",
  TEXT_COLUMN: "order-1 w-full max-w-2xl lg:max-w-none",
  IMAGE_COLUMN:
    "relative order-2 w-full flex justify-center lg:justify-end lg:sticky lg:top-24 self-start",
  TERMINAL_WRAPPER: "group relative mb-10 sm:mb-12",
  STATS_WRAPPER: "space-y-8 sm:space-y-10",
  STATS_GRID: "grid grid-cols-1 sm:grid-cols-2",
  CTA_WRAPPER: "flex flex-col sm:flex-row",
  QUICK_INFO_WRAPPER: "mt-16 sm:mt-20 lg:mt-24",
  QUICK_INFO_GRID: "grid grid-cols-2 md:grid-cols-4 mx-auto max-w-4xl",
} as const;

/** Page-level layout — matches Home sections (Services, Section, CareerHighlights) */
export const LAYOUT_STYLES = {
  PAGE_ROOT: "relative overflow-hidden md:overflow-visible",
  PAGE_ROOT_MIN_HEIGHT:
    "relative min-h-screen overflow-hidden md:overflow-visible",
  CONTENT_CONTAINER:
    "container max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8",
  CONTENT_SECTION: "py-4 sm:py-6 lg:py-8",
  /** Detail pages: section rhythm (tighter than legacy xl padding stacks) */
  SECTION_STACK: "space-y-4 sm:space-y-5 lg:space-y-6",
  SECTION_HEADER: "flex items-center gap-2 mb-2 sm:mb-3",
  SECTION_TITLE:
    "text-lg sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent",
  SECTION_ICON: "relative w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0",
  CARD_PADDING: "p-3 sm:p-4",
  CARD_GAP: "gap-2 sm:gap-3",
  SEPARATOR: "mt-3 sm:mt-4",
  DETAIL_PANEL:
    "surface-card surface-card--interactive relative overflow-hidden transition-all duration-500 border border-light-border/55 dark:border-dark-border/40",
  DETAIL_HEADER:
    "surface-card relative z-10 border-b border-light-border/60 dark:border-dark-border/40",
} as const;

export type HeroConfig = typeof HERO_CONFIG;
export type HeroContent = typeof HERO_CONTENT;
export type HeroStyles = typeof HERO_STYLES;
