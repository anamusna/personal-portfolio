import { LAYOUT_STYLES } from "data/heroData";
import { projectBannerImages } from "data/projects";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { P } from "tailwind/components/elements/Typography";
import { PAGE_HEADER_HERO_TITLE } from "tailwind/styles/pageHeader";
import { Project } from "types/project";
import { PROJECT_IMAGE_FALLBACK } from "../utils/project-image-fallback";

type ProjectDetailsHeroProps = {
  project: Project;
};

export const ProjectDetailsHero: React.FC<ProjectDetailsHeroProps> = ({
  project,
}) => {
  const { t } = useTranslation();
  const [hasHeroImageError, setHasHeroImageError] = useState(false);

  const heroImageSrc = hasHeroImageError
    ? PROJECT_IMAGE_FALLBACK
    : projectBannerImages[project.profile] || PROJECT_IMAGE_FALLBACK;

  return (
    <div className="relative py-4 sm:py-6 overflow-hidden">
      <div className={LAYOUT_STYLES.CONTENT_CONTAINER}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-5 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-sm font-medium tracking-wider uppercase text-muted mb-2 sm:mb-3">
              {t("features.projectDetails.hero.caseStudy")}
            </p>

            <h1 className={`${PAGE_HEADER_HERO_TITLE} text-heading mb-2`}>
              {project.title}
            </h1>

            <P className="text-sm sm:text-base text-body leading-relaxed max-w-xl">
              {project.summary}
            </P>
          </div>

          <div className="order-1 lg:order-2 relative">
            {/* A diagram of the engineering work the case study describes
                (scripts/generate-covers.mjs), not a photo: it explains the
                project, where a portrait only repeated the home page. */}
            <figure className="relative aspect-[1200/630] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-light-border/55 dark:border-dark-border/40 bg-[#0f172a]">
              <img
                src={heroImageSrc}
                alt={t("features.projectDetails.hero.diagramAlt", {
                  project: project.title,
                })}
                width={1200}
                height={630}
                decoding="async"
                className="w-full h-full object-contain"
                onError={() => setHasHeroImageError(true)}
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};
