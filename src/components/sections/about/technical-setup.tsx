import { SECTION_VIEWPORT } from "constants/section-motion";
import { aboutPageContent } from "data/aboutPage";
import { technicalSetupContent } from "data/technical-setup";
import { motion } from "motion/react";
import React from "react";
import { SURFACE_CARD_BASE } from "../../../tailwind/styles/surfaceCard";
import {
  TEXT_BODY,
  TEXT_DETAIL_SECTION_TITLE,
  TEXT_MUTED,
} from "../../../tailwind/styles/textTokens";
import SectionHeader from "../../elements/section-header";

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

const TechnicalSetup: React.FC = () => {
  const { technicalSetup } = aboutPageContent;

  return (
    <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <SectionHeader
          badge={{
            text: technicalSetup.badge,
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
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            ),
            iconAnimation: false,
          }}
          title={technicalSetup.title}
          description={technicalSetup.description}
          highlightText={technicalSetup.highlightText}
        />

        <motion.div
          className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          variants={containerVariants}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          {technicalSetupContent.workHabits.map((group) => (
            <motion.div
              key={group.title}
              variants={cardVariants}
              className={`${SURFACE_CARD_BASE} p-4 sm:p-5`}
            >
              <h3 className={`${TEXT_DETAIL_SECTION_TITLE} mb-3`}>
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.points.map((point) => (
                  <li
                    key={point}
                    className={`${TEXT_BODY} flex items-start gap-2 text-sm sm:text-base`}
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400"
                      aria-hidden
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* One text child, not three adjacent ones: the prerendered snapshot
            merges adjacent text nodes into one, so hydration only had the
            first piece to match against the merged result. */}
        <p className={`${TEXT_MUTED} mt-5 sm:mt-6 text-center`}>
          {`${technicalSetupContent.typicalStackLabel}: ${technicalSetupContent.typicalStack}`}
        </p>
      </div>
    </section>
  );
};

export default TechnicalSetup;
