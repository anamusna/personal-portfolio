import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { P } from "tailwind/components/elements/Typography";
import { SURFACE_CARD_INTERACTIVE } from "tailwind/styles/surfaceCard";
import {
  TEXT_BODY,
  TEXT_DETAIL_SECTION_TITLE,
  TEXT_MUTED,
} from "tailwind/styles/textTokens";
import MarkdownRenderer from "components/elements/markdown-renderer";
import type { CareerJourneyEntry } from "utils/map-career-journey";

type CareerTimelineEntryProps = {
  experience: CareerJourneyEntry;
  itemVariants: {
    hidden: { opacity: number; x: number; y: number };
    visible: {
      opacity: number;
      x: number;
      y: number;
      transition: {
        type: "spring";
        stiffness: number;
        damping: number;
        mass: number;
      };
    };
  };
  isAchievementsOpen: boolean;
  onToggleAchievements: () => void;
};

const viewCaseStudyButtonClass =
  "relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium rounded-lg border backdrop-blur-sm min-h-[44px] touch-manipulation";

export const CareerTimelineEntry: React.FC<CareerTimelineEntryProps> = ({
  experience,
  itemVariants,
  isAchievementsOpen,
  onToggleAchievements,
}) => {
  const { t } = useTranslation("ansumana");

  return (
    <motion.div
    variants={itemVariants}
    className="relative pl-10 sm:pl-12 md:pl-16 lg:pl-20 group"
  >
    <div className="absolute left-0 transform -translate-x-1/2">
      <div
        className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white dark:bg-dark-surface rounded-full border border-light-border/60 dark:border-dark-border/50 flex items-center justify-center shadow-sm"
        style={{ minHeight: "40px", minWidth: "40px" }}
      >
        <span className="text-lg sm:text-xl md:text-2xl" aria-hidden="true">
          {experience.icon}
        </span>
      </div>
    </div>

    <div
      className={`${SURFACE_CARD_INTERACTIVE} group/card relative min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] p-3 sm:p-4 lg:p-5 border-indigo-200/40 dark:border-indigo-500/25 hover:border-indigo-400/50 dark:hover:border-indigo-400/40`}
    >

      <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-1.5 xs:gap-2 sm:gap-3 mb-2 sm:mb-3 lg:mb-4">
        <div className="flex-1 min-w-0 xs:pr-2 sm:pr-3">
          <h3
            className={`${TEXT_DETAIL_SECTION_TITLE} mb-1 sm:mb-1.5 group-hover/card:text-indigo-600 dark:group-hover/card:text-indigo-400 transition-colors duration-500`}
          >
            {experience.role}
          </h3>
          <div className="flex flex-col xs:flex-row xs:items-center gap-0.5 xs:gap-1 sm:gap-1.5">
            <P className={`${TEXT_BODY} font-semibold`}>{experience.company}</P>
            <span className="hidden xs:inline text-gray-400 dark:text-gray-500 text-sm sm:text-sm">
              •
            </span>
            <P className={TEXT_MUTED}>{experience.location}</P>
          </div>
        </div>
        <div className="flex-shrink-0">
          <span
            className="inline-flex items-center justify-center text-sm xs:text-base sm:text-base font-semibold px-2 xs:px-2.5 sm:px-3 lg:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg surface-card border border-light-border/55 dark:border-dark-border/40 text-heading"
            style={{ minHeight: "32px", minWidth: "70px" }}
          >
            <svg
              className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 mr-1 xs:mr-1.5 flex-shrink-0 text-current"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="truncate font-black">{experience.period}</span>
          </span>
        </div>
      </div>

      <MarkdownRenderer
        content={experience.description}
        className={`mb-1.5 sm:mb-2 lg:mb-3 ${TEXT_BODY} group-hover/card:text-heading transition-colors duration-400`}
      />

      <div className="space-y-1 sm:space-y-1.5">
        <motion.button
          onClick={onToggleAchievements}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-between gap-2 px-3 py-2 min-h-[44px] rounded-xl surface-card border border-light-border/55 dark:border-dark-border/40 group/toggle cursor-pointer transition-colors hover:text-heading"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex-shrink-0 text-sm" aria-hidden="true">
              🏆
            </span>
            <span className="text-xs sm:text-sm font-semibold text-heading truncate">
              {t("components.careerTimeline.keyAchievements")}
            </span>
            <span className="flex-shrink-0 inline-flex items-center justify-center text-xs font-semibold px-1.5 py-0.5 rounded-full surface-card border border-light-border/55 dark:border-dark-border/40 text-muted">
              {Math.min(experience.achievements.length, 3)}
            </span>
          </div>

          <motion.svg
            animate={{ rotate: isAchievementsOpen ? 180 : 0 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
            }}
            className="w-4 h-4 flex-shrink-0 transition-colors duration-300 text-gray-500 dark:text-gray-400 group-hover/toggle:text-indigo-500 dark:group-hover/toggle:text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </motion.button>

        <AnimatePresence initial={false}>
          {isAchievementsOpen && (
            <motion.ul
              key="achievements"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 32,
              }}
              className="space-y-1 sm:space-y-1.5 lg:space-y-2 overflow-hidden"
            >
              {experience.achievements.slice(0, 3).map((achievement, index) => (
                <motion.li
                  key={achievement}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 28,
                    delay: index * 0.07,
                  }}
                  className="group/item flex items-start gap-1.5 sm:gap-2 p-1.5 sm:p-2 lg:p-2.5 rounded-lg sm:rounded-xl hover:bg-gray-50/40 dark:hover:bg-gray-700/20 transition-colors duration-300"
                  style={{ minHeight: "36px" }}
                >
                  <span className="inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 mt-2.5 flex-shrink-0 bg-indigo-500 dark:bg-indigo-400" />
                  <MarkdownRenderer
                    content={achievement}
                    className={`${TEXT_BODY} group-hover/item:text-heading transition-colors duration-300`}
                  />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {experience.caseStudyLink && (
        <div className="mt-3 sm:mt-4 flex justify-end">
          <Link
            to={experience.caseStudyLink.href}
            className={`${viewCaseStudyButtonClass} group/btn text-body surface-card border border-light-border/55 dark:border-dark-border/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors min-h-[44px]`}
          >
            <span>{experience.caseStudyLink.label}</span>
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
    </motion.div>
  );
};
