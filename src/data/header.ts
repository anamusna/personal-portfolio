import i18n from "../i18n";

export type HeaderNavLink = {
  labelKey: string;
  label?: string;
  url: string;
  /** Emphasized in the header for hiring funnel */
  highlight?: boolean;
  /** Rendered as the header's primary CTA-style action (e.g. "About Me"); stays visible outside the mobile menu */
  isPrimaryAction?: boolean;
};

export const header = {
  links: {
    home: {
      label: i18n.t("navigation.primary.home"),
      labelKey: "navigation.primary.home",
      url: "",
    },
    career: {
      label: i18n.t("navigation.primary.career"),
      labelKey: "navigation.primary.career",
      url: "career",
    },
    about: {
      label: i18n.t("navigation.primary.about"),
      labelKey: "navigation.primary.about",
      url: "about",
    },
    projects: {
      label: i18n.t("navigation.primary.projects"),
      labelKey: "navigation.primary.projects",
      url: "projects",
    },
    contact: {
      label: i18n.t("navigation.primary.contact"),
      labelKey: "navigation.primary.contact",
      url: "contact",
    },
    testimonials: {
      label: i18n.t("navigation.primary.testimonials"),
      labelKey: "navigation.primary.testimonials",
      url: "testimonials",
    },
    blog: {
      label: i18n.t("navigation.primary.blog"),
      labelKey: "navigation.primary.blog",
      url: "blog",
    },
    faq: {
      label: i18n.t("navigation.primary.faq"),
      labelKey: "navigation.primary.faq",
      url: "faq",
    },
  },
} as const;

/**
 * Primary header navigation — Career leads the hiring funnel, About Me is the
 * header's primary action and always stays visible outside the mobile menu.
 */
export const PRIMARY_HEADER_NAV: HeaderNavLink[] = [
  {
    labelKey: "navigation.primary.career",
    label: i18n.t("navigation.primary.career"),
    url: "career",
  },
  {
    labelKey: "navigation.primary.projects",
    label: i18n.t("navigation.primary.projects"),
    url: "projects",
  },
  {
    labelKey: "navigation.primary.about",
    label: i18n.t("navigation.primary.about"),
    url: "about",
    highlight: true,
    isPrimaryAction: true,
  },
];

export function getHeaderHref(url: string): string {
  return url ? `/${url}` : "/";
}

export function isHeaderNavActive(pathname: string, url: string): boolean {
  const href = getHeaderHref(url);
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
