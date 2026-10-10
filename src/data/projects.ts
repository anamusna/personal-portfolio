import doctorlyCover from "../images/covers/case-doctorly.webp";
import innnitCover from "../images/covers/case-innnit.webp";
import propstackCover from "../images/covers/case-propstack.webp";
import quincyCover from "../images/covers/case-quincy.webp";
import zulaCover from "../images/covers/case-zula.webp";
import accountax from "../images/company/accountax.webp";
import doctorly from "../images/company/doctorly.webp";
import innnit from "../images/company/innnit.webp";
import propstack from "../images/company/propstack.webp";
import quincy from "../images/company/quincy.webp";
import zula from "../images/company/zula.webp";
import enLocale from "../locales/en.json";
import { Project } from "../types/project";
import { createLocalizedResource } from "../utils/localized-resource";

export const projectCardImages: { [key: string]: string } = {
  doctorly,
  quincy,
  zula,
  propstack,
  innnit,
  accountax,
} as const;

/**
 * Case-study diagrams (scripts/generate-covers.mjs): the hero image of each
 * detail page and its Open Graph image. Each one draws only what that case
 * study's text describes.
 */
export const projectBannerImages: { [key: string]: string } = {
  doctorly: doctorlyCover,
  quincy: quincyCover,
  zula: zulaCover,
  propstack: propstackCover,
  innnit: innnitCover,
} as const;

const defaultProjects =
  ((enLocale as any).content?.projects?.items as Project[] | undefined) ?? [];

export const projects: Project[] = createLocalizedResource(
  "content.projects.items",
  defaultProjects,
) as Project[];

/** Canonical technologies per project (experiences, highlights, project pages) */
export function getTechnologiesForProject(projectId: string): string[] {
  const project = projects.find((item) => item.id === projectId);
  return project?.techStack ?? project?.tags ?? [];
}
