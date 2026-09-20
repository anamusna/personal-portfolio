import { SECTION_VIEWPORT } from "constants/section-motion";
import { aboutPageContent } from "data/aboutPage";
import { motion } from "motion/react";
import React from "react";
import { TEXT_BODY } from "../../../tailwind/styles/textTokens";
import SectionHeader from "../../elements/section-header";

const AboutGrowth: React.FC = () => {
  const { growth } = aboutPageContent;

  return (
    <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="container max-w-3xl mx-auto px-3 sm:px-4 lg:px-6">
        <SectionHeader
          badge={{
            text: growth.badge,
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ),
            iconAnimation: false,
          }}
          title={growth.title}
          description={growth.description}
          highlightText={growth.highlightText}
        />

        <motion.div
          className="mt-4 sm:mt-6 space-y-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {growth.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className={TEXT_BODY}>
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutGrowth;
