import { architectureDiagrams } from "data/architecture-diagrams";
import React from "react";
import { useTranslation } from "react-i18next";
import { SURFACE_CARD_ICON, SURFACE_CARD_PANEL } from "tailwind/styles/surfaceCard";
import {
  TEXT_BODY,
  TEXT_CARD_TITLE,
  TEXT_DETAIL_SECTION_TITLE,
} from "tailwind/styles/textTokens";
import { ProjectSectionProps } from "../../types/project-section-props";

const KNOWN_DIAGRAMS = ["state-boundary"] as const;
type KnownDiagramId = (typeof KNOWN_DIAGRAMS)[number];

export const ProjectArchitectureDiagramSection: React.FC<
  ProjectSectionProps
> = ({ project }) => {
  const { t } = useTranslation();
  const diagramIds = (project.visuals?.diagrams ?? []).filter(
    (id): id is KnownDiagramId =>
      KNOWN_DIAGRAMS.includes(id as KnownDiagramId),
  );

  if (!diagramIds.length) {
    return null;
  }

  const diagram = architectureDiagrams.stateBoundary;

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
              d="M9 3v18M3 9h18M3 15h18"
            />
          </svg>
        </div>
        <h2 className={TEXT_DETAIL_SECTION_TITLE}>
          {t("features.projectDetails.sections.architectureDiagram.title")}
        </h2>
      </div>

      <div className={`${SURFACE_CARD_PANEL} p-4 sm:p-6`}>
        <h3 className={`${TEXT_CARD_TITLE} mb-2`}>{diagram.title}</h3>
        <p className={`${TEXT_BODY} mb-4 sm:mb-5`}>{diagram.intro}</p>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4 items-stretch">
          <div className="rounded-lg border border-light-border/55 dark:border-dark-border/40 p-3 sm:p-4">
            <p className="text-sm font-semibold text-heading mb-1.5">
              {diagram.serverState.label}
            </p>
            <p className={`${TEXT_BODY} text-sm`}>
              {diagram.serverState.body}
            </p>
          </div>

          <div
            className="flex sm:flex-col items-center justify-center text-light-text/40 dark:text-dark-text/40"
            aria-hidden="true"
          >
            <span className="text-lg font-semibold">+</span>
          </div>

          <div className="rounded-lg border border-light-border/55 dark:border-dark-border/40 p-3 sm:p-4">
            <p className="text-sm font-semibold text-heading mb-1.5">
              {diagram.uiState.label}
            </p>
            <p className={`${TEXT_BODY} text-sm`}>{diagram.uiState.body}</p>
          </div>
        </div>

        <p className={`${TEXT_BODY} mt-4 sm:mt-5 text-sm`}>
          {diagram.closing}
        </p>
      </div>
    </section>
  );
};
