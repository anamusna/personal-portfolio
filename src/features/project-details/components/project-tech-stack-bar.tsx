import { LAYOUT_STYLES } from "data/heroData";
import React from "react";
import { useTranslation } from "react-i18next";
import { SURFACE_CARD_ICON, SURFACE_CARD_STICKY } from "tailwind/styles/surfaceCard";
import { Project } from "types/project";

type ProjectTechStackBarProps = {
  project: Project;
};

export const ProjectTechStackBar: React.FC<ProjectTechStackBarProps> = ({
  project,
}) => {
  const { t } = useTranslation();

  return (
    <div className={SURFACE_CARD_STICKY}>
    <div className={`${LAYOUT_STYLES.CONTENT_CONTAINER} min-w-0`}>
      <div className="py-1.5 sm:py-2 min-w-0">
        <div
          role="list"
          aria-label={t("features.projectDetails.techStackBar.ariaLabel", {
            project: project.title,
          })}
          className="flex w-full min-w-0 max-w-full flex-nowrap items-center gap-1.5 sm:gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth touch-pan-x scrollbar-hide pr-2 sm:pr-3 [-webkit-overflow-scrolling:touch]"
        >
          {/* Plain, static tags: cursor-default already says these aren't
              clickable, so the hover lift and colour shift they used to get
              from surface-card--interactive were a false affordance. */}
          {project.techStack.map((tech) => (
            <span
              key={tech}
              role="listitem"
              className={`shrink-0 px-2 py-1 ${SURFACE_CARD_ICON} text-sm font-medium text-body rounded-lg cursor-default whitespace-nowrap`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};
