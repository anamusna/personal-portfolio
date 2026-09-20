import React from "react";
import { useTranslation } from "react-i18next";
import { SURFACE_CARD_ICON } from "tailwind/styles/surfaceCard";
import { TEXT_DETAIL_SECTION_TITLE } from "tailwind/styles/textTokens";
import { DetailList } from "../detail-list";
import { ProjectSectionProps } from "../../types/project-section-props";

export const ProjectTechnicalInsightsSection: React.FC<ProjectSectionProps> = ({
  project,
}) => {
  const { t } = useTranslation();

  return (
    <section className="relative">
    <div className="flex items-center gap-2 mb-3 sm:mb-4">
      <div className={`w-7 h-7 sm:w-8 sm:h-8 ${SURFACE_CARD_ICON}`}>
        <svg
          className="w-4 h-4 text-teal-600 dark:text-teal-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>
      <h2 className={TEXT_DETAIL_SECTION_TITLE}>
        {t("features.projectDetails.sections.technicalInsights.title")}
      </h2>
    </div>

    <DetailList
      items={project.technicalInsights.map((insight, index) => ({
        key: insight.title,
        title: `${index + 1}. ${insight.title}`,
        content: insight.description,
      }))}
    />
    </section>
  );
};
