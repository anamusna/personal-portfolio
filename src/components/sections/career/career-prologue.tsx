import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import { careerPageContent } from "data/careerPage";
import { motion } from "motion/react";
import React from "react";
import { TEXT_BODY } from "../../../tailwind/styles/textTokens";
import SectionHeader from "../../elements/section-header";

const CareerPrologue: React.FC = () => {
  const { prologue } = careerPageContent;

  return (
    <motion.section
      id="before-code"
      className="relative scroll-mt-24 bg-light-background-alt dark:bg-dark-background-alt py-6 sm:py-8 md:py-12"
      variants={SECTION_VARIANTS}
      initial={false}
      whileInView="visible"
      viewport={SECTION_VIEWPORT}
    >
      <div className="container max-w-3xl mx-auto">
        <SectionHeader
          badge={{
            text: prologue.badge,
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
          title={prologue.title}
          description={prologue.description}
          highlightText={prologue.highlightText}
        />

        <div className="mt-4 sm:mt-6 space-y-4">
          {prologue.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className={TEXT_BODY}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CareerPrologue;
