import { SECTION_VIEWPORT } from "constants/section-motion";
import { ABOUT_HERO_STYLES } from "data/aboutHeroData";
import { motion } from "motion/react";
import React, { useState } from "react";
import { mapCareerJourney } from "utils/map-career-journey";
import { CareerTimelineEntry } from "./career-timeline-entry";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 28,
      mass: 0.7,
    },
  },
};

const CareerTimeline: React.FC = () => {
  const [openAchievements, setOpenAchievements] = useState<Set<string>>(
    new Set(),
  );
  const careerJourney = mapCareerJourney();

  const toggleAchievements = (key: string) => {
    setOpenAchievements((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <section
      className="relative overflow-hidden pb-6 sm:pb-8 md:pb-12 lg:pb-16"
    >
      <div className={ABOUT_HERO_STYLES.CONTAINER_BASE}>

        <motion.div
          variants={containerVariants}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
          className="space-y-3 sm:space-y-4 lg:space-y-5 xl:space-y-6"
        >
          <div className="absolute left-4 sm:left-5 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/25 via-indigo-500/45 to-indigo-500/25 dark:from-indigo-400/35 dark:via-indigo-400/55 dark:to-indigo-400/35 shadow-md shadow-indigo-500/15 dark:shadow-indigo-400/20 rounded-full" />

          {careerJourney.map((experience) => (
            <CareerTimelineEntry
              key={experience.period}
              experience={experience}
              itemVariants={itemVariants}
              isAchievementsOpen={openAchievements.has(experience.period)}
              onToggleAchievements={() =>
                toggleAchievements(experience.period)
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CareerTimeline;
