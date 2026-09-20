import { SECTION_VIEWPORT } from "constants/section-motion";
import { ABOUT_HERO_STYLES } from "data/aboutHeroData";
import { motion } from "motion/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { mapCareerJourney } from "utils/map-career-journey";
import SectionHeader from "../../elements/section-header";
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

interface CareerTimelineProps {
  hideHeader?: boolean;
}

const CareerTimeline: React.FC<CareerTimelineProps> = ({
  hideHeader = false,
}) => {
  const { t } = useTranslation("ansumana");
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
      className={`relative overflow-hidden ${
        hideHeader
          ? "pb-6 sm:pb-8 md:pb-12 lg:pb-16"
          : "py-6 sm:py-8 md:py-12 lg:py-16"
      }`}
    >
      <div className={ABOUT_HERO_STYLES.CONTAINER_BASE}>
        {!hideHeader && (
          <SectionHeader
            badge={{
              text: t("pages.career.timeline.badge"),
              icon: (
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ),
              iconAnimation: false,
            }}
            title={t("pages.career.timeline.title")}
            description={t("pages.career.timeline.description")}
            highlightText={t("pages.career.timeline.highlightText")}
          />
        )}

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
