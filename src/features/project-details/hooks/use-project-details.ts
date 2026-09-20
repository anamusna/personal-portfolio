import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  redirectPath: string | null;
  handleTabChange: (tabId: string) => void;
};

export function useProjectDetails(): UseProjectDetailsResult {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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

  const redirectPath = useMemo(() => {
    if (project || !id) {
      return null;
    }

    return "/projects";
  }, [project, id]);

  const tabs = useMemo(
    () =>
      visibleProjects.map((entry) => ({
        id: entry.id,
        label: entry.title,
      })),
    [visibleProjects],
  );

  const handleTabChange = useCallback(
    (tabId: string) => {
      if (tabId !== id) {
        navigate(`/projects/${tabId}`);
      }
    },
    [id, navigate],
  );

  return {
    project,
    tabs,
    activeTabId: id ?? "",
    redirectPath,
    handleTabChange,
  };
}
