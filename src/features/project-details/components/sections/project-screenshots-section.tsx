import React from "react";
import { useTranslation } from "react-i18next";
import { SURFACE_CARD_ICON } from "tailwind/styles/surfaceCard";
import { TEXT_DETAIL_SECTION_TITLE } from "tailwind/styles/textTokens";
import { ProjectSectionProps } from "../../types/project-section-props";

export const ProjectScreenshotsSection: React.FC<ProjectSectionProps> = ({
  project,
}) => {
  const { t } = useTranslation();
  const screenshots = project.visuals?.screenshots ?? [];

  if (!screenshots.length) {
    return null;
  }

  return (
    <section className="relative">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className={`w-7 h-7 sm:w-8 sm:h-8 ${SURFACE_CARD_ICON}`}>
          <svg
            className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className={TEXT_DETAIL_SECTION_TITLE}>
          {t("features.projectDetails.sections.screenshots.title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {screenshots.map((src, index) => (
          <div
            key={src}
            className="relative aspect-video overflow-hidden rounded-lg border border-light-border/55 dark:border-dark-border/40"
          >
            <img
              src={src}
              alt={t("features.projectDetails.sections.screenshots.imageAlt", {
                index: index + 1,
                project: project.title,
              })}
              width={640}
              height={360}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
