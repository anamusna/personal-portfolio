import { projectCardImages } from "data/projects";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { P } from "tailwind/components/elements/Typography";
import { SURFACE_CARD_ICON } from "tailwind/styles/surfaceCard";
import { TEXT_DETAIL_SECTION_TITLE } from "tailwind/styles/textTokens";
import { ProjectSectionProps } from "../../types/project-section-props";
import { PROJECT_IMAGE_FALLBACK } from "../../utils/project-image-fallback";

export const ProjectChallengeSection: React.FC<ProjectSectionProps> = ({
  project,
}) => {
  const { t } = useTranslation();
  const [hasScreenshotError, setHasScreenshotError] = useState(false);

  return (
    <section className="relative">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className={`w-7 h-7 sm:w-8 sm:h-8 ${SURFACE_CARD_ICON}`}>
          <svg
            className="w-4 h-4 text-indigo-600 dark:text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h2 className={`${TEXT_DETAIL_SECTION_TITLE}`}>
          {t("features.projectDetails.sections.challenge.title")}
        </h2>
      </div>

      <div className="surface-card border border-light-border/55 dark:border-dark-border/40 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4">
        <P className="text-sm sm:text-base text-body leading-relaxed">
          {project.problem}
        </P>

        <div className="relative aspect-video overflow-hidden rounded-lg border border-light-border/55 dark:border-dark-border/40">
          <img
            src={
              hasScreenshotError
                ? PROJECT_IMAGE_FALLBACK
                : projectCardImages[project?.profile] || PROJECT_IMAGE_FALLBACK
            }
            alt={t("features.projectDetails.sections.challenge.imageAlt")}
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            onError={() => setHasScreenshotError(true)}
          />
        </div>
      </div>
    </section>
  );
};
