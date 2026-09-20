import { SECTION_VIEWPORT } from "constants/section-motion";
import { homePageContent } from "data/homePage";
import { motion } from "motion/react";
import React from "react";
import { TEXT_BODY } from "../../../tailwind/styles/textTokens";
import AnimatedCTAButton from "../../elements/animated-cta-button";
import SectionHeader from "../../elements/section-header";

const HomeIdentity: React.FC = () => {
  const { identity } = homePageContent;

  return (
    <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="container max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={{
            text: identity.badge,
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            ),
            iconAnimation: false,
          }}
          title={identity.headline}
          description={identity.description}
          highlightText={identity.highlightText}
        />

        <div className="mt-6 sm:mt-8 max-w-3xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SECTION_VIEWPORT}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] xl:text-3xl font-bold text-heading leading-snug tracking-tight mb-4 sm:mb-5">
              {identity.headline}
            </h3>
            <p className={`${TEXT_BODY} text-base sm:text-lg lg:text-xl leading-relaxed`}>
              {identity.summary}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <AnimatedCTAButton
            text={identity.primaryCta.text}
            href={identity.primaryCta.href}
            colorScheme="indigo-violet"
            size="sm"
            showIcon={true}
          />
          <AnimatedCTAButton
            text={identity.secondaryCta.text}
            href={identity.secondaryCta.href}
            colorScheme="indigo-violet"
            size="sm"
            variant="outline"
            showIcon={true}
            iconPosition="right"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HomeIdentity;
