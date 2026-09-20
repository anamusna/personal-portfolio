import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import PageSection from "components/sections/page-section";
import StoryHero from "components/sections/story/story-hero";
import StructuredContentRenderer from "components/sections/story/structured-content-renderer";
import { biographyContentStructured } from "data/storyDataStructured";
import { motion } from "motion/react";
import React from "react";

const Story: React.FC = () => {
  return (
    <PageSection>
      <section id="story-hero" className="scroll-mt-24">
        <StoryHero />
      </section>

      <motion.section
        id="story-chapters"
        className="relative scroll-mt-24 mt-10 sm:mt-12 md:mt-14 pt-8 sm:pt-10 border-t border-light-border/55 dark:border-dark-border/40"
        variants={SECTION_VARIANTS}
        initial={false}
        whileInView="visible"
        viewport={SECTION_VIEWPORT}
      >
        <div className="mx-auto min-w-0 w-full max-w-4xl">
          <StructuredContentRenderer
            sections={biographyContentStructured.sections}
          />
        </div>
      </motion.section>
    </PageSection>
  );
};

export default Story;
