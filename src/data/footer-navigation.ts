import i18n from "../i18n";
import { IMPRESSUM_PUBLISHED } from "./impressum";

export type FooterNavLink = {
  labelKey?: string;
  label?: string;
  href: string;
};

/** Site-wide footer links — Career first for hiring funnel. */
export const FOOTER_NAV_LINKS: FooterNavLink[] = [
  {
    labelKey: "navigation.footer.career",
    label: i18n.t("navigation.footer.career"),
    href: "/career",
  },
  {
    labelKey: "navigation.footer.projects",
    label: i18n.t("navigation.footer.projects"),
    href: "/projects",
  },
  {
    labelKey: "navigation.footer.about",
    label: i18n.t("navigation.footer.about"),
    href: "/about",
  },
  {
    labelKey: "navigation.footer.testimonials",
    label: i18n.t("navigation.footer.testimonials"),
    href: "/testimonials",
  },
  {
    labelKey: "navigation.footer.contact",
    label: i18n.t("navigation.footer.contact"),
    href: "/contact",
  },
  {
    labelKey: "navigation.footer.privacy",
    label: i18n.t("navigation.footer.privacy"),
    href: "/privacy",
  },
  // Legal notice (§ 5 DDG): reachable from every page, labelled
  // "Impressum", once it is complete (see data/impressum.ts).
  ...(IMPRESSUM_PUBLISHED
    ? [
        {
          labelKey: "navigation.footer.impressum",
          label: i18n.t("navigation.footer.impressum"),
          href: "/impressum",
        },
      ]
    : []),
];
