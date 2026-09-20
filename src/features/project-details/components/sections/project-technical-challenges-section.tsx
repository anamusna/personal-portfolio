import React from "react";
import { useTranslation } from "react-i18next";
import { SURFACE_CARD_ICON } from "tailwind/styles/surfaceCard";
import { TEXT_CARD_TITLE, TEXT_DETAIL_SECTION_TITLE } from "tailwind/styles/textTokens";
import { DetailList } from "../detail-list";
import { ProjectSectionProps } from "../../types/project-section-props";

const ChallengeList: React.FC<{ title: string; items: string[] }> = ({
  title,
  items,
}) => (
  <div>
    <h3 className={`${TEXT_CARD_TITLE} mb-3 sm:mb-4`}>{title}</h3>
    <DetailList
      items={items.map((challenge) => ({ key: challenge, content: challenge }))}
    />
  </div>
);

export const ProjectTechnicalChallengesSection: React.FC<ProjectSectionProps> = ({
  project,
}) => {
  const { t } = useTranslation();

  if (
    !project.technicalChallengesOvercome?.length &&
    !project.technicalChallenges?.length
  ) {
    return null;
  }

  return (
    <section className="relative">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className={`w-7 h-7 sm:w-8 sm:h-8 ${SURFACE_CARD_ICON}`}>
          <svg
            className="w-4 h-4 text-rose-600 dark:text-rose-400"
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
        <h2 className={TEXT_DETAIL_SECTION_TITLE}>
          {t("features.projectDetails.sections.technicalChallenges.title")}
        </h2>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {project.technicalChallengesOvercome && (
          <ChallengeList
            title={t(
              "features.projectDetails.sections.technicalChallenges.overcameTitle",
            )}
            items={project.technicalChallengesOvercome}
          />
        )}

        {project.technicalChallenges && (
          <ChallengeList
            title={t(
              "features.projectDetails.sections.technicalChallenges.ongoingTitle",
            )}
            items={project.technicalChallenges}
          />
        )}
      </div>
    </section>
  );
};
