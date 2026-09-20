import { SECTION_VIEWPORT } from "constants/section-motion";
import { homePageContent } from "data/homePage";
import { howIWorkSection } from "data/howIWork";
import { motion } from "motion/react";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SURFACE_CARD_BASE } from "../../../tailwind/styles/surfaceCard";
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
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 28,
    },
  },
};

const HowIWork: React.FC = () => {
  const { howIWorkTeaser } = homePageContent;
  const { t } = useTranslation("ansumana");
  const previewPrinciples = useMemo(
    () =>
      howIWorkSection.principles.slice(0, howIWorkTeaser.previewCount),
    [howIWorkTeaser.previewCount],
  );

  return (
    <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="container max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={{
            text: howIWorkSection.badge,
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            ),
            iconAnimation: false,
          }}
          title={howIWorkSection.title}
          description={howIWorkSection.description}
          highlightText={howIWorkSection.highlightText}
        />

        <motion.ol
          className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          variants={containerVariants}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
          aria-label={t("a11y.home.howIWork.principles")}
        >
          {previewPrinciples.map((principle) => (
            <motion.li
              key={principle.id}
              variants={cardVariants}
              className={`${SURFACE_CARD_BASE} p-4 sm:p-5 lg:p-6`}
            >
              <p className="text-base sm:text-lg font-semibold leading-snug text-heading">
                {principle.title}
              </p>
              <p className="mt-2 text-sm sm:text-base text-body leading-relaxed">
                {principle.detail}
              </p>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          className="mt-6 sm:mt-8 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <AnimatedCTAButton
            text={howIWorkTeaser.deepLink.text}
            href={howIWorkTeaser.deepLink.href}
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

export default HowIWork;
