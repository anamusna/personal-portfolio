import { SECTION_VIEWPORT } from "constants/section-motion";
import { careerPageContent } from "data/careerPage";
import { motion } from "motion/react";
import React from "react";
import AnimatedCTAButton from "../../elements/animated-cta-button";
import SectionHeader from "../../elements/section-header";

const CareerNextSteps: React.FC = () => {
  const { nextSteps } = careerPageContent;

  return (
    <section
      id="career-next"
      className="relative scroll-mt-24 bg-light-background-alt dark:bg-dark-background-alt py-8 sm:py-12 md:py-16"
    >
      <div className="container max-w-3xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
        <SectionHeader
          badge={{
            text: nextSteps.badge,
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            ),
            iconAnimation: false,
          }}
          title={nextSteps.title}
          description={nextSteps.description}
          highlightText={nextSteps.highlightText}
        />

        <motion.div
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {nextSteps.links.map((link, index) => (
            <AnimatedCTAButton
              key={link.href}
              text={link.text}
              href={link.href}
              colorScheme={link.colorScheme as any}
              size="sm"
              variant={index === 0 ? "default" : "outline"}
              showIcon={true}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CareerNextSteps;
