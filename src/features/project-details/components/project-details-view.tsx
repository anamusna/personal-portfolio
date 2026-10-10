import { LAYOUT_STYLES } from "data/heroData";
import React from "react";
import { Project } from "types/project";
import { ProjectDetailTab } from "../hooks/use-project-details";
import { ProjectDetailsAmbientGlow } from "./project-details-ambient-glow";
import { ProjectDetailsHero } from "./project-details-hero";
import { ProjectDetailsMainContent } from "./project-details-main-content";
import { ProjectDetailsSidebar } from "./project-details-sidebar";
import { ProjectDetailsTabBar } from "./project-details-tab-bar";
import { ProjectTechStackBar } from "./project-tech-stack-bar";

export type ProjectDetailsViewProps = {
  project: Project;
  tabs: ProjectDetailTab[];
  activeTabId: string;
};

export const ProjectDetailsView: React.FC<ProjectDetailsViewProps> = ({
  project,
  tabs,
  activeTabId,
}) => (
  <div className={LAYOUT_STYLES.PAGE_ROOT_MIN_HEIGHT}>
    <div className="relative z-10">
      <ProjectDetailsHero key={`${project.id}-hero`} project={project} />

      <ProjectDetailsTabBar
        tabs={tabs}
        activeTabId={activeTabId}
      />

      <ProjectTechStackBar project={project} />

      <div
        className={`${LAYOUT_STYLES.CONTENT_CONTAINER} ${LAYOUT_STYLES.CONTENT_SECTION}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-5">
          <div
            key={project.id}
            className={`lg:col-span-2 ${LAYOUT_STYLES.SECTION_STACK}`}
          >
            <ProjectDetailsMainContent project={project} />
          </div>

          <div className="lg:col-span-1">
            <ProjectDetailsSidebar project={project} />
          </div>
        </div>
      </div>
    </div>

    <ProjectDetailsAmbientGlow />
  </div>
);
