import React from "react";
import { useTranslation } from "react-i18next";
import { P } from "tailwind/components/elements/Typography";
import {
  SURFACE_CARD_BASE,
  SURFACE_CARD_ICON,
  SURFACE_CARD_INTERACTIVE,
} from "tailwind/styles/surfaceCard";
import { TEXT_DETAIL_SECTION_TITLE } from "tailwind/styles/textTokens";
import { Project } from "types/project";

type ProjectDetailsSidebarProps = {
  project: Project;
};

const getWebsiteUrl = (websiteUrl?: string): URL | null => {
  if (!websiteUrl) {
    return null;
  }

  try {
    return new URL(websiteUrl);
  } catch {
    return null;
  }
};

export const ProjectDetailsSidebar: React.FC<ProjectDetailsSidebarProps> = ({
  project,
}) => {
  const { t } = useTranslation();
  const websiteUrl = getWebsiteUrl(project.websiteUrl);

  return (
    <div className="sticky top-20 space-y-3 sm:space-y-4">
    {websiteUrl && (
      <div
        className={`${SURFACE_CARD_INTERACTIVE} p-3 sm:p-4 border border-light-border/55 dark:border-dark-border/40 rounded-xl`}
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <div className={`w-7 h-7 sm:w-8 sm:h-8 ${SURFACE_CARD_ICON}`}>
            <svg
              className="w-4 h-4 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
          <h2 className={`${TEXT_DETAIL_SECTION_TITLE} text-base sm:text-lg`}>
            {t("features.projectDetails.sidebar.liveWebsite")}
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 surface-card rounded-xl border border-light-border/55 dark:border-dark-border/40">
            <P className="text-sm text-muted font-mono break-all">
              {websiteUrl.hostname}
            </P>
          </div>

          <a
            href={websiteUrl.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 min-h-[44px] px-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold text-sm sm:text-base transition-colors"
          >
            {t("features.projectDetails.sidebar.visitLiveSite")}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          <P className="text-sm text-muted text-center italic">
            {t("features.projectDetails.sidebar.opensInNewTab")}
          </P>
        </div>
      </div>
    )}

    <div
      className={`${SURFACE_CARD_BASE} p-5 sm:p-6 border border-light-border/55 dark:border-dark-border/40 rounded-xl`}
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 ${SURFACE_CARD_ICON}`}>
          <svg
            className="w-5 h-5 text-primary-light dark:text-primary-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
        </div>
        <h2 className={`${TEXT_DETAIL_SECTION_TITLE} text-lg md:text-xl`}>
          {t("features.projectDetails.sidebar.keyMetrics")}
        </h2>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="p-4 surface-card rounded-xl border border-light-border/55 dark:border-dark-border/40 text-center">
          <p className="text-3xl md:text-4xl font-bold text-heading mb-2">
            {project.metrics?.primary || t("features.projectDetails.sidebar.na")}
          </p>
          <P className="text-sm text-muted font-medium">
            {t("features.projectDetails.sidebar.primaryImpact")}
          </P>
        </div>

        <div className="p-4 surface-card rounded-xl border border-light-border/55 dark:border-dark-border/40 text-center">
          <p className="text-3xl sm:text-4xl font-bold text-heading mb-2">
            {project.metrics?.secondary || t("features.projectDetails.sidebar.na")}
          </p>
          <P className="text-sm text-muted font-medium">
            {t("features.projectDetails.sidebar.secondaryImpact")}
          </P>
        </div>
      </div>
    </div>

    <div
      className={`${SURFACE_CARD_BASE} p-5 sm:p-6 border border-light-border/55 dark:border-dark-border/40 rounded-xl`}
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 ${SURFACE_CARD_ICON}`}>
          <svg
            className="w-5 h-5 text-royal-primary dark:text-royal-darker"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </div>
        <h2 className={`${TEXT_DETAIL_SECTION_TITLE} text-lg sm:text-xl`}>
          {t("features.projectDetails.sidebar.techStack")}
        </h2>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center min-h-[44px] px-3 sm:px-4 py-2 surface-card rounded-lg text-sm sm:text-base font-medium border border-light-border/55 dark:border-dark-border/40 text-body"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
    </div>
  );
};
