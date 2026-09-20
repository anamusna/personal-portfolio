import { SECTION_VIEWPORT } from "constants/section-motion";
import { careerPageContent } from "data/careerPage";
import { motion } from "motion/react";
import React from "react";
import { SURFACE_CARD_BASE } from "../../../tailwind/styles/surfaceCard";
import {
  TEXT_BODY,
  TEXT_DETAIL_SECTION_TITLE,
} from "../../../tailwind/styles/textTokens";
import SectionHeader from "../../elements/section-header";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
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

const CareerImpactStrip: React.FC = () => {
  const { impact } = careerPageContent;

  return (
    <section
      id="career-impact"
      className="relative scroll-mt-24 py-6 sm:py-8 md:py-12 lg:py-16 overflow-hidden"
    >
      <div className="container max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
        <SectionHeader
          badge={{
            text: impact.badge,
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            ),
            iconAnimation: false,
          }}
          title={impact.title}
          description={impact.description}
          highlightText={impact.highlightText}
        />

        <motion.div
          className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          variants={containerVariants}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          {impact.metrics.map((item) => (
            <motion.div
              key={item.metric}
              variants={itemVariants}
              className={`${SURFACE_CARD_BASE} p-4 sm:p-5 text-center`}
            >
              <p
                className={`${TEXT_DETAIL_SECTION_TITLE} text-2xl sm:text-3xl mb-1.5 sm:mb-2 text-heading`}
              >
                {item.metric}
              </p>
              <p className={`${TEXT_BODY} text-sm sm:text-base`}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CareerImpactStrip;
