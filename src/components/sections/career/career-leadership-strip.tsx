import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import { careerPageContent } from "data/careerPage";
import { motion } from "motion/react";
import React from "react";
import { SURFACE_CARD_BASE } from "../../../tailwind/styles/surfaceCard";
import { TEXT_BODY } from "../../../tailwind/styles/textTokens";
import SectionHeader from "../../elements/section-header";

const CareerLeadershipStrip: React.FC = () => {
  const { leadership } = careerPageContent;

  return (
    <motion.section
      id="career-leadership"
      className="relative scroll-mt-24 py-6 sm:py-8 md:py-10 bg-light-background dark:bg-dark-background"
      variants={SECTION_VARIANTS}
      initial={false}
      whileInView="visible"
      viewport={SECTION_VIEWPORT}
    >
      <div className="container max-w-7xl mx-auto">
        <SectionHeader
          badge={{
            text: leadership.badge,
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            ),
            iconAnimation: false,
          }}
          title={leadership.title}
          description={leadership.description}
          highlightText={leadership.highlightText}
        />

        <ul className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {leadership.items.map((item) => (
            <li
              key={item.id}
              className={`${SURFACE_CARD_BASE} p-4 sm:p-5`}
            >
              <p className="text-sm sm:text-base font-semibold text-heading mb-2">
                {item.title}
              </p>
              <p
                className={`${TEXT_BODY} text-sm sm:text-base leading-relaxed`}
              >
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default CareerLeadershipStrip;
