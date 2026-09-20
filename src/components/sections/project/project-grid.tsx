import { SECTION_VIEWPORT } from "constants/section-motion";
import ProjectCard from "components/sections/project/project-card";
import { motion } from "motion/react";
import React from "react";
import { Project } from "types/project";

interface ProjectGridProps {
  projects: Project[];
}

const springTransition = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
  mass: 0.7,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springTransition },
};

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <div className="relative">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5"
        variants={containerVariants}
        initial={false}
        whileInView="visible"
        viewport={SECTION_VIEWPORT}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={cardVariants}>
            <ProjectCard
              project={project}
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>

      {projects.length === 0 && (
        <div className="surface-card border border-light-border/55 dark:border-dark-border/40 rounded-2xl p-6 sm:p-8 lg:p-10 text-center max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-heading mb-2 sm:mb-3">
            No projects found
          </h3>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            No projects match your current filter. Try clearing the filters or
            browse the full portfolio.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
