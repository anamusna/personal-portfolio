import { SECTION_RISE_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import { homePageContent } from "data/homePage";
import { skillCapabilities } from "data/skills";
import { motion } from "motion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { SURFACE_CARD_BASE } from "../../../tailwind/styles/surfaceCard";
import { TEXT_BODY } from "../../../tailwind/styles/textTokens";
import AnimatedCTAButton from "../../elements/animated-cta-button";
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
    transition: { type: "spring" as const, stiffness: 350, damping: 28 },
  },
};

interface CapabilityHighlightsProps {
  skills: {
    description: string;
  };
}

const CapabilityHighlights: React.FC<CapabilityHighlightsProps> = ({
  skills,
}) => {
  const { t } = useTranslation("ansumana");
  const { techStackTeaser } = homePageContent;

  return (
    <section className="relative py-8 sm:py-10 md:py-12 overflow-hidden">
      <div className="container max-w-7xl relative z-10 mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          variants={SECTION_RISE_VARIANTS}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          <SectionHeader
            badge={{
              text: t("pages.home.techStack.badge"),
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
            title={t("pages.home.techStack.title")}
            description={skills.description}
          />
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
          variants={containerVariants}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          {skillCapabilities.map((capability) => (
            <motion.div
              key={capability.id}
              variants={cardVariants}
              className={`${SURFACE_CARD_BASE} p-4 sm:p-5 lg:p-6`}
            >
              <h3 className="text-base sm:text-lg font-bold mb-2 text-heading">
                {capability.title}
              </h3>
              <p className={`${TEXT_BODY} text-sm sm:text-base leading-snug`}>
                {capability.summary}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-8 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <AnimatedCTAButton
            text={techStackTeaser.deepLink.text}
            href={techStackTeaser.deepLink.href}
            colorScheme="indigo-violet"
            size="sm"
            showIcon={true}
            iconPosition="right"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CapabilityHighlights;
