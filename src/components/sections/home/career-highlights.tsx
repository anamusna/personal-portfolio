import { SECTION_VIEWPORT } from "constants/section-motion";
import { getHomeFeaturedProjects, homeWorkSection } from "data/workShowcase";
import { motion } from "motion/react";
import React, { useMemo } from "react";
import { SURFACE_CARD_INTERACTIVE } from "../../../tailwind/styles/surfaceCard";
import AnimatedCTAButton from "../../elements/animated-cta-button";
import SectionHeader from "../../elements/section-header";
import ProjectCard from "../project/project-card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const CareerHighlights: React.FC = () => {
  const featuredProjects = useMemo(() => getHomeFeaturedProjects(), []);

  return (
    <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="container max-w-7xl relative z-10 mx-auto px-4 sm:px-6">
        <SectionHeader
          badge={{
            text: homeWorkSection.badge,
            icon: (
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            ),
            iconAnimation: false,
          }}
          title={homeWorkSection.title}
          description={homeWorkSection.description}
          highlightText={homeWorkSection.highlightText}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5"
          variants={containerVariants}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              className={`${SURFACE_CARD_INTERACTIVE} dark:bg-dark-background rounded-2xl border-indigo-200/40 dark:border-indigo-500/30`}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <AnimatedCTAButton
            text={homeWorkSection.viewProjectsLabel}
            href={homeWorkSection.projectsHref}
            colorScheme="indigo-violet"
            size="sm"
            showIcon={true}
          />
          <AnimatedCTAButton
            text={homeWorkSection.viewCareerLabel}
            href={homeWorkSection.careerHref}
            colorScheme="indigo-violet"
            size="sm"
            variant="outline"
            showIcon={true}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CareerHighlights;
