import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Project } from "types/project";
import { getVisibleProjects } from "../utils/get-visible-projects";

export type ProjectDetailTab = {
  id: string;
  label: string;
};

type UseProjectDetailsResult = {
  project: Project | null;
  tabs: ProjectDetailTab[];
  activeTabId: string;
  /** True when the URL names a project that does not exist. */
  notFound: boolean;
};

export function useProjectDetails(): UseProjectDetailsResult {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const visibleProjects = useMemo(
    () => getVisibleProjects(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.language],
  );

  const project = useMemo(
    () => visibleProjects.find((entry) => entry.id === id) ?? null,
    [id, visibleProjects],
  );

  const notFound = Boolean(id) && !project;

  const tabs = useMemo(
    () =>
      visibleProjects.map((entry) => ({
        id: entry.id,
        label: entry.title,
      })),
    [visibleProjects],
  );

  return {
    project,
    tabs,
    activeTabId: id ?? "",
    notFound,
  };
}
