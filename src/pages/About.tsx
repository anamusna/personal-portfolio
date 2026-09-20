import { SECTION_VARIANTS, SECTION_VIEWPORT } from "constants/section-motion";
import { motion } from "motion/react";
import React from "react";
import SectionDivider from "../components/elements/section-divider";
import AboutGrowth from "../components/sections/about/about-growth";
import AboutHero from "../components/sections/about/about-hero";
import AboutHeroTransition from "../components/sections/about/about-hero-transition";
import AboutNextSteps from "../components/sections/about/about-next-steps";
import PersonalInterests from "../components/sections/about/personal-interests";
import SkillsBreakdown from "../components/sections/about/skills-breakdown";
import TechnicalSetup from "../components/sections/about/technical-setup";
import Values from "../components/sections/about/values";

const About: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden md:overflow-visible z-10">
      <div className="relative z-10">
        <section
          id="about-hero"
          className="relative bg-light-background-alt dark:bg-dark-background-alt"
        >
          <AboutHero />
          <AboutHeroTransition />
        </section>

        <SectionDivider placement="static" tone="neutral" />

        <div className="relative bg-light-background dark:bg-dark-background">
          <motion.section
            id="skills-breakdown"
            className="relative scroll-mt-24"
            variants={SECTION_VARIANTS}
            initial={false}
            whileInView="visible"
            viewport={SECTION_VIEWPORT}
          >
            <SkillsBreakdown />
          </motion.section>

          <motion.section
            id="technical-setup"
            className="relative scroll-mt-24"
            variants={SECTION_VARIANTS}
            initial={false}
            whileInView="visible"
            viewport={SECTION_VIEWPORT}
          >
            <TechnicalSetup />
          </motion.section>

          <motion.section
            id="about-growth"
            className="relative scroll-mt-24 bg-light-background-alt dark:bg-dark-background-alt"
            variants={SECTION_VARIANTS}
            initial={false}
            whileInView="visible"
            viewport={SECTION_VIEWPORT}
          >
            <AboutGrowth />
          </motion.section>

          <motion.section
            id="values"
            className="relative scroll-mt-24"
            variants={SECTION_VARIANTS}
            initial={false}
            whileInView="visible"
            viewport={SECTION_VIEWPORT}
          >
            <Values />
          </motion.section>

          <section id="personal-interests" className="relative scroll-mt-24">
            <PersonalInterests />
          </section>
        </div>
        <motion.section
          id="about-next"
          className="relative bg-light-background dark:bg-dark-background py-8 sm:py-12 md:py-16"
          variants={SECTION_VARIANTS}
          initial={false}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          <AboutNextSteps />
        </motion.section>
      </div>
    </div>
  );
};

export default About;
