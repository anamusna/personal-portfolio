import i18n from "../i18n";

export type CaseStudyLinkSource = {
  id: string;
  hasDetailLink?: boolean;
  caseStudyHref?: string;
  caseStudyLinkLabel?: string;
};

export type CaseStudyLink = {
  href: string;
  label: string;
};

export function getCaseStudyLink(
  source: CaseStudyLinkSource,
): CaseStudyLink | null {
  if (source.hasDetailLink) {
    return {
      href: `/projects/${source.id}`,
      label: i18n.t("common.actions.viewCaseStudy"),
    };
  }

  if (source.caseStudyHref) {
    return {
      href: source.caseStudyHref,
      label: source.caseStudyLinkLabel ?? i18n.t("common.actions.viewOnCareerPage"),
    };
  }

  return null;
}
