import { projects } from "./projects";
import type { Project } from "../types/project";
import i18n from "../i18n";

/** Home teaser: strongest proof for a senior IC scan (not the full résumé). */
export const HOME_FEATURED_PROJECT_IDS = [
  "doctorly",
  "quincy",
  "zula",
  "innnit",
] as const;

export type FeaturedProjectId = (typeof HOME_FEATURED_PROJECT_IDS)[number];

const buildHomeWorkSection = () =>
  ({
    badge: i18n.t("content.workShowcase.home.badge"),
    title: i18n.t("content.workShowcase.home.title"),
    description: i18n.t("content.workShowcase.home.description"),
    highlightText: i18n.t("content.workShowcase.home.highlightText"),
    viewProjectsLabel: i18n.t("content.workShowcase.home.viewProjectsLabel"),
    viewCareerLabel: i18n.t("content.workShowcase.home.viewCareerLabel"),
    careerHref: "/career",
    projectsHref: "/projects",
  });

const buildProjectsPageContent = () =>
  ({
    hero: {
      greeting: i18n.t("content.workShowcase.projects.hero.greeting"),
      title: i18n.t("content.workShowcase.projects.hero.title"),
      subtitle: i18n.t("content.workShowcase.projects.hero.subtitle"),
      highlightText: i18n.t("content.workShowcase.projects.hero.highlightText"),
    },
    careerCrossLink: {
      text: i18n.t("content.workShowcase.projects.careerCrossLink.text"),
      href: "/career",
    },
  });

export const homeWorkSection = buildHomeWorkSection();

export const projectsPageContent = buildProjectsPageContent();

i18n.on("languageChanged", () => {
  Object.assign(homeWorkSection, buildHomeWorkSection());
  const nextProjectsPageContent = buildProjectsPageContent();
  Object.assign(projectsPageContent, nextProjectsPageContent);
  Object.assign(projectsPageContent.hero, nextProjectsPageContent.hero);
  Object.assign(
    projectsPageContent.careerCrossLink,
    nextProjectsPageContent.careerCrossLink,
  );
});

export function getHomeFeaturedProjects(): Project[] {
  return HOME_FEATURED_PROJECT_IDS.map((id) =>
    projects.find((project) => project.id === id),
  ).filter((project): project is Project => project !== undefined);
}
