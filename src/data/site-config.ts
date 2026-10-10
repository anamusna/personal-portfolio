import enLocale from "../locales/en.json";

export const SITE_URL = "https://ansumana-darboe.netlify.app";

export const SITE_NAME = "Ansumana Darboe";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/ansu.jpg`;

export const DEFAULT_OG_IMAGE_ALT = "Ansumana Darboe, Senior Software Engineer";

/** Absolute URL for a bundled asset, for Open Graph tags. */
export const absoluteAssetUrl = (src: string) => new URL(src, SITE_URL).href;

export const DEFAULT_PAGE_SEO = {
  title: enLocale.seo.pages.home.title,
  description: enLocale.seo.pages.home.description,
  image: DEFAULT_OG_IMAGE,
  type: "website" as const,
};
