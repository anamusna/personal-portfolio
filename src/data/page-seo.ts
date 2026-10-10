import enLocale from "../locales/en.json";
import { IMPRESSUM_PUBLISHED } from "./impressum";
import { DEFAULT_PAGE_SEO, SITE_URL } from "./site-config";

export type PageSeoConfig = {
  title: string;
  description: string;
  titleKey?: string;
  descriptionKey?: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

const seoPages = enLocale.seo.pages;

export const PAGE_SEO: Record<string, PageSeoConfig> = {
  home: {
    title: seoPages.home.title,
    description: seoPages.home.description,
    titleKey: "seo.pages.home.title",
    descriptionKey: "seo.pages.home.description",
    path: "/",
  },
  career: {
    title: seoPages.career.title,
    description: seoPages.career.description,
    titleKey: "seo.pages.career.title",
    descriptionKey: "seo.pages.career.description",
    path: "/career",
  },
  projects: {
    title: seoPages.projects.title,
    description: seoPages.projects.description,
    titleKey: "seo.pages.projects.title",
    descriptionKey: "seo.pages.projects.description",
    path: "/projects",
  },
  about: {
    title: seoPages.about.title,
    description: seoPages.about.description,
    titleKey: "seo.pages.about.title",
    descriptionKey: "seo.pages.about.description",
    path: "/about",
  },
  blog: {
    title: seoPages.blog.title,
    description: seoPages.blog.description,
    titleKey: "seo.pages.blog.title",
    descriptionKey: "seo.pages.blog.description",
    path: "/blog",
  },
  contact: {
    title: seoPages.contact.title,
    description: seoPages.contact.description,
    titleKey: "seo.pages.contact.title",
    descriptionKey: "seo.pages.contact.description",
    path: "/contact",
  },
  testimonials: {
    title: seoPages.testimonials.title,
    description: seoPages.testimonials.description,
    titleKey: "seo.pages.testimonials.title",
    descriptionKey: "seo.pages.testimonials.description",
    path: "/testimonials",
  },
  faq: {
    title: seoPages.faq.title,
    description: seoPages.faq.description,
    titleKey: "seo.pages.faq.title",
    descriptionKey: "seo.pages.faq.description",
    path: "/faq",
  },
  privacy: {
    title: seoPages.privacy.title,
    description: seoPages.privacy.description,
    titleKey: "seo.pages.privacy.title",
    descriptionKey: "seo.pages.privacy.description",
    path: "/privacy",
  },
  impressum: {
    title: seoPages.impressum.title,
    description: seoPages.impressum.description,
    titleKey: "seo.pages.impressum.title",
    descriptionKey: "seo.pages.impressum.description",
    path: "/impressum",
    // Out of the sitemap until the page exists (see data/impressum.ts).
    noindex: !IMPRESSUM_PUBLISHED,
  },
  story: {
    title: seoPages.story.title,
    description: seoPages.story.description,
    titleKey: "seo.pages.story.title",
    descriptionKey: "seo.pages.story.description",
    path: "/story",
    noindex: true,
  },
  prayer: {
    title: "My Prayer",
    description:
      "A personal reflection kept intentionally quiet and private-feeling.",
    path: "/prayer",
    noindex: true,
  },
  notFound: {
    title: seoPages.notFound.title,
    description: seoPages.notFound.description,
    titleKey: "seo.pages.notFound.title",
    descriptionKey: "seo.pages.notFound.description",
    path: "/404",
    noindex: true,
  },
};

export function resolveCanonicalUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${normalized}`;
}

export function mergePageSeo(
  config: Partial<PageSeoConfig> &
    Pick<PageSeoConfig, "title" | "description" | "path">,
): PageSeoConfig {
  return {
    ...DEFAULT_PAGE_SEO,
    ...config,
    image: config.image ?? DEFAULT_PAGE_SEO.image,
    type: config.type ?? "website",
  };
}
