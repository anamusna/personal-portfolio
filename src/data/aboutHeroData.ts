import enLocale from "../locales/en.json";
import { createLocalizedResource } from "../utils/localized-resource";

export const ABOUT_HERO_CONFIG = {
  ANIMATION_DURATIONS: {
    DEFAULT: 500,
    LONG: 700,
    PARTICLE_SLOW: 4000,
    PARTICLE_MEDIUM: 5000,
    PARTICLE_FAST: 3000,
  },
  ANIMATION_DELAYS: {
    PARTICLE_1: "0s",
    PARTICLE_2: "1s",
    PARTICLE_3: "2s",
  },
  HEIGHTS: {
    MIN_SECTION: "min-h-[90vh]",
    CTA_BUTTON: "min-h-[64px]",
    CTA_BUTTON_SM: "min-h-[72px]",
    ICON_SM: "w-4 h-4",
    ICON_LG: "w-5 h-5",
  },
  OPACITY_LEVELS: {
    BLUR_BACKGROUND: 0.7,
    HOVER_BACKGROUND: 1,
    PARTICLE_DEFAULT: 0,
    PARTICLE_HOVER: 1,
  },
  SPACING: {
    CONTAINER_PADDING: "pt-12 px-2",
    SECTION_MARGIN: "mb-12",
    GRID_GAP: "gap-8 lg:gap-16",
    CTA_GAP: "gap-4 sm:gap-6",
  },
} as const;

type AboutHeroContent = (typeof enLocale)["content"]["aboutHeroContent"];
const defaultHeroContent: AboutHeroContent = enLocale.content.aboutHeroContent;

export const ABOUT_HERO_CONTENT = createLocalizedResource(
  "content.aboutHeroContent",
  defaultHeroContent,
) as AboutHeroContent;

export const ABOUT_HERO_STYLES = {
  SECTION_BASE: "relative flex items-center pb-12",
  GRADIENT_BACKGROUND:
    "bg-gradient-to-b from-transparent via-gray-50/50 to-gray-50 dark:from-transparent dark:via-gray-900/50 dark:to-gray-900",
  CONTAINER_BASE:
    "container max-w-7xl relative z-10 mx-auto px-4 sm:px-6",
  HEADER_WRAPPER:
    "max-w-4xl mx-auto text-start md:text-center animate-fade-in-down",
  GRID_WRAPPER: "grid lg:grid-cols-[3fr_2fr] items-start container mx-auto",
  TEXT_COLUMN:
    "mb-4 order-1 lg:order-1 container",
  IMAGE_COLUMN:
    "relative order-2 lg:order-2 overflow-hidden lg:sticky lg:top-24 lg:mt-6 w-full flex justify-center lg:justify-end",
} as const;

export type AboutHeroConfig = typeof ABOUT_HERO_CONFIG;
export type AboutHeroStyles = typeof ABOUT_HERO_STYLES;
