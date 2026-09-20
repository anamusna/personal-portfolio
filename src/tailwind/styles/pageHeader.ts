import { CHROME_CHIP, CHROME_SHIMMER } from "./chromeBar";
import {
  TEXT_BODY_MEDIUM,
  TEXT_HERO_SUBTITLE,
  TEXT_HERO_TITLE,
  TEXT_SECTION_CAPTION,
  TEXT_SECTION_EYEBROW,
  TEXT_SECTION_TITLE,
} from "./textTokens";

/** Shared title treatment — solid heading only */
export const PAGE_HEADER_HIGHLIGHT = "font-semibold text-heading";

export const PAGE_HEADER_SUBTITLE = TEXT_BODY_MEDIUM;

export const PAGE_HEADER_HERO_SUBTITLE = TEXT_HERO_SUBTITLE;

export const PAGE_HEADER_HERO_TITLE = TEXT_HERO_TITLE;

export const PAGE_HEADER_SECTION_TITLE = TEXT_SECTION_TITLE;

export const PAGE_HEADER_SECTION_EYEBROW = TEXT_SECTION_EYEBROW;

export const PAGE_HEADER_SECTION_CAPTION = TEXT_SECTION_CAPTION;

export const PAGE_HEADER_BADGE = [
  "inline-flex items-center gap-2",
  "text-xs sm:text-sm font-semibold tracking-wider uppercase",
  "text-orange-700 dark:text-orange-400",
].join(" ");

/** Greeting pill (HeroHeader) — badge-sized chip, width follows content */
export const PAGE_HEADER_GREETING = [
  "inline-flex items-center gap-2 sm:gap-2.5 w-fit max-w-full",
  "whitespace-normal text-left",
  "text-orange-700 dark:text-orange-400 font-semibold tracking-wider uppercase",
  "text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-2.5",
  CHROME_CHIP,
  "rounded-full shadow-sm",
  "transition-shadow duration-300",
  "cursor-default select-none",
].join(" ");

export const PAGE_HEADER_ACCENT_LINE = CHROME_SHIMMER;

/** Hero on dark image overlay (e.g. ServiceDetail banner) */
export const PAGE_HEADER_ON_IMAGE_GREETING = [
  "inline-flex items-center gap-2",
  "text-white/95 font-semibold tracking-wider uppercase text-xs sm:text-sm",
  "backdrop-blur-xl bg-white/12 border border-white/25 rounded-full",
  "px-3 sm:px-4 py-1.5 sm:py-2 shadow-md",
].join(" ");

export const PAGE_HEADER_ON_IMAGE_TITLE =
  "text-white text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight";

export const PAGE_HEADER_ON_IMAGE_SUBTITLE =
  "text-white/90 leading-relaxed font-medium text-sm sm:text-base";
