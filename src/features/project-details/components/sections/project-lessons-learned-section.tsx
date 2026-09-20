import React from "react";
import { useTranslation } from "react-i18next";
import { SURFACE_CARD_ICON } from "tailwind/styles/surfaceCard";
import { TEXT_DETAIL_SECTION_TITLE } from "tailwind/styles/textTokens";
import { DetailList } from "../detail-list";
import { ProjectSectionProps } from "../../types/project-section-props";

export const ProjectLessonsLearnedSection: React.FC<ProjectSectionProps> = ({
  project,
}) => {
  const { t } = useTranslation();

  if (!project.lessonsLearned?.length) {
    return null;
  }

  return (
    <section className="relative">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className={`w-7 h-7 sm:w-8 sm:h-8 ${SURFACE_CARD_ICON}`}>
          <svg
            className="w-4 h-4 text-cyan-600 dark:text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <h2 className={TEXT_DETAIL_SECTION_TITLE}>
          {t("features.projectDetails.sections.lessons.title")}
        </h2>
      </div>

      <DetailList
        items={project.lessonsLearned.map((lesson, index) => ({
          key: lesson,
          content: (
            <>
              <span className="font-semibold text-heading mr-2">
                {index + 1}.
              </span>
              {lesson}
            </>
          ),
        }))}
      />
    </section>
  );
};
