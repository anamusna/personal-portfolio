import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import NotFoundWithSeo from "../../pages/not-found-with-seo";
import { PageMetadata } from "../../components/seo/page-metadata";
import { mergePageSeo } from "../../data/page-seo";
import { projectBannerImages } from "../../data/projects";
import { absoluteAssetUrl } from "../../data/site-config";
import { buildProjectSchema } from "../../utils/structured-data/build-project-schema";
import { ProjectDetailsView } from "./components/project-details-view";
import { useProjectDetails } from "./hooks/use-project-details";

const ProjectDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { project, tabs, activeTabId, notFound } = useProjectDetails();

  const pageSeo = useMemo(() => {
    if (!project) return null;
    return mergePageSeo({
      title: `${project.title} ${t("features.projectDetails.hero.caseStudy")} | Ansumana Darboe`,
      description: project.summary,
      path: `/projects/${project.id}`,
      image: projectBannerImages[project.profile]
        ? absoluteAssetUrl(projectBannerImages[project.profile])
        : undefined,
      imageAlt: t("features.projectDetails.hero.diagramAlt", {
        project: project.title,
      }),
    });
  }, [project, t]);

  const jsonLd = useMemo(
    () => (project ? buildProjectSchema(project) : undefined),
    [project],
  );

  if (notFound) {
    return <NotFoundWithSeo />;
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
      />
    </>
  );
};

export default ProjectDetailsPage;
