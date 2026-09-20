import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import AnimatedCTAButton from "../components/elements/animated-cta-button";
import ProjectGrid from "components/sections/project/project-grid";
import { ABOUT_HERO_CONFIG, ABOUT_HERO_STYLES } from "data/aboutHeroData";
import { motion } from "motion/react";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import HeroHeader from "../components/elements/hero-header";
import { PAGE_HEADER_HERO_TITLE } from "../tailwind/styles/pageHeader";
import { projectsPageContent } from "data/workShowcase";
import { getVisibleProjects } from "../features/project-details/utils/get-visible-projects";

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const sectionClasses = useMemo(
    () =>
      `${ABOUT_HERO_STYLES.SECTION_BASE} ${ABOUT_HERO_CONFIG.HEIGHTS.MIN_SECTION}`,
    [],
  );

  const containerClasses = useMemo(
    () =>
      `${ABOUT_HERO_STYLES.CONTAINER_BASE} ${ABOUT_HERO_CONFIG.SPACING.CONTAINER_PADDING}`,
    [],
  );

  const filteredProjects = useMemo(() => getVisibleProjects(), []);

  const { hero, careerCrossLink } = projectsPageContent;

  return (
    <div className={sectionClasses}>
      <div className={`${containerClasses} container relative z-10`}>
        {/* Ultra-premium Header Section */}
        <section id="projects-hero" className="relative overflow-hidden">
          <div className="container relative z-10 mx-auto">
            {/* Ultra-premium Header */}

            <motion.div
              id="project-filters"
              className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              variants={SECTION_VARIANTS}
              initial={false}
              whileInView="visible"
              viewport={SECTION_VIEWPORT}
            >
              <HeroHeader
                greeting={hero.greeting}
                title={hero.title}
                subtitle={hero.subtitle}
                alignment="center"
                subtitleClassName="mx-auto max-w-3xl"
                titleClassName={`${PAGE_HEADER_HERO_TITLE} text-heading`}
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                }
              />
            </motion.div>

            {/* Ultra-premium Projects Grid Container */}
            <motion.div
              id="project-grid"
              className="relative"
              variants={SECTION_VARIANTS}
              initial={false}
              whileInView="visible"
              viewport={SECTION_VIEWPORT}
            >
              <h2 className="sr-only">{t("a11y.projects.gridHeading")}</h2>
              <ProjectGrid projects={filteredProjects} />
            </motion.div>

            {/* Elegant Services CTA Section */}
            <motion.div
              className="relative mt-8 sm:mt-12 lg:mt-16"
              variants={SECTION_VARIANTS}
              initial={false}
              whileInView="visible"
              viewport={SECTION_VIEWPORT}
            >
              <div className="text-center flex flex-col items-center gap-4">
                <div className="inline-flex items-center gap-3 text-body text-sm sm:text-base font-medium">
                  <div className="w-8 h-px bg-light-border/60 dark:bg-dark-border/50" />
                  <span>{t("pages.projects.cta.interested")}</span>
                  <div className="w-8 h-px bg-light-border/60 dark:bg-dark-border/50" />
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <AnimatedCTAButton
                    text={careerCrossLink.text}
                    href={careerCrossLink.href}
                    colorScheme="indigo-violet"
                    size="sm"
                    showIcon={true}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
