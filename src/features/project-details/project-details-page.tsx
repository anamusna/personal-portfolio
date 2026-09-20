import React, { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageMetadata } from "../../components/seo/page-metadata";
import { mergePageSeo } from "../../data/page-seo";
import { buildProjectSchema } from "../../utils/structured-data/build-project-schema";
import { ProjectDetailsView } from "./components/project-details-view";
import { useProjectDetails } from "./hooks/use-project-details";

const ProjectDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { project, tabs, activeTabId, redirectPath, handleTabChange } =
    useProjectDetails();

  const pageSeo = useMemo(() => {
    if (!project) return null;
    return mergePageSeo({
      title: `${project.title} ${t("features.projectDetails.hero.caseStudy")} | Ansumana Darboe`,
      description: project.summary,
      path: `/projects/${project.id}`,
    });
  }, [project, t]);

  const jsonLd = useMemo(
    () => (project ? buildProjectSchema(project) : undefined),
    [project],
  );

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!project || !pageSeo) {
    return null;
  }

  return (
    <>
      <PageMetadata {...pageSeo} jsonLd={jsonLd} />
      <ProjectDetailsView
        project={project}
        tabs={tabs}
        activeTabId={activeTabId}
        onTabChange={handleTabChange}
      />
    </>
  );
};

export default ProjectDetailsPage;
