import { SECTION_VIEWPORT } from "constants/section-motion";
import { ABOUT_HERO_CONFIG, ABOUT_HERO_STYLES } from "data/aboutHeroData";
import { aboutPageContent } from "data/aboutPage";
import { skillCapabilities, type SkillCapabilityId } from "data/skills";
import { motion } from "motion/react";
import React, { useMemo } from "react";
import { SURFACE_CARD_BASE } from "../../../tailwind/styles/surfaceCard";
import SectionHeader from "../../elements/section-header";

const capabilityColors: Record<
  SkillCapabilityId,
  { accent: string; border: string; chip: string }
> = {
  "product-interfaces": {
    accent: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200/40 dark:border-blue-500/25",
    chip: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200/40 dark:border-blue-500/30",
  },
  "backend-data": {
    accent: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200/40 dark:border-emerald-500/25",
    chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200/40 dark:border-emerald-500/30",
  },
  "cloud-delivery": {
    accent: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200/40 dark:border-purple-500/25",
    chip: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200/40 dark:border-purple-500/30",
  },
  "quality-delivery": {
    accent: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200/40 dark:border-amber-500/25",
    chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200/40 dark:border-amber-500/30",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 28,
    },
  },
};

const SkillsBreakdown: React.FC = () => {
  const containerClasses = useMemo(
    () =>
      `${ABOUT_HERO_STYLES.CONTAINER_BASE} ${ABOUT_HERO_CONFIG.SPACING.CONTAINER_PADDING}`,
    [],
  );

  return (
    <div
      id="skills-section"
      className="relative pb-6 sm:pb-8 md:pb-12 lg:pb-16 overflow-hidden"
    >
      <div className={`${containerClasses} mx-auto relative z-10`}>
        <SectionHeader
          badge={{
            text: aboutPageContent.skills.badge,
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            ),
            iconAnimation: false,
          }}
          title={aboutPageContent.skills.title}
          description={aboutPageContent.skills.description}
          highlightText={aboutPageContent.skills.highlightText}
        />

        <motion.div
          className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
          variants={containerVariants}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          {skillCapabilities.map((capability) => {
            const colors = capabilityColors[capability.id];

            return (
              <motion.div
                key={capability.id}
                variants={cardVariants}
                className={`${SURFACE_CARD_BASE} p-4 sm:p-5 lg:p-6 ${colors.border}`}
              >
                <h3
                  className={`text-base sm:text-lg font-bold mb-2 ${colors.accent}`}
                >
                  {capability.title}
                </h3>
                <p className="text-sm sm:text-base text-body leading-snug mb-4">
                  {capability.summary}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {capability.technologies.map((tech) => (
                    <li
                      key={tech}
                      className={`text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full border ${colors.chip}`}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsBreakdown;
