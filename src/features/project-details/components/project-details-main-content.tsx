import React from "react";
import { ProjectSectionProps } from "../types/project-section-props";
import { ProjectArchitectureDiagramSection } from "./sections/project-architecture-diagram-section";
import { ProjectChallengeSection } from "./sections/project-challenge-section";
import { ProjectImpactResultsSection } from "./sections/project-impact-results-section";
import { ProjectLessonsLearnedSection } from "./sections/project-lessons-learned-section";
import { ProjectScreenshotsSection } from "./sections/project-screenshots-section";
import { ProjectSolutionSection } from "./sections/project-solution-section";
import { ProjectTechnicalChallengesSection } from "./sections/project-technical-challenges-section";
import { ProjectTechnicalInsightsSection } from "./sections/project-technical-insights-section";

export const ProjectDetailsMainContent: React.FC<ProjectSectionProps> = ({
  project,
}) => (
  <>
    <ProjectChallengeSection project={project} />
    <ProjectSolutionSection project={project} />
    <ProjectScreenshotsSection project={project} />
    <ProjectArchitectureDiagramSection project={project} />
    <ProjectTechnicalInsightsSection project={project} />
    <ProjectImpactResultsSection project={project} />
    <ProjectLessonsLearnedSection project={project} />
    <ProjectTechnicalChallengesSection project={project} />
  </>
);
