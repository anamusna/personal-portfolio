/**
 * Shared typography tokens for body copy, headings, and meta text.
 * Prefer these over ad-hoc text-sm / text-lg / text-gray-* combinations.
 */

/** Primary readable copy */
export const TEXT_BODY = "text-sm sm:text-base text-body leading-relaxed";

export const TEXT_BODY_MEDIUM = `${TEXT_BODY} font-medium`;

/** Secondary / meta copy */
export const TEXT_MUTED = "text-sm text-muted leading-relaxed";

/** Hero subtitle (page intros) */
export const TEXT_HERO_SUBTITLE =
  "text-base sm:text-lg lg:text-xl text-body leading-relaxed font-medium";

/** Page & section titles */
export const TEXT_HERO_TITLE =
  "text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]";

export const TEXT_SECTION_TITLE =
  "text-2xl sm:text-3xl md:text-4xl font-black leading-tight";

/** In-section card / block titles */
export const TEXT_CARD_TITLE =
  "text-base sm:text-lg font-bold text-heading";

export const TEXT_DETAIL_SECTION_TITLE =
  "text-lg sm:text-xl lg:text-2xl font-black text-heading leading-tight";

/** SectionHeader eyebrow & caption */
export const TEXT_SECTION_EYEBROW =
  "text-sm sm:text-base font-semibold text-orange-800/85 dark:text-orange-300/90";

export const TEXT_SECTION_CAPTION =
  "text-xs sm:text-sm text-muted";
